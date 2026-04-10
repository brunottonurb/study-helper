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
```

4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Default Admin Credentials

Run database migrations to create the admin user:

- **Username:** `admin`
- **Password:** `admin`

You can then log in to the admin panel at `/admin/login`

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

## Managing Content

You can add, edit, and delete categories and topics through the admin panel:

1. Log in at `/admin/login` with your admin credentials
2. Navigate to `/admin/categories` or `/admin/topics`
3. Use the web interface to manage your content

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin panel pages
│   │   ├── page.tsx     # Admin dashboard
│   │   ├── layout.tsx   # Admin layout
│   │   ├── login/       # Admin login page
│   │   ├── change-password/  # Change password page
│   │   ├── categories/  # Category management
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   └── topics/      # Topic management
│   │       ├── page.tsx
│   │       ├── new/
│   │       └── [id]/
│   ├── api/             # API routes
│   │   ├── admin/change-password/  # Change password endpoint
│   │   ├── auth/[...nextauth]/     # NextAuth endpoints
│   │   ├── categories/             # Category CRUD
│   │   └── topics/                 # Topic CRUD
│   ├── categories/      # Public category pages
│   ├── topics/          # Public topic pages
│   ├── favorites/       # Favorites page
│   ├── quiz/            # Quiz mode
│   ├── quiz-questions/  # Quiz questions page
│   ├── search/          # Search page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable React components
├── lib/                 # Utility functions
│   ├── auth.ts         # NextAuth configuration
│   ├── data.ts         # Database queries
│   └── prisma.ts       # Prisma client
├── types/              # TypeScript definitions
└── data/               # Static content data

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
| `npx prisma db seed` | Create default admin user |

## Database Management with Prisma

### Initial Setup (First Time)

When setting up the project for the first time or on a new machine:

```bash
# 1. Install dependencies
npm install

# 2. Create the .env file
cp .env.example .env

# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations to create database tables and admin user
npx prisma migrate dev
```

### Common Database Tasks

#### Viewing and Editing Data

```bash
# Open Prisma Studio - a visual database editor
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can:
- Browse all tables and data
- Add, edit, and delete records
- Test queries

#### Making Schema Changes

When you need to modify the database structure:

1. Edit `prisma/schema.prisma` to make your changes
2. Create and apply a new migration:

```bash
npx prisma migrate dev --name describe_your_change
```

Example:
```bash
npx prisma migrate dev --name add_user_email
```

#### Resetting the Database

⚠️ **Warning**: This will delete all data!

```bash
# Reset database to clean state
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Create a new database
# 3. Apply all migrations
# 4. Run the seed script
```

#### Resetting Admin User

If you need to reset the admin user password to the default:

```bash
# Reset the database and recreate the admin user
npx prisma migrate reset
# Say 'yes' to confirm
```

#### Checking Migration Status

```bash
# View current migration status
npx prisma migrate status
```

#### Generating Prisma Client

After pulling changes that include schema modifications:

```bash
# Regenerate the Prisma Client
npx prisma generate
```

### Troubleshooting

**Issue**: "Prisma Client could not be found"
```bash
npx prisma generate
```

**Issue**: "Database schema is not in sync with migrations"
```bash
npx prisma migrate dev
```

**Issue**: Want to start fresh with clean data
```bash
npx prisma migrate reset
# Say 'yes' to confirm
```

**Issue**: Need to backup your database
```bash
# SQLite database is just a file - copy it
cp dev.db dev.db.backup
```

### Production Database Setup

For production deployments:

1. Use a production-grade database (PostgreSQL recommended)
2. Update `DATABASE_URL` in your production environment
3. Update `prisma/schema.prisma` datasource provider if needed
4. Run migrations in production:

```bash
npx prisma migrate deploy
```

Note: `migrate deploy` is used in production (doesn't prompt, doesn't seed).

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

### Docker Compose Deployment

The easiest way to deploy locally or on a VPS with automatic backups:

```bash
# 1. Clone the repository
git clone https://github.com/brunottonurb/study-helper.git
cd study-helper

# 2. Start the application
docker-compose up -d
```

The application will be available at `http://localhost:3000`.

Features included:
- **Automatic migrations** - Database schema is created on first run
- **Persistent storage** - Database volume persists across restarts
- **Health checks** - Container monitors application health
- **Automatic backups** - Daily backups of the database to `./backups/`
- **Auto-restart** - Container restarts unless manually stopped

#### Customizing Docker Deployment

Edit `docker-compose.yml` to customize:
- Port mapping (default: `3000:3000`)
- Environment variables (especially `AUTH_SECRET` for production)
- Backup location and frequency

For production use with a custom domain:

```yaml
# In docker-compose.yml, update the environment section:
environment:
  NEXTAUTH_URL: "https://your-domain.com"
  AUTH_SECRET: "your-secure-random-secret"
```

#### Managing the Docker Deployment

```bash
# View logs
docker-compose logs -f study-helper

# Stop the application
docker-compose down

# Backup the database manually
cp ./backups/latest.db ./backups/backup-$(date +%Y%m%d-%H%M%S).db

# Access Prisma Studio
docker-compose exec study-helper npx prisma studio
```

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
