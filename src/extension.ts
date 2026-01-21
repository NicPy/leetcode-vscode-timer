import * as vscode from 'vscode';
import {TimerViewProvider} from './TimerViewProvider';
import { START_LEETCODE_TIMER_COMMAND } from './constants/commands';

let timerStatusBarItem: vscode.StatusBarItem;
let timerInterval: NodeJS.Timeout | undefined;
let remainingSeconds: number = 0;

export function activate(context: vscode.ExtensionContext) {
    // 1. Create the Status Bar Item
    timerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(timerStatusBarItem);

    // 2. Register the "Start Timer" command
    let startTimer = vscode.commands.registerCommand(START_LEETCODE_TIMER_COMMAND, async () => {
        const input = await vscode.window.showInputBox({
            prompt: "Enter task duration in minutes",
            placeHolder: "e.g. 40"
        });

        if (input) {
            startCountdown(parseInt(input) * 60);
        }
    });

    context.subscriptions.push(startTimer);

	// 3. Register the timer view
	const provider = new TimerViewProvider(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(TimerViewProvider.viewType, provider));
}

function startCountdown(seconds: number) {
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
            timerStatusBarItem.text = "$(check) Time's Up!";
            vscode.window.showErrorMessage("Task time is over! Stop coding.");
        } else {
            const mins = Math.floor(remainingSeconds / 60);
            const secs = remainingSeconds % 60 ;
            // $(watch) is a built-in VS Code icon ID
            timerStatusBarItem.text = `$(watch) ${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

export function deactivate() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
}