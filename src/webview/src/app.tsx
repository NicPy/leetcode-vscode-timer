
import { useState, useEffect } from 'preact/hooks';

declare const acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

export function App() {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState(40); // Default to 40 minutes
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    window.addEventListener('message', event => {
      const message = event.data; // The JSON data our extension sent
      switch (message.type) {
        case 'updateTimer':
          setRemainingSeconds(message.remainingSeconds);
          setTaskName(message.taskName);
          setIsTimerActive(message.isActive);
          break;
      }
    });
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    vscode.postMessage({ type: 'start', value: taskName, duration: duration });
  };

  const handleStop = () => {
    vscode.postMessage({ type: 'stop' });
  };

  return (
    <div style={{ padding: '10px' }}>
      <style>
        {`
          body { color: var(--vscode-foreground); font-family: var(--vscode-font-family); }
          input { 
            width: 100%; box-sizing: border-box; 
            background: var(--vscode-input-background); 
            color: var(--vscode-input-foreground); 
            border: 1px solid var(--vscode-input-border);
            padding: 4px; margin-bottom: 10px;
          }
          button {
            flex: 1; cursor: pointer;
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none; padding: 6px;
          }
          button:hover { background: var(--vscode-button-hoverBackground); }
          .timer-display {
            font-size: 1.5em;
            font-weight: bold;
            text-align: center;
            margin-top: 15px;
            margin-bottom: 15px;
          }
        `}
      </style>
      {isTimerActive && (
        <div class="timer-display">
          {taskName}: {formatTime(remainingSeconds)}
        </div>
      )}
      <label htmlFor="taskName">Task Name1</label>
      <input 
        type="text" 
        id="taskName" 
        placeholder="e.g. Two Sum" 
        value={taskName}
        onInput={(e) => setTaskName(e.currentTarget.value)}
        disabled={isTimerActive}
      />
      <label htmlFor="duration">Duration (minutes)</label>
      <input 
        type="number" 
        id="duration" 
        value={duration}
        onInput={(e) => setDuration(parseInt(e.currentTarget.value))}
        min="1"
        disabled={isTimerActive}
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleStart} disabled={isTimerActive}>Start</button>
        <button onClick={handleStop} disabled={!isTimerActive}>Stop</button>
      </div>
      
    </div>
  );
}
