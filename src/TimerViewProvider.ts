import * as vscode from 'vscode';

export class TimerViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'timer-controls';

    constructor(private readonly _extensionUri: vscode.Uri) {}

    resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = { enableScripts: true };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        // Handle messages from the webview (buttons)
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'start':
                    vscode.commands.executeCommand('interview-mode-timer.startTimer');
                    break;
                case 'stop':
                    // We'll implement a stop command next
                    vscode.window.showInformationMessage("Timer Stopped");
                    break;
            }
        });
    }

private _getHtmlForWebview(webview: vscode.Webview) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                body { color: var(--vscode-foreground); font-family: var(--vscode-font-family); padding: 10px; }
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
            </style>
        </head>
        <body>
            <label>Task Name</label>
            <input type="text" id="taskName" placeholder="e.g. Two Sum">
            <div style="display: flex; gap: 8px;">
                <button id="startBtn">Start</button>
                <button id="stopBtn">Stop</button>
            </div>
            <script>
                const vscode = acquireVsCodeApi();
                document.getElementById('startBtn').addEventListener('click', () => {
                    vscode.postMessage({ type: 'start' });
                });
            </script>
        </body>
        </html>`;
}
}