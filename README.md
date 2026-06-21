# NEXUS HR Recruitment Web Application

A production-quality full-stack HR Recruitment Web Application built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, and NextAuth.

## Features

### Public Website
- **Home Page**: Hero section, company mission, why work with us, benefits, open positions preview, and CTA
- **Careers Page**: Job listings with search and department filters
- **About Us Page**: Company story, mission, and values
- **Contact Page**: Contact form and office information
- **Apply Page**: Candidate application form with CV upload

### HR Dashboard (Protected)
- **Dashboard Overview**: Statistics cards showing total applicants, status breakdown, and recent applicants
- **Applicants Management**: View all applicants, search, filter by status
- **Applicant Details**: View full applicant information, download CV, add notes, change status
- **Status Management**: New, Under Review, Interview Scheduled, Shortlisted, Hired, Rejected

### Technical Features
- Next.js 14 App Router with TypeScript
- Tailwind CSS for styling with premium minimalist design
- Framer Motion for smooth animations
- NextAuth for authentication
- Prisma ORM with PostgreSQL database
- Responsive design (desktop, tablet, mobile)
- Server-side rendering and API routes

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn
- PostgreSQL database (local or cloud)

### Database Setup

#### Option 1: Local PostgreSQL (Recommended for Development)

1. Install PostgreSQL on your machine:
   - **macOS**: `brew install postgresql@16 && brew services start postgresql@16`
   - **Ubuntu/Debian**: `sudo apt install postgresql && sudo systemctl start postgresql`
   - **Windows**: Download from https://www.postgresql.org/download/windows/

2. Create the database:
   ```bash
   createdb hr_recruitment
   ```

3. Update `.env` with your local connection string:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hr_recruitment"
   ```

#### Option 2: Neon (Free Cloud PostgreSQL - Recommended for Production)

1. Sign up at https://neon.tech
2. Create a new project
3. Copy your connection string from the dashboard
4. Update `.env`:
   ```
   DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/hr_recruitment?sslmode=require"
   ```

#### Option 3: Supabase (Free Cloud PostgreSQL)

1. Sign up at https://supabase.com
2. Create a new project
3. Go to Project Settings → Database → Connection string
4. Update `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
   ```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hr-recruitment-web-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your PostgreSQL connection string.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with demo data:
   ```bash
   npm run prisma:seed
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

**HR Portal Login:**
- Email: `hr@nexus.com`
- Password: `password123`

Or use any email with password `password123` in demo mode.

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   ├── dashboard/                       # HR Dashboard pages
│   │   ├── layout.tsx                  # Dashboard layout with sidebar
│   │   ├── page.tsx                    # Dashboard overview
│   │   └── applicants/
│   │       ├── page.tsx                # Applicants list
│   │       └── [id]/page.tsx           # Applicant details
│   ├── careers/page.tsx                # Careers page
│   ├── about/page.tsx                  # About us page
│   ├── contact/page.tsx                # Contact page
│   ├── apply/page.tsx                  # Application form
│   ├── login/page.tsx                  # HR login page
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Home page
│   └── globals.css                     # Global styles
├── components/
│   ├── Navbar.tsx                      # Navigation bar
│   ├── Footer.tsx                      # Footer
│   ├── Hero.tsx                        # Hero section
│   ├── JobCard.tsx                     # Job listing card
│   ├── SearchBar.tsx                   # Search input
│   ├── DashboardSidebar.tsx            # Dashboard sidebar
│   ├── ApplicantCard.tsx               # Applicant card
│   └── ApplicantDetail.tsx             # Applicant detail view
├── lib/
│   └── prisma.ts                       # Prisma client
└── types/
    ├── next-auth.d.ts                  # NextAuth type extensions
    └── css.d.ts                        # CSS module types

prisma/
├── schema.prisma                       # Database schema (PostgreSQL)
├── seed.ts                             # Database seed script
└── migrations/                         # Database migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed database with demo data

## Database Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>

# Apply migrations in production
npx prisma migrate deploy

# Reset database (drops all data and re-applies migrations)
npx prisma migrate reset --force

# Open Prisma Studio (GUI database browser)
npx prisma studio
```

## Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository in Vercel
3. Add the following environment variables in Vercel dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string (use Neon or Supabase)
   - `NEXTAUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET` - A random secret string
4. In the Vercel project settings, add the build command:
   ```
   npx prisma generate && npx prisma migrate deploy && next build
   ```
5. Deploy!

## Design Philosophy

Inspired by premium minimalist design principles:
- Clean black and white color scheme
- Large typography with clear hierarchy
- Smooth transitions and animations
- Professional spacing and layout
- Responsive across all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Production Notes

This is a production-ready template. For production deployment:

1. Update NextAuth configuration with proper password hashing (bcrypt)
2. Configure environment variables for database and authentication
3. Set up proper file upload handling for CVs (use cloud storage like S3)
4. Add email notifications for application status changes
5. Implement proper error handling and logging
6. Add rate limiting for API routes
7. Configure CORS and security headers
8. Use connection pooling for PostgreSQL (e.g., PgBouncer with Neon)

## License

MIT