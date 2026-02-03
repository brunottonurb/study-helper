# DevShowcase

A personal knowledge showcase web application to document and review what you've learned throughout your software development career.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **📚 Knowledge Categories** - Organize topics by languages, frameworks, concepts, and more
- **📝 Topic Pages** - Detailed pages with key points and code examples
- **🔍 Search** - Quickly find topics across your entire knowledge base
- **🧠 Quiz Mode** - Test yourself with flashcard-style questions
- **🌙 Dark Theme** - Easy on the eyes for long reading sessions

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Adding Content

### New Topic

Edit `src/data/knowledge.ts` and add to the `topics` array:

```typescript
{
  id: 'topic-id',
  title: 'Topic Title',
  description: 'Brief description',
  category: 'languages', // Match a category id
  confidence: 'intermediate',
  keyPoints: [
    { title: 'Key Point', description: 'Description' }
  ],
  codeExamples: [
    {
      title: 'Example',
      language: 'typescript',
      code: `// your code`,
      explanation: 'Explanation'
    }
  ]
}
```

### New Category

Add to the `categories` array in `src/data/knowledge.ts`.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── categories/       # Category listing and detail pages
│   ├── topics/           # Topic detail pages
│   ├── search/           # Search results page
│   ├── quiz/             # Quiz mode page
│   └── page.tsx          # Homepage
├── components/           # Reusable React components
├── data/                 # Knowledge base data
└── types/                # TypeScript definitions
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Turbopack](https://turbo.build/pack) - Fast bundler

## License

MIT
