import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import JobCard from '@/components/JobCard'
import { motion } from 'framer-motion'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Careers - NEXUS',
  description: 'Explore career opportunities at NEXUS. Find your perfect role and join our team of innovators.',
}

async function getJobs(department?: string) {
  try {
    const where = department ? { department, isActive: true } : { isActive: true }
    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return jobs
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}

async function getDepartments(): Promise<string[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: { isActive: true },
      select: { department: true }
    })
    return Array.from(new Set(jobs.map((job: any) => job.department))) as string[]
  } catch (error) {
    console.error('Error fetching departments:', error)
    return []
  }
}

export default async function CareersPage({ searchParams }: { searchParams: { department?: string } }) {
  const jobs = await getJobs(searchParams?.department)
  const departments = await getDepartments()

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover opportunities to grow, learn, and make an impact. We're always looking for talented individuals.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative w-full max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search positions..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-full focus:outline-none focus:border-white transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/careers"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  !searchParams?.department
                    ? 'bg-white text-black'
                    : 'border border-gray-700 text-gray-300 hover:border-white hover:text-white'
                }`}
              >
                All Departments
              </a>
              {departments.map((dept: string) => (
                <a
                  key={dept}
                  href={`/careers?department=${encodeURIComponent(dept)}`}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    searchParams?.department === dept
                      ? 'bg-white text-black'
                      : 'border border-gray-700 text-gray-300 hover:border-white hover:text-white'
                  }`}
                >
                  {dept}
                </a>
              ))}
            </div>
          </div>

          {/* Job Listings */}
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(jobs as any[]).map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  department={job.department}
                  location={job.location}
                  type={job.type}
                  description={job.description}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No open positions at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}