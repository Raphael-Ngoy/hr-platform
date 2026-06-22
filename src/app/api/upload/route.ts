import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
    const originalName = file.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '')
    const filename = `cvs/${timestamp}_${originalName}`

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    })

    // Return public URL
    return NextResponse.json({
      path: blob.url,
      filename: filename
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}