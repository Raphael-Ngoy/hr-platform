import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const admins = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(admins)
  } catch (error: any) {
    console.error('Error fetching admins:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role, status } = body

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In production, hash the password
    const hashedPassword = password // Demo: store as-is

    const admin = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: role || 'HR Admin', status: status || 'Active' },
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true }
    })

    return NextResponse.json(admin, { status: 201 })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, name, email, password, role, status } = body

    if (!id) {
      return NextResponse.json({ error: 'Admin ID required' }, { status: 400 })
    }

    const data: any = {}
    if (name) data.name = name
    if (email) data.email = email
    if (role) data.role = role
    if (status) data.status = status
    if (password) data.password = password // Demo: store as-is

    const admin = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true }
    })

    return NextResponse.json(admin)
  } catch (error) {
    console.error('Error updating admin:', error)
    return NextResponse.json({ error: 'Failed to update admin' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'Admin ID required' }, { status: 400 })
    }

    // Check if this is the last admin
    const adminCount = await prisma.user.count()
    if (adminCount <= 1) {
      return NextResponse.json({ error: 'Cannot delete the last admin' }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ message: 'Admin deleted successfully' })
  } catch (error) {
    console.error('Error deleting admin:', error)
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 })
  }
}