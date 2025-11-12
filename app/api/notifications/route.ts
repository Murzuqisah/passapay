import { NextRequest, NextResponse } from 'next/server'
import { createNotification, getNotificationsByUser, markAsRead } from '@/app/lib/services/notification.service'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const notification = await createNotification(data)
    return NextResponse.json(notification)
  } catch {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }
    
    const notifications = await getNotificationsByUser(userId)
    return NextResponse.json(notifications)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { notificationId } = await request.json()
    await markAsRead(notificationId)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to mark as read' }, { status: 500 })
  }
}
