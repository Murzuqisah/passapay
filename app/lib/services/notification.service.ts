import clientPromise from '../db'
import { Notification } from '../types'

export async function createNotification(data: Omit<Notification, '_id' | 'createdAt' | 'read'>) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  const notification: Omit<Notification, '_id'> = {
    ...data,
    read: false,
    createdAt: new Date()
  }
  
  const result = await db.collection('notifications').insertOne(notification)
  return { _id: result.insertedId.toString(), ...notification }
}

export async function getNotificationsByUser(userId: string) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  return db.collection<Notification>('notifications')
    .find({ userId })
    .sort({ timestamp: -1 })
    .toArray()
}

export async function markAsRead(notificationId: string) {
  const client = await clientPromise
  const db = client.db('passapay')
  
  return db.collection('notifications').updateOne(
    { _id: notificationId },
    { $set: { read: true } }
  )
}
