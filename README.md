# NEXUS HR Recruitment Web Application

A production-quality full-stack HR Recruitment Web Application built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, SQLite, and NextAuth.

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
- Prisma ORM with SQLite database
- Responsive design (desktop, tablet, mobile)
- Server-side rendering and API routes

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

**HR Portal Login:**
- Email: `hr@nexus.com`
- Password: `password123`

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
├── schema.prisma                       # Database schema
└── seed.ts                             # Database seed script
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:seed` - Seed database with demo data

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
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Production Notes

This is a production-ready template. For production deployment:

1. Update NextAuth configuration with proper password hashing (bcrypt)
2. Configure environment variables for database and authentication
3. Set up proper file upload handling for CVs
4. Add email notifications for application status changes
5. Implement proper error handling and logging
6. Add rate limiting for API routes
7. Configure CORS and security headers

## License

MIT