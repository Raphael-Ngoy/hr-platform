import { Metadata } from 'next'
import { prisma } from "@/lib/prisma"
import Link from 'next/link'
import AnimatedCard from '@/components/animations/AnimatedCard'
import FadeIn from '@/components/animations/FadeIn'
import { formatDate } from '@/lib/date'

export const metadata: Metadata = {
  title: 'Dashboard - NEXUS',
  description: 'HR Dashboard for managing applicants and jobs.',
}

async function getStats() {
  try {
    const totalApplicants = await prisma.applicant.count()
    const newApplicants = await prisma.applicant.count({ where: { status: 'New' } })
    const underReview = await prisma.applicant.count({ where: { status: 'Under Review' } })
    const interviewScheduled = await prisma.applicant.count({ where: { status: 'Interview Scheduled' } })
    const shortlisted = await prisma.applicant.count({ where: { status: 'Shortlisted' } })
    const hired = await prisma.applicant.count({ where: { status: 'Hired' } })
    const rejected = await prisma.applicant.count({ where: { status: 'Rejected' } })
    const totalJobs = await prisma.job.count({ where: { isActive: true } })

    return { totalApplicants, newApplicants, underReview, interviewScheduled, shortlisted, hired, rejected, totalJobs }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { totalApplicants: 0, newApplicants: 0, underReview: 0, interviewScheduled: 0, shortlisted: 0, hired: 0, rejected: 0, totalJobs: 0 }
  }
}

async function getRecentApplicants() {
  try {
    const applicants = await prisma.applicant.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: {
            title: true,
          }
        }
      }
    })
    return applicants
  } catch (error) {
    console.error('Error fetching recent applicants:', error)
    return []
  }
}

export default async function DashboardPage() {
  const stats = await getStats()
  const recentApplicants = await getRecentApplicants()

  const statCards = [
    { label: 'Total Applicants', value: stats.totalApplicants, color: 'bg-blue-500', href: '/dashboard/applicants' },
    { label: 'New', value: stats.newApplicants, color: 'bg-yellow-500', href: '/dashboard/applicants?status=New' },
    { label: 'Under Review', value: stats.underReview, color: 'bg-purple-500', href: '/dashboard/applicants?status=Under Review' },
    { label: 'Interview Scheduled', value: stats.interviewScheduled, color: 'bg-indigo-500', href: '/dashboard/applicants?status=Interview Scheduled' },
    { label: 'Shortlisted', value: stats.shortlisted, color: 'bg-green-500', href: '/dashboard/applicants?status=Shortlisted' },
    { label: 'Hired', value: stats.hired, color: 'bg-emerald-500', href: '/dashboard/applicants?status=Hired' },
    { label: 'Rejected', value: stats.rejected, color: 'bg-red-500', href: '/dashboard/applicants?status=Rejected' },
    { label: 'Active Jobs', value: stats.totalJobs, color: 'bg-gray-800', href: '/dashboard/settings' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="mt-2 text-gray-400">Welcome to the HR dashboard. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <FadeIn key={stat.label} delay={index * 0.05}>
            <Link href={stat.href}>
              <AnimatedCard className="h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity`} />
                </div>
              </AnimatedCard>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Recent Applicants */}
      <FadeIn delay={0.4}>
        <div className="bg-gray-900 rounded-2xl border border-gray-800">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-white">Recent Applicants</h2>
          </div>
          <div className="p-6">
            {recentApplicants.length > 0 ? (
              <div className="space-y-2">
                {recentApplicants.map((applicant: any, index: number) => (
                  <Link key={applicant.id} href={`/dashboard/applicants/${applicant.id}`} className="block">
                    <FadeIn delay={0.5 + index * 0.1}>
                      <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0 hover:bg-gray-800/30 transition-colors rounded-lg px-2">
                        <div className="flex-1">
                          <p className="font-medium text-white">{applicant.fullName}</p>
                          <p className="text-sm text-gray-400">{applicant.job?.title ?? applicant.position ?? "General Application"}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            applicant.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                            applicant.status === 'Under Review' ? 'bg-purple-100 text-purple-800' :
                            applicant.status === 'Interview Scheduled' ? 'bg-indigo-100 text-indigo-800' :
                            applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                            applicant.status === 'Hired' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {applicant.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(applicant.createdAt)}
                          </p>
                        </div>
                      </div>
                    </FadeIn>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No applicants yet</p>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}