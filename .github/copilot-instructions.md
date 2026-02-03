# Study Helper - Project Instructions

## Overview
This is a personal study helper web application built with Next.js, TypeScript, and Tailwind CSS. It helps you document and review what you've learned throughout your software development career.

## Project Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/data/knowledge.ts` - Your knowledge base data
- `src/types/` - TypeScript type definitions

## Adding New Content

### Adding a New Topic
Edit `src/data/knowledge.ts` and add a new topic object to the `topics` array:

```typescript
{
  id: 'unique-id',
  title: 'Topic Title',
  description: 'Brief description',
  category: 'languages', // Must match a category id
  confidence: 'intermediate', // beginner, intermediate, advanced, expert
  keyPoints: [
    { title: 'Key Point', description: 'Description' }
  ],
  codeExamples: [
    {
      title: 'Example Title',
      language: 'typescript',
      code: `your code here`,
      explanation: 'Optional explanation'
    }
  ],
  resources: ['Optional resource list']
}
```

### Adding a New Category
Add a new category object to the `categories` array in `src/data/knowledge.ts`.

## Development Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features
- **Categories**: Organize knowledge by type (languages, frameworks, concepts, etc.)
- **Topics**: Detailed pages with key points and code examples
- **Search**: Find topics quickly across your knowledge base
- **Quiz Mode**: Test yourself with flashcard-style questions
- **Dark Theme**: Easy on the eyes for long reading sessions
