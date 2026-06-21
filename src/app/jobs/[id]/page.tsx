import { Metadata } from 'next'
import { prisma } from "@/lib/prisma"
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, DollarSign, Building2, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Job Details - NEXUS',
  description: 'View job details and apply.',
}

async function getJob(id: string) {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
    })
    return job
  } catch (error) {
    console.error('Error fetching job:', error)
    return null
  }
}

export default async function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = await getJob(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-black py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/careers" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Link>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <span className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                {job.department}
              </span>
              <span className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                {job.type}
              </span>
              {job.salary && (
                <span className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
                  About the Role
                </h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
                  Requirements
                </h2>
                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {job.requirements}
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
                  Benefits
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-400">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Competitive salary and equity package</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Comprehensive health, dental, and vision insurance</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Flexible work schedule and remote work options</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Professional development and learning budget</span>
                  </li>
                  <li className="flex items-start text-gray-400">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Generous PTO and paid holidays</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Apply for this position</h3>
                <p className="text-gray-400 mb-6">
                  Ready to join our team? Click the button below to start your application.
                </p>
                <Link
                  href={`/apply?jobId=${job.id}`}
                  className="block w-full text-center px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all hover:scale-105"
                >
                  Apply Now
                </Link>
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <p className="text-sm text-gray-500">
                    <Users className="w-4 h-4 inline mr-2" />
                    {job.type} position
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}