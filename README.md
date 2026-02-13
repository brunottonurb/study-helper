# Dev Study Helper

A personal study helper web application to document and review what I've learned throughout my software development career. Now with **admin editing features** for managing content through a web interface!

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## Features

- **📚 Knowledge Categories** - Organize topics by languages, frameworks, concepts, and more
- **📝 Topic Pages** - Detailed pages with key points and code examples
- **🔍 Search** - Quickly find topics across your entire knowledge base
- **🧠 Quiz Mode** - Test yourself with flashcard-style questions
- **🌙 Dark Theme** - Easy on the eyes for long reading sessions
- **✏️ Admin Panel** - Full CRUD interface for managing categories, topics, and content
- **💾 Database Storage** - Content stored in SQLite with Prisma ORM
- **🔐 Authentication** - Secure admin login with NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/brunottonurb/study-helper.git
cd study-helper
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
# Create .env file with your configuration
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed
```

4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Default Admin Credentials

After seeding the database, you can log in to the admin panel at `/admin/login`:

- **Username:** `admin`
- **Password:** `admin`

⚠️ **Important:** Change these credentials in production!

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="change-this-to-a-random-secret-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

## Admin Panel

The admin panel provides a complete content management system:

### Accessing the Admin Panel

1. Navigate to `/admin/login`
2. Log in with admin credentials
3. Access the dashboard at `/admin`

### Managing Content

- **Categories**: Create, edit, and delete study categories at `/admin/categories`
- **Topics**: Manage topics with full editing of key points, code examples, and quiz questions at `/admin/topics`
- **Real-time Updates**: Changes are immediately reflected on the public-facing site

### Admin Features

- Visual category management with color preview
- Rich topic editor with:
  - Multiple key points
  - Code examples with syntax highlighting
  - Quiz questions for testing
  - Resource links
- Category filtering for topics
- Confirmation dialogs for deletions
- Responsive design for mobile editing

## Adding Content

### Option 1: Through Admin Panel (Recommended)

1. Log in to `/admin/login`
2. Navigate to Categories or Topics management
3. Use the web interface to add/edit content

### Option 2: Direct Database Seeding

Edit `prisma/seed.ts` to add content programmatically, then run:

```bash
npx prisma db seed
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin panel pages
│   │   ├── categories/  # Category management
│   │   ├── topics/      # Topic management
│   │   └── login/       # Admin login
│   ├── api/             # API routes
│   │   ├── auth/        # NextAuth endpoints
│   │   ├── categories/  # Category CRUD
│   │   └── topics/      # Topic CRUD
│   ├── categories/      # Public category pages
│   ├── topics/          # Public topic pages
│   ├── search/          # Search page
│   ├── quiz/            # Quiz mode
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
├── lib/                 # Utility functions
│   ├── auth.ts         # NextAuth configuration
│   ├── data.ts         # Database queries
│   └── prisma.ts       # Prisma client
├── types/              # TypeScript definitions
└── middleware.ts       # Authentication middleware

prisma/
├── schema.prisma       # Database schema
├── seed.ts            # Database seeding
└── migrations/        # Database migrations
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Create and apply migrations |
| `npx prisma db seed` | Seed database with initial data |

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Prisma](https://www.prisma.io/) - Database ORM
- [SQLite](https://www.sqlite.org/) - Database (via better-sqlite3)
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Turbopack](https://turbo.build/pack) - Fast bundler

## Deployment

⚠️ **Important Note:** This application now requires a server-side runtime and **cannot be deployed to GitHub Pages** (which only supports static hosting).

### Recommended Hosting Options

- **Vercel** - Optimal for Next.js apps
- **Railway** - Easy deployment with database
- **Render** - Free tier available with persistent storage
- **DigitalOcean App Platform** - Full control

### Production Checklist

1. Update `NEXTAUTH_SECRET` with a secure random string
2. Update admin credentials after first login
3. Set `NEXTAUTH_URL` to your production domain
4. Configure database backups
5. Set up SSL/HTTPS
6. Review and update security headers

## Security Considerations

- Admin routes are protected by middleware
- Passwords are hashed with bcrypt
- Session management via NextAuth JWT
- Database file excluded from git
- API routes require authentication for mutations

## Contributing

This is a personal project, but feel free to fork it for your own use!

## License

MIT
