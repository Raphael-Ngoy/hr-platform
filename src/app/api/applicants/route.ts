import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('RAW FORM DATA RECEIVED')

    // Parse FormData
    const formData = await request.formData()

    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const coverLetter = formData.get('coverLetter') as string
    const jobId = formData.get('jobId') as string
    const jobTitle = formData.get('jobTitle') as string
    const department = formData.get('department') as string
    const location = formData.get('location') as string
    const employmentType = formData.get('employmentType') as string
    const salaryRange = formData.get('salaryRange') as string
    const cvFile = formData.get('cv') as File | null

    // Log all extracted fields
    console.log({
      fullName,
      email,
      phone,
      position,
      jobId: jobId || '(empty)',
      jobTitle: jobTitle || '(empty)',
      department: department || '(empty)',
      cv: cvFile?.name || 'NO FILE'
    })

    // Validate required fields
    const missing: Record<string, boolean> = {
      fullName: !fullName,
      email: !email,
      phone: !phone,
      position: !position,
      coverLetter: !coverLetter,
      cv: !cvFile
    }

    const missingFields = Object.entries(missing)
      .filter(([, isMissing]) => isMissing)
      .map(([field]) => field)

    if (missingFields.length > 0) {
      console.error('MISSING FIELDS:', missingFields)
      return NextResponse.json({
        error: `Missing required fields: ${missingFields.join(', ')}`,
        details: missing
      }, { status: 400 })
    }

    // Handle CV file upload
    let cvUrl: string | null = null

    if (cvFile && cvFile.size > 0) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'cvs')
      mkdirSync(uploadsDir, { recursive: true })

      const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
      const originalName = cvFile.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '')
      const filename = `${timestamp}_${originalName}`
      const filepath = join(uploadsDir, filename)

      const bytes = await cvFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      writeFileSync(filepath, buffer)

      cvUrl = `/uploads/cvs/${filename}`
      console.log('CV SAVED:', cvUrl)
    } else {
      console.error('CV FILE IS EMPTY OR INVALID')
      return NextResponse.json({
        error: 'CV file missing or invalid',
        details: { cv: !!cvFile, cvSize: cvFile?.size }
      }, { status: 400 })
    }

    // Build Prisma create data
    // Only set jobId if it references a real job in the database
    let validJobId = null
    if (jobId) {
      const existingJob = await prisma.job.findUnique({ where: { id: jobId } })
      if (existingJob) {
        validJobId = jobId
      }
    }

    const applicantData = {
      fullName,
      email,
      phone,
      position,
      coverLetter,
      cvUrl,
      status: 'New',
      jobId: validJobId,
      jobTitle: jobTitle || null,
      department: department || null,
      location: location || null,
      employmentType: employmentType || null,
      salaryRange: salaryRange || null,
    }

    console.log('PRISMA CREATE DATA:', applicantData)

    const applicant = await prisma.applicant.create({
      data: applicantData
    })

    console.log('APPLICANT CREATED:', applicant.id)

    return NextResponse.json({ success: true, applicant }, { status: 201 })
  } catch (error: any) {
    console.error('APPLICANT CREATION ERROR:', error)
    console.error('ERROR MESSAGE:', error.message)
    console.error('ERROR STACK:', error.stack)
    return NextResponse.json({
      error: error.message || 'Failed to create applicant',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const applicants = await prisma.applicant.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: { title: true }
        }
      }
    })
    return NextResponse.json(applicants)
  } catch (error) {
    console.error('Error fetching applicants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applicants' },
      { status: 500 }
    )
  }
}