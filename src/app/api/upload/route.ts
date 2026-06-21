import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'cvs')
    mkdirSync(uploadsDir, { recursive: true })

    // Generate unique filename
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const originalName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '')
    const filename = `${timestamp}_${originalName}`
    const filepath = join(uploadsDir, filename)

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    writeFileSync(filepath, buffer)

    // Return public URL path
    const publicPath = `/uploads/cvs/${filename}`
    
    return NextResponse.json({ 
      path: publicPath,
      filename: filename 
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}