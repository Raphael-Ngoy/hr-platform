import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import ApplicantCard from '@/components/ApplicantCard'
import DeleteApplicantButton from '@/components/DeleteApplicantButton'

export const metadata: Metadata = {
  title: 'Applicants - NEXUS',
  description: 'Manage job applicants and their applications.',
}

async function getApplicants(status?: string) {
  try {
    const where = status ? { status } : {}
    const applicants = await prisma.applicant.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: {
            title: true,
            department: true,
          }
        }
      }
    })
    return applicants
  } catch (error) {
    console.error('Error fetching applicants:', error)
    return []
  }
}

export default async function ApplicantsPage({ searchParams }: { searchParams: { status?: string } }) {
  const applicants = await getApplicants(searchParams?.status)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Applicants</h1>
        <p className="mt-2 text-gray-400">Manage and review all job applications.</p>
      </div>

      {applicants.length > 0 ? (
        <div className="space-y-4">
          {applicants.map((applicant: any) => (
            <div key={applicant.id} className="relative group">
              <ApplicantCard applicant={applicant} />
              <DeleteApplicantButton applicantId={applicant.id} applicantName={applicant.fullName} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg">
            {searchParams?.status ? `No ${searchParams.status} applicants found.` : 'No applicants yet. Applications will appear here once candidates apply.'}
          </p>
        </div>
      )}
    </div>
  )
}