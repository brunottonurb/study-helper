import { Topic } from '@/types';

export const electronCrossPlatform: Topic = {
  id: 'electron-cross-platform',
  title: 'Cross-Platform Desktop Apps',
  description: 'Building and distributing Electron apps for Windows and macOS',
  category: 'desktop',
  confidence: 'advanced',
  keyPoints: [
    {
      title: 'Platform-Specific Code',
      description: 'Handle OS differences with process.platform checks and conditional logic',
    },
    {
      title: 'Code Signing',
      description: 'Windows: Authenticode certificates, macOS: Apple Developer ID for notarization',
    },
    {
      title: 'Build Configuration',
      description: 'electron-builder for packaging with platform-specific installers (NSIS, DMG)',
    },
    {
      title: 'Native Modules',
      description: 'Rebuild native Node modules for each platform using electron-rebuild',
    },
    {
      title: 'App Store Distribution',
      description: 'Mac App Store requires sandboxing, Windows Store uses MSIX packaging',
    },
  ],
  quizQuestions: [
    {
      question: 'Why is code signing important for desktop apps?',
      answer: 'Without signing, OS security warnings scare users. macOS Gatekeeper and Windows SmartScreen may block unsigned apps. Code signing proves authenticity and integrity.',
    },
    {
      question: 'What is macOS notarization and why is it required?',
      answer: 'Notarization is Apple\'s process of scanning your app for malware. Since macOS Catalina, apps must be notarized to run without security warnings, even outside the App Store.',
    },
    {
      question: 'Why do native Node modules need to be rebuilt for Electron?',
      answer: 'Native modules are compiled against a specific Node.js version and ABI. Electron uses its own Node version, so native modules must be recompiled to match Electron\'s headers.',
    },
    {
      question: 'What is the difference between process.platform values?',
      answer: 'process.platform returns "darwin" for macOS, "win32" for Windows (including 64-bit), and "linux" for Linux. Use this for platform-specific code paths.',
    },
  ],
  codeExamples: [
    {
      title: 'electron-builder Configuration',
      language: 'json',
      code: `{
  "build": {
    "appId": "com.company.myapp",
    "productName": "My App",
    "directories": {
      "output": "release"
    },
    "mac": {
      "category": "public.app-category.developer-tools",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "entitlements": "build/entitlements.mac.plist",
      "target": ["dmg", "zip"]
    },
    "win": {
      "target": ["nsis", "portable"],
      "certificateFile": "cert.pfx",
      "certificatePassword": "\${env.WIN_CSC_KEY_PASSWORD}"
    },
    "nsis": {
      "oneClick": false,
      "perMachine": true,
      "allowToChangeInstallationDirectory": true
    }
  }
}`,
      explanation: 'electron-builder config handles platform-specific build settings',
    },
    {
      title: 'Platform-Specific Behavior',
      language: 'typescript',
      code: `import { app, Menu, BrowserWindow } from 'electron';

const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';

// macOS: Keep app running when all windows closed
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});

// macOS: Re-create window when dock icon clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Platform-specific menu
const template: Electron.MenuItemConstructorOptions[] = [
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' as const },
      { type: 'separator' as const },
      { role: 'quit' as const }
    ]
  }] : []),
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' as const } : { role: 'quit' as const }
    ]
  }
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));`,
      explanation: 'Handle platform differences for native feel on each OS',
    },
  ],
  resources: ['Electron Builder docs', 'Apple Developer Documentation', 'Microsoft Partner Center'],
};
