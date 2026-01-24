import * as vscode from 'vscode';
import { START_LEETCODE_TIMER_COMMAND, STOP_LEETCODE_TIMER_COMMAND } from './constants/commands';
import { getNonce } from './utils/string.utils';


export class TimerViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'timer-controls';

    constructor(private readonly _extensionUri: vscode.Uri) { }

    async resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = { enableScripts: true };

        // webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        const nonce = getNonce();

        const scriptUri = webviewView.webview.asWebviewUri(
            vscode.Uri.joinPath(
                this._extensionUri,
                'webview-dist',
                'index.js'
            )
        );

        // Load webview ui 
        const htmlPath = vscode.Uri.joinPath(
            this._extensionUri,
            'webview-dist',
            'index.html'
        );

        let html = Buffer.from(
            await vscode.workspace.fs.readFile(htmlPath)
        ).toString('utf8');

        html = html
            .replace(/<script type="module".*?><\/script>/, '')
            .replace(
                '</head>',
                `
                    <meta http-equiv="Content-Security-Policy"
                    content="
                        default-src 'none';
                        style-src 'unsafe-inline';
                        script-src 'nonce-${nonce}';
                    "
                    />
                    </head>
                    `
            )
            .replace(
                '</body>',
                `<script nonce="${nonce}" src="${scriptUri}"></script></body>`
            );
        webviewView.webview.html = html.toString();



        // Handle messages from the webview (buttons)
        webviewView.webview.onDidReceiveMessage(data => {
            switch (data.type) {
                case 'start':
                    vscode.commands.executeCommand(START_LEETCODE_TIMER_COMMAND, data.value, data.duration);
                    break;
                case 'stop':
                    vscode.commands.executeCommand(STOP_LEETCODE_TIMER_COMMAND);
                    break;
            }
        });
    }


}