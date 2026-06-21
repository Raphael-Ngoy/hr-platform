import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get applicant first to check for CV
    const applicant = await prisma.applicant.findUnique({
      where: { id: params.id }
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    // Delete CV file if exists
    if (applicant.cvUrl) {
      try {
        const fs = await import('fs')
        const path = await import('path')
        const filepath = path.join(process.cwd(), 'public', applicant.cvUrl)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
        }
      } catch (error) {
        console.error('Error deleting CV file:', error)
      }
    }

    // Delete applicant
    await prisma.applicant.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Applicant deleted successfully' })
  } catch (error) {
    console.error('Error deleting applicant:', error)
    return NextResponse.json({ error: 'Failed to delete applicant' }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id: params.id },
      include: {
        job: true,
        activities: { orderBy: { createdAt: 'desc' } }
      }
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    return NextResponse.json(applicant)
  } catch (error) {
    console.error('Error fetching applicant:', error)
    return NextResponse.json({ error: 'Failed to fetch applicant' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, notes } = body

    const data: any = {}
    if (status) data.status = status
    if (notes !== undefined) data.notes = notes

    if (status) {
      const applicant = await prisma.applicant.findUnique({
        where: { id: params.id }
      })
      if (applicant && applicant.status !== status) {
        await prisma.activity.create({
          data: {
            applicantId: params.id,
            type: 'status_change',
            description: `Status changed from "${applicant.status}" to "${status}"`,
          }
        })
      }
    }

    const applicant = await prisma.applicant.update({
      where: { id: params.id },
      data,
      include: {
        job: true,
        activities: { orderBy: { createdAt: 'desc' } }
      }
    })

    return NextResponse.json(applicant)
  } catch (error) {
    console.error('Error updating applicant:', error)
    return NextResponse.json({ error: 'Failed to update applicant' }, { status: 500 })
  }
}