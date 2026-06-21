import { NextRequest, NextResponse } from 'next/server'
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    let profile = await prisma.profileSetting.findFirst()
    let notifications = await prisma.notificationSetting.findFirst()
    let system = await prisma.systemSetting.findFirst()
    if (!profile) profile = await prisma.profileSetting.create({ data: {} })
    if (!notifications) notifications = await prisma.notificationSetting.create({ data: {} })
    if (!system) system = await prisma.systemSetting.create({ data: {} })
    return NextResponse.json({ profile, notifications, system })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    if (body.profile) {
      const existing = await prisma.profileSetting.findFirst()
      if (existing) await prisma.profileSetting.update({ where: { id: existing.id }, data: body.profile })
      else await prisma.profileSetting.create({ data: body.profile })
    }
    if (body.notifications) {
      const existing = await prisma.notificationSetting.findFirst()
      if (existing) await prisma.notificationSetting.update({ where: { id: existing.id }, data: body.notifications })
      else await prisma.notificationSetting.create({ data: body.notifications })
    }
    if (body.system) {
      const existing = await prisma.systemSetting.findFirst()
      if (existing) await prisma.systemSetting.update({ where: { id: existing.id }, data: body.system })
      else await prisma.systemSetting.create({ data: body.system })
    }
    return NextResponse.json({ message: 'Settings saved successfully' })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}