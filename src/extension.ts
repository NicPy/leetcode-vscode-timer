import * as vscode from 'vscode';
import {TimerViewProvider} from './TimerViewProvider';

import { STOP_LEETCODE_TIMER_COMMAND, START_LEETCODE_TIMER_COMMAND, UPDATE_WEBVIEW_TIMER_COMMAND } from './constants/commands';

let timerStatusBarItem: vscode.StatusBarItem;
let timerInterval: NodeJS.Timeout | undefined;
let remainingSeconds: number = 0;
let currentTaskName: string = ''; // Store the current task name

export function activate(context: vscode.ExtensionContext) {
    // 1. Create the Status Bar Item
    timerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(timerStatusBarItem);

    // 2. Register the "Start Timer" command
    let startTimer = vscode.commands.registerCommand(START_LEETCODE_TIMER_COMMAND, async (taskName: string, durationInMinutes: number) => {
        if (taskName && durationInMinutes) {
            currentTaskName = taskName; // Set current task name
            startCountdown(taskName, durationInMinutes * 60);
            // Send initial update to webview
            vscode.commands.executeCommand(UPDATE_WEBVIEW_TIMER_COMMAND, { remainingSeconds, taskName: currentTaskName, isActive: true });
        }
    });

    context.subscriptions.push(startTimer);

    // 3. Register the "Stop Timer" command
    let stopTimer = vscode.commands.registerCommand(STOP_LEETCODE_TIMER_COMMAND, () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = undefined;
        }
        timerStatusBarItem.hide();
        remainingSeconds = 0; // Reset remaining seconds
        currentTaskName = ''; // Clear task name
        // Send final update to webview
        vscode.commands.executeCommand(UPDATE_WEBVIEW_TIMER_COMMAND, { remainingSeconds: 0, taskName: '', isActive: false });
    });

    context.subscriptions.push(stopTimer);

	// 4. Register the timer view
	const provider = new TimerViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(TimerViewProvider.viewType, provider));

    // 5. Register command to update webview timer
    context.subscriptions.push(vscode.commands.registerCommand(UPDATE_WEBVIEW_TIMER_COMMAND, (data) => {
        TimerViewProvider.currentWebview?.postMessage({ type: 'updateTimer', ...data });
    }));
}

function startCountdown(taskName: string, seconds: number) {
    remainingSeconds = seconds;
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerStatusBarItem.show();

    timerInterval = setInterval(() => {
        remainingSeconds--;

        if (remainingSeconds <= 0) {
            if (timerInterval) { clearInterval(timerInterval); }
            timerStatusBarItem.text = `$(check) ${taskName}: Time's Up!`;
            vscode.window.showErrorMessage(`${taskName}: Task time is over! Stop coding.`);
            // Send final update to webview
            vscode.commands.executeCommand(UPDATE_WEBVIEW_TIMER_COMMAND, { remainingSeconds: 0, taskName: currentTaskName, isActive: false });
        } else {
            const mins = Math.floor(remainingSeconds / 60);
            const secs = remainingSeconds % 60 ;
            // $(watch) is a built-in VS Code icon ID
            timerStatusBarItem.text = `$(watch) ${taskName}: ${mins}:${secs.toString().padStart(2, '0')}`;
            // Send periodic update to webview
            vscode.commands.executeCommand(UPDATE_WEBVIEW_TIMER_COMMAND, { remainingSeconds, taskName: currentTaskName, isActive: true });
        }
    }, 1000);
}

export function deactivate() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}