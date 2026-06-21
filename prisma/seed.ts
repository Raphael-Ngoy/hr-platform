import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create default jobs
  const jobs = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building and maintaining our web applications using modern technologies.',
      requirements: '5+ years of experience with React, TypeScript, and modern CSS. Experience with Next.js and Tailwind CSS preferred. Strong understanding of web performance and accessibility.',
      salary: '$120,000 - $160,000',
      isActive: true,
    },
    {
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Join our backend team to build scalable APIs and services. You will work with modern technologies and help shape our architecture.',
      requirements: '3+ years of experience with Node.js, PostgreSQL, and REST APIs. Experience with Prisma ORM and cloud services (AWS/GCP).',
      salary: '$130,000 - $170,000',
      isActive: true,
    },
    {
      title: 'HR Coordinator',
      department: 'Human Resources',
      location: 'Chicago, IL',
      type: 'Full-time',
      description: 'Support our HR team with recruitment, onboarding, and employee relations. Help us build a great workplace culture.',
      requirements: '2+ years of HR experience. Strong communication skills. Experience with HRIS systems preferred.',
      salary: '$55,000 - $75,000',
      isActive: true,
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Create beautiful and intuitive user experiences. Work closely with product and engineering teams to design world-class products.',
      requirements: '3+ years of product design experience. Proficiency in Figma and design systems. Strong portfolio demonstrating UX/UI skills.',
      salary: '$90,000 - $130,000',
      isActive: true,
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Build and maintain our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability and scalability.',
      requirements: '3+ years of DevOps experience. Experience with Docker, Kubernetes, and cloud platforms (AWS/GCP/Azure).',
      salary: '$125,000 - $165,000',
      isActive: true,
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'Miami, FL',
      type: 'Full-time',
      description: 'Develop and execute marketing campaigns. Manage social media, content creation, and brand positioning.',
      requirements: '2+ years of marketing experience. Strong writing and communication skills. Experience with digital marketing tools.',
      salary: '$60,000 - $85,000',
      isActive: true,
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Seattle, WA',
      type: 'Full-time',
      description: 'Ensure our customers achieve success with our products. Build relationships and drive customer satisfaction and retention.',
      requirements: '3+ years of customer success or account management experience. Excellent communication and problem-solving skills.',
      salary: '$70,000 - $100,000',
      isActive: true,
    },
    {
      title: 'Financial Analyst',
      department: 'Finance',
      location: 'Boston, MA',
      type: 'Full-time',
      description: 'Analyze financial data and provide insights to support business decisions. Prepare reports and forecasts for leadership.',
      requirements: '2+ years of financial analysis experience. Proficiency in Excel and financial modeling. CPA or CFA preferred.',
      salary: '$75,000 - $105,000',
      isActive: true,
    },
    {
      title: 'Recruiter',
      department: 'Human Resources',
      location: 'Denver, CO',
      type: 'Full-time',
      description: 'Source, screen, and hire top talent. Build relationships with candidates and help us grow our amazing team.',
      requirements: '2+ years of recruiting experience. Strong networking and communication skills. Experience with ATS systems.',
      salary: '$65,000 - $90,000',
      isActive: true,
    },
    {
      title: 'Operations Manager',
      department: 'Operations',
      location: 'Portland, OR',
      type: 'Full-time',
      description: 'Oversee day-to-day operations and drive efficiency. Manage processes, teams, and continuous improvement initiatives.',
      requirements: '4+ years of operations management experience. Strong leadership and project management skills.',
      salary: '$85,000 - $120,000',
      isActive: true,
    },
  ]

  for (const job of jobs) {
    await prisma.job.create({ data: job })
  }

  console.log(`Created ${jobs.length} jobs`)

  // Create default settings
  await prisma.profileSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', name: 'HR Admin', email: 'hr@nexus.com', role: 'HR Admin' }
  })

  await prisma.notificationSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', email: true, applicantAlerts: true }
  })

  await prisma.systemSetting.upsert({
    where: { id: 'default' },
    update: {},
    create: { id: 'default', timezone: 'America/New_York' }
  })

  console.log('Created default settings')
  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })