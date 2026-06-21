import { Metadata } from 'next'
import { prisma } from "@/lib/prisma"
import { notFound } from 'next/navigation'
import ApplicantDetail from '@/components/ApplicantDetail'

export const metadata: Metadata = {
  title: 'Applicant Details - NEXUS',
  description: 'View and manage applicant details.',
}

async function getApplicant(id: string) {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id },
      include: {
        job: true,
      }
    })
    return applicant
  } catch (error) {
    console.error('Error fetching applicant:', error)
    return null
  }
}

export default async function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const applicant = await getApplicant(params.id)

  if (!applicant) {
    notFound()
  }

  return <ApplicantDetail applicant={applicant} />
}