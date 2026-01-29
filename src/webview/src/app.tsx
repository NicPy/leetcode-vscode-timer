import { h } from 'preact';
import {setup} from 'goober'
import { useState, useEffect } from 'preact/hooks';
import { TaskItem } from './components/TaskItem';

setup(h)

const DUMMY_ITEMS = [
  {
    id: 1,
    name: "First Task",
    goalTime: 600000, // 10 min
    timeConsumed: 300000, // 5 min
    status: 'in_progress'
  },
  {
    id: 2,
    name: "Second Task",
    goalTime: 600000, // 10 min
    timeConsumed: 300000, // 5 min
    status: 'completed'
  },
]
// declare const acquireVsCodeApi: any;
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

      {isTimerActive && (
        <div className="timer-display">
          {taskName}: {formatTime(remainingSeconds)}
        </div>
      )}
      <div>
        {DUMMY_ITEMS.map((data) =>

          <TaskItem {...data as any} />
        )}
      </div>
      <label htmlFor="taskName">Task Name2</label>
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
      <div className="buttons-wrapper">
        <button onClick={handleStart} disabled={isTimerActive}>Start</button>
        <button onClick={handleStop} disabled={!isTimerActive}>Stop</button>
      </div>

    </div>
  );
}
