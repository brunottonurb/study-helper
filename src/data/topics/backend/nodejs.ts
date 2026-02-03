import { Topic } from '@/types';

export const nodejs: Topic = {
  id: 'nodejs',
  title: 'Node.js',
  description: 'JavaScript runtime built on Chrome\'s V8 engine for server-side development',
  category: 'backend',
  confidence: 'advanced',
  keyPoints: [
    {
      title: 'Event-Driven Architecture',
      description: 'Non-blocking I/O model using event loop for handling concurrent connections',
    },
    {
      title: 'NPM Ecosystem',
      description: 'Vast package registry for dependencies, scripts, and project management',
    },
    {
      title: 'Streams',
      description: 'Handle large data efficiently with readable, writable, and transform streams',
    },
    {
      title: 'Modules System',
      description: 'CommonJS (require) and ES Modules (import) for code organization',
    },
    {
      title: 'Built-in Modules',
      description: 'fs, path, http, crypto, events, child_process for core functionality',
    },
  ],
  quizQuestions: [
    {
      question: 'Why is Node.js single-threaded but still efficient for I/O operations?',
      answer: 'Node uses non-blocking I/O and an event loop. I/O operations are delegated to the system (libuv) and callbacks are queued when complete, allowing one thread to handle many concurrent operations.',
    },
    {
      question: 'What is the difference between require() and import?',
      answer: 'require() is CommonJS (synchronous, dynamic). import is ES Modules (can be async, static analysis for tree-shaking). ES Modules are the modern standard with better tooling support.',
    },
    {
      question: 'When should you use Streams instead of reading entire files?',
      answer: 'Use streams for large files or data to avoid loading everything into memory at once. Streams process data in chunks, enabling handling of files larger than available RAM.',
    },
    {
      question: 'What is the purpose of package-lock.json?',
      answer: 'It locks exact dependency versions (including transitive dependencies) to ensure reproducible builds. Without it, npm install might install different versions over time.',
    },
  ],
  codeExamples: [
    {
      title: 'Express REST API',
      language: 'typescript',
      code: `import express, { Request, Response, NextFunction } from 'express';

const app = express();
app.use(express.json());

// Middleware for logging
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// Error handling middleware
const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
};

// Routes
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await findUser(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.use(errorHandler);
app.listen(3000);`,
      explanation: 'Express provides minimal, flexible routing and middleware',
    },
    {
      title: 'File Streaming',
      language: 'typescript',
      code: `import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

async function compressFile(input: string, output: string) {
  await pipeline(
    createReadStream(input),
    createGzip(),
    createWriteStream(output)
  );
  console.log('Compression complete');
}

// Handle large files without loading into memory
compressFile('large-file.log', 'large-file.log.gz');`,
      explanation: 'Streams process data in chunks, ideal for large files',
    },
  ],
  resources: ['Node.js Documentation', 'Node.js Design Patterns book'],
};
