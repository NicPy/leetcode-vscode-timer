
import { useState } from 'preact/hooks';

declare const acquireVsCodeApi: any;
const vscode = acquireVsCodeApi();

export function App() {
  const [taskName, setTaskName] = useState('');
  const [duration, setDuration] = useState(40); // Default to 40 minutes

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
        `}
      </style>
      <label htmlFor="taskName">Task Name</label>
      <input 
        type="text" 
        id="taskName" 
        placeholder="e.g. Two Sum" 
        value={taskName}
        onInput={(e) => setTaskName(e.currentTarget.value)}
      />
      <label htmlFor="duration">Duration (minutes)</label>
      <input 
        type="number" 
        id="duration" 
        value={duration}
        onInput={(e) => setDuration(parseInt(e.currentTarget.value))}
        min="1"
      />
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}
