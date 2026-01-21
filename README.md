# Interview Mode: LeetCode Timer

A focused interview simulation tool designed for developers practicing LeetCode problems and other coding challenges. This VS Code extension helps you hone your time management skills and perform under pressure, simulating a real interview environment by tracking your progress and minimizing distractions.

## Features

*   **Custom Activity Bar Sidebar**: A dedicated "Leetcode timer" view in the VS Code Activity Bar provides intuitive "Timer Controls".
*   **Task Management**: Input a task name directly within the Timer Controls view to keep track of your current coding challenge.
*   **Countdown Timer**: Control a customizable countdown timer, perfect for adhering to strict interview time limits.
*   **Real-time Status Bar Integration**: A prominent, real-time timer in the VS Code Status Bar, complete with built-in icons (`$(watch)`), allows you to track your remaining time at a glance.
*   **Distraction Blocker**: When the countdown expires, the extension triggers a notification ("Task time is over! Stop coding.") to simulate real interview pressure and encourage strict time adherence.

## Requirements

*   Visual Studio Code version `^1.108.1` or higher.

## Extension Settings

This extension currently does not offer explicit user-configurable settings through VS Code's settings UI. All interactions are handled directly through the Activity Bar webview and the command palette.

## How to Use

### Installation

1.  Open VS Code.
2.  Go to the Extensions view by clicking on the Square icon on the Activity Bar on the side of the window or press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS).
3.  Search for "Interview Mode: LeetCode Timer".
4.  Click "Install".

### Launching for Development (For Contributors)

If you're looking to contribute or develop the extension:

1.  Clone the repository.
2.  Navigate to the project root in your terminal.
3.  Install dependencies: `npm install`
4.  To compile the extension: `npm run compile`
5.  To build both the extension and its webview component: `npm run build:all`
6.  Press `F5` in VS Code to open a new window with your extension loaded in debug mode.

### Compiling and Building

*   **Compile TypeScript**:
    ```bash
    npm run compile
    ```
*   **Build Webview**:
    ```bash
    cd src/webview && npm run build
    ```
*   **Build All (Extension & Webview)**:
    ```bash
    npm run build:all
    ```

### Activating and Using the Timer

1.  **Access the Timer Controls**:
    *   Click on the "Leetcode timer" icon in the VS Code Activity Bar. This will open the "Timer Controls" sidebar.
2.  **Start a New Task**:
    *   In the "Timer Controls" sidebar, enter the name of your task (e.g., "Two Sum") into the input field.
    *   Click the "Start" button. A prompt will appear asking you to "Enter task duration in minutes".
    *   Enter your desired duration (e.g., `40` for 40 minutes) and press Enter.
    *   Alternatively, you can open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`), type "Start leetcode task", and select it. You will then be prompted to enter the duration.
3.  **Monitor Your Time**:
    *   The timer will immediately appear in your VS Code Status Bar, counting down in real-time.
4.  **Time's Up!**:
    *   When the timer reaches zero, a notification will appear, reminding you that your task time has concluded.

### Stopping the Timer

Currently, the "Stop" button in the "Timer Controls" sidebar provides a basic "Timer Stopped" message. Full stop functionality to immediately halt the timer is a planned future enhancement. To clear an active timer, you would currently need to restart VS Code or let the timer run its course.

## Contributing

We welcome contributions! If you have suggestions, bug reports, or want to contribute code, please check our GitHub repository.

---

**Happy Coding!** May your interview preparations be productive and your algorithms efficient.
