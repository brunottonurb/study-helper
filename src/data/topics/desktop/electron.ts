import { Topic } from '@/types';

export const electron: Topic = {
  id: 'electron',
  title: 'Electron.js',
  description: 'Framework for building cross-platform desktop apps with web technologies',
  category: 'desktop',
  confidence: 'advanced',
  keyPoints: [
    {
      title: 'Process Model',
      description: 'Main process (Node.js) controls app lifecycle, renderer processes (Chromium) display UI',
    },
    {
      title: 'IPC Communication',
      description: 'ipcMain and ipcRenderer for secure communication between main and renderer processes',
    },
    {
      title: 'Context Isolation',
      description: 'Security feature separating preload scripts from renderer to prevent prototype pollution',
    },
    {
      title: 'Native APIs',
      description: 'Access to OS features: notifications, system tray, file dialogs, menus, shortcuts',
    },
    {
      title: 'Auto Updates',
      description: 'electron-updater for automatic app updates with code signing',
    },
  ],
  quizQuestions: [
    {
      question: 'What is the difference between the Main process and Renderer process?',
      answer: 'Main process runs Node.js, manages windows, and handles OS interactions (one per app). Renderer processes run Chromium, display UI, and are sandboxed (one per window).',
    },
    {
      question: 'Why is Context Isolation important for security?',
      answer: 'It prevents the renderer\'s JavaScript from accessing Node.js APIs directly. Without it, a malicious website in the renderer could execute arbitrary code on the user\'s system.',
    },
    {
      question: 'How do you safely expose Node.js functionality to the renderer?',
      answer: 'Use a preload script with contextBridge.exposeInMainWorld() to selectively expose specific functions, keeping the renderer sandboxed while allowing controlled access.',
    },
    {
      question: 'Why does Electron have a large app size?',
      answer: 'Electron bundles Chromium and Node.js runtimes with each app. This adds ~150MB+ but provides consistent cross-platform behavior without depending on system browsers.',
    },
  ],
  codeExamples: [
    {
      title: 'Main Process Setup',
      language: 'typescript',
      code: `import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('dist/index.html');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers
ipcMain.handle('read-file', async (event, filePath) => {
  const fs = await import('fs/promises');
  return fs.readFile(filePath, 'utf-8');
});`,
      explanation: 'Main process manages windows and handles Node.js operations',
    },
    {
      title: 'Preload Script (Context Bridge)',
      language: 'typescript',
      code: `import { contextBridge, ipcRenderer } from 'electron';

// Expose safe APIs to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  onMenuAction: (callback: (action: string) => void) => {
    ipcRenderer.on('menu-action', (_, action) => callback(action));
  },
  platform: process.platform,
});

// Type declarations for renderer
declare global {
  interface Window {
    electronAPI: {
      readFile: (path: string) => Promise<string>;
      onMenuAction: (callback: (action: string) => void) => void;
      platform: NodeJS.Platform;
    };
  }
}`,
      explanation: 'Preload scripts securely expose main process functionality to renderer',
    },
  ],
  resources: ['Electron Documentation', 'Electron Fiddle'],
};
