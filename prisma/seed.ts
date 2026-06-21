import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create realistic job listings across departments
  const jobs = [
    // ── ENGINEERING ──
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'We are looking for a Senior Frontend Developer to craft exceptional user interfaces for our SaaS platform. You will work closely with our design team to build responsive, accessible, and performant web applications using modern React and TypeScript.',
      requirements: '5+ years of experience with React and TypeScript.\nStrong understanding of web performance optimization and Core Web Vitals.\nExperience with Next.js, Tailwind CSS, and component-driven development.\nFamiliarity with testing frameworks like Vitest or Playwright.\nExcellent problem-solving and communication skills.',
      salary: '€85,000 - €120,000',
      isActive: true,
    },
    {
      title: 'Backend Engineer - Node.js',
      department: 'Engineering',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Join our backend team to design and build scalable microservices powering our recruitment platform. You will own critical API services, optimize database queries, and ensure high availability for thousands of concurrent users.',
      requirements: '4+ years of experience with Node.js and TypeScript.\nDeep knowledge of PostgreSQL, Prisma ORM, and RESTful API design.\nExperience with message queues (RabbitMQ, Bull) and caching (Redis).\nUnderstanding of Docker, CI/CD pipelines, and cloud infrastructure (AWS/GCP).\nStrong debugging and performance tuning skills.',
      salary: '£75,000 - £110,000',
      isActive: true,
    },
    {
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote (EU Timezone)',
      type: 'Full-time',
      description: 'We need a versatile Full Stack Developer who can work across the entire stack — from crafting polished React UIs to building robust API endpoints. You will be a key contributor to our product roadmap, shipping features end-to-end.',
      requirements: '3+ years of full stack development experience.\nProficiency in React, Next.js, and Node.js.\nExperience with PostgreSQL, Prisma, and REST/GraphQL APIs.\nAbility to work independently in a remote-first environment.\nFamiliarity with Git, code reviews, and agile methodologies.',
      salary: '€70,000 - €95,000',
      isActive: true,
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Berlin, Germany',
      type: 'Full-time',
      description: 'Help us build and scale our cloud infrastructure. You will design deployment pipelines, manage Kubernetes clusters, and implement monitoring solutions to keep our platform reliable and fast as we grow.',
      requirements: '4+ years of DevOps or SRE experience.\nExpertise with Docker, Kubernetes, and Terraform.\nExperience with cloud providers (AWS preferred, GCP a plus).\nStrong scripting skills (Bash, Python, or TypeScript).\nKnowledge of observability tools (Datadog, Grafana, Prometheus).',
      salary: '€80,000 - €115,000',
      isActive: true,
    },
    {
      title: 'Junior Software Engineer',
      department: 'Engineering',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Kickstart your career at a fast-growing tech company. You will learn from senior engineers, contribute to real features, and gain hands-on experience with modern web technologies in a supportive team environment.',
      requirements: '0-2 years of professional experience (internships count!).\nSolid understanding of JavaScript/TypeScript fundamentals.\nFamiliarity with React or another frontend framework.\nEagerness to learn and a growth mindset.\nComputer Science degree or bootcamp graduate welcome.',
      salary: '€45,000 - €60,000',
      isActive: true,
    },

    // ── PRODUCT ──
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Define and drive the product vision for our core HR platform. You will work with engineering, design, and sales to prioritise features, conduct user research, and deliver solutions that delight our customers.',
      requirements: '4+ years of product management experience in B2B SaaS.\nProven track record of shipping successful product features.\nStrong analytical skills with experience using data to drive decisions.\nExcellent stakeholder management and communication abilities.\nExperience with agile methodologies and tools like Jira or Linear.',
      salary: '£80,000 - £120,000',
      isActive: true,
    },
    {
      title: 'Product Designer',
      department: 'Product',
      location: 'Remote (EU Timezone)',
      type: 'Full-time',
      description: 'Design intuitive, beautiful interfaces that make HR professionals more effective. You will own the end-to-end design process from wireframes to high-fidelity prototypes, collaborating closely with product managers and engineers.',
      requirements: '3+ years of product design experience.\nExpert proficiency in Figma and design systems.\nStrong portfolio showcasing UX/UI work for web applications.\nUnderstanding of accessibility standards (WCAG 2.1).\nExperience with user research and usability testing.',
      salary: '€65,000 - €90,000',
      isActive: true,
    },
    {
      title: 'Associate Product Manager',
      department: 'Product',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Support our product team in building features that help thousands of companies hire better talent. You will assist with user research, write product specs, and help prioritise the backlog alongside senior PMs.',
      requirements: '1-2 years of experience in product, consulting, or a related field.\nStrong written and verbal communication skills.\nAnalytical mindset with basic data analysis skills (SQL a plus).\nAbility to work cross-functionally in a fast-paced environment.\nPassion for building great products that solve real problems.',
      salary: '€50,000 - €70,000',
      isActive: true,
    },

    // ── HUMAN RESOURCES ──
    {
      title: 'HR Manager',
      department: 'Human Resources',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Lead our people operations and shape the employee experience at a growing tech company. You will own everything from onboarding and performance reviews to employee engagement and policy development.',
      requirements: '5+ years of HR experience, with at least 2 in a managerial role.\nDeep knowledge of Dutch employment law and EU labour regulations.\nExperience with HRIS platforms (Personio, BambooHR, or similar).\nStrong interpersonal and conflict resolution skills.\nFluency in English and Dutch required.',
      salary: '€65,000 - €85,000',
      isActive: true,
    },
    {
      title: 'Talent Acquisition Specialist',
      department: 'Human Resources',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Own the full recruitment lifecycle for our engineering and product teams. You will source top talent, manage interview pipelines, and deliver an exceptional candidate experience that reflects our employer brand.',
      requirements: '3+ years of technical recruiting experience.\nProven ability to source passive candidates via LinkedIn, GitHub, and other channels.\nExperience with ATS platforms (Lever, Greenhouse, or Ashby).\nStrong negotiation and offer management skills.\nData-driven approach to hiring metrics and pipeline management.',
      salary: '£55,000 - £75,000',
      isActive: true,
    },
    {
      title: 'People Operations Coordinator',
      department: 'Human Resources',
      location: 'Remote (EU Timezone)',
      type: 'Full-time',
      description: 'Support our growing team with seamless people operations. From managing contracts and benefits administration to organising team events, you will ensure every employee has a great experience from day one.',
      requirements: '1-2 years of experience in HR, people operations, or administration.\nExcellent organisational skills and attention to detail.\nFamiliarity with HR software and Google Workspace.\nDiscretion when handling sensitive employee information.\nFluency in English; additional European language is a plus.',
      salary: '€40,000 - €55,000',
      isActive: true,
    },

    // ── MARKETING ──
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Own our digital marketing strategy and drive growth through paid channels, SEO, and email marketing. You will manage campaigns across Google Ads, LinkedIn, and Meta, optimising for both brand awareness and lead generation.',
      requirements: '4+ years of digital marketing experience, preferably in B2B SaaS.\nHands-on experience with Google Ads, LinkedIn Campaign Manager, and Meta Ads.\nStrong analytical skills with proficiency in Google Analytics and Looker Studio.\nExperience with marketing automation tools (HubSpot, Marketo, or similar).\nData-driven mindset with a track record of improving campaign ROI.',
      salary: '£60,000 - £85,000',
      isActive: true,
    },
    {
      title: 'SEO Specialist',
      department: 'Marketing',
      location: 'Remote (EU Timezone)',
      type: 'Full-time',
      description: 'Improve our organic search presence and drive qualified traffic to our careers platform. You will conduct keyword research, optimise on-page content, build link strategies, and collaborate with content writers to boost our domain authority.',
      requirements: '3+ years of SEO experience, ideally in SaaS or tech.\nProficiency with SEO tools (Ahrefs, SEMrush, or Moz).\nStrong understanding of technical SEO, Core Web Vitals, and structured data.\nExperience with content strategy and keyword gap analysis.\nAbility to communicate SEO insights to non-technical stakeholders.',
      salary: '€50,000 - €70,000',
      isActive: true,
    },
    {
      title: 'Content Marketing Writer',
      department: 'Marketing',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Create compelling content that tells our brand story and helps HR professionals succeed. You will write blog posts, case studies, whitepapers, and social media content that drives engagement and establishes thought leadership.',
      requirements: '3+ years of content writing or copywriting experience.\nExceptional writing and editing skills in English.\nExperience writing for B2B audiences, ideally in HR or tech.\nFamiliarity with SEO best practices and content management systems.\nPortfolio of published work required.',
      salary: '€45,000 - €65,000',
      isActive: true,
    },

    // ── SALES ──
    {
      title: 'Sales Executive',
      department: 'Sales',
      location: 'London, UK',
      type: 'Full-time',
      description: 'Drive new business growth by selling our HR platform to mid-market companies. You will manage the full sales cycle from prospecting to closing, building relationships with HR leaders and helping them transform their hiring process.',
      requirements: '3+ years of B2B sales experience, preferably in SaaS.\nProven track record of meeting or exceeding sales quotas.\nExcellent presentation and negotiation skills.\nExperience with CRM tools (Salesforce, HubSpot, or Pipedrive).\nSelf-motivated with a hunter mentality.',
      salary: '£50,000 - £70,000 + Commission',
      isActive: true,
    },
    {
      title: 'Account Manager',
      department: 'Sales',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Nurture and grow relationships with our existing customers. You will ensure high retention rates, identify upsell opportunities, and serve as the trusted advisor that helps our clients get maximum value from our platform.',
      requirements: '3+ years of account management or customer success experience.\nStrong relationship-building and communication skills.\nExperience with SaaS platforms and subscription-based business models.\nData-driven approach to tracking account health and renewal risks.\nFluency in English and Dutch required.',
      salary: '€55,000 - €75,000 + Bonus',
      isActive: true,
    },

    // ── OPERATIONS ──
    {
      title: 'Operations Manager',
      department: 'Operations',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Oversee day-to-day operations and drive operational excellence across the organisation. You will optimise processes, manage vendor relationships, and lead cross-functional initiatives to improve efficiency and scalability.',
      requirements: '5+ years of operations management experience.\nStrong project management and process improvement skills.\nExperience with ERP systems and operational analytics.\nExcellent leadership and team management abilities.\nFluency in English and Dutch required.',
      salary: '€70,000 - €95,000',
      isActive: true,
    },
    {
      title: 'Office & Admin Coordinator',
      department: 'Operations',
      location: 'Amsterdam, Netherlands',
      type: 'Full-time',
      description: 'Keep our Amsterdam office running smoothly. You will manage office supplies, coordinate with vendors, support event planning, and provide administrative assistance to the leadership team in a fast-paced environment.',
      requirements: '1-2 years of office management or administrative experience.\nHighly organised with strong multitasking abilities.\nProficiency in Google Workspace and Slack.\nFriendly, proactive, and solution-oriented attitude.\nFluency in English and Dutch required.',
      salary: '€35,000 - €45,000',
      isActive: true,
    },
  ]

  // Clear existing jobs and reseed
  await prisma.job.deleteMany()
  console.log('Cleared existing jobs')

  for (const job of jobs) {
    await prisma.job.create({ data: job })
  }

  console.log(`Created ${jobs.length} jobs`)

  // Create default settings (upsert to avoid duplicates on re-seed)
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
    create: { id: 'default', timezone: 'Europe/Amsterdam' }
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