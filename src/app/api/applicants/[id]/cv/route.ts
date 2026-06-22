import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"
import { getDownloadUrl } from '@vercel/blob'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id: params.id }
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    if (!applicant.cvUrl) {
      return NextResponse.json({ error: 'No CV uploaded' }, { status: 404 })
    }

    // Generate a signed download URL for the private blob
    const downloadUrl = await getDownloadUrl(applicant.cvUrl)

    // Redirect to the signed URL
    return NextResponse.redirect(downloadUrl)
  } catch (error) {
    console.error('Error fetching CV:', error)
    return NextResponse.json({ error: 'Failed to retrieve CV' }, { status: 500 })
  }
}
