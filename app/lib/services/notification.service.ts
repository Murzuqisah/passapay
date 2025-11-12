import { connectDB } from '../db'
import { Notification } from '../types'
import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  userId: String,
  type: String,
  title: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

export async function createNotification(data: Omit<Notification, '_id' | 'createdAt' | 'read'>) {
  await connectDB()
  
  const notification = await NotificationModel.create({
    ...data,
    read: false
  })
  return notification
}

export async function getNotificationsByUser(userId: string) {
  await connectDB()
  return NotificationModel.find({ userId }).sort({ createdAt: -1 })
}

export async function markAsRead(notificationId: string) {
  await connectDB()
  return NotificationModel.updateOne(
    { _id: notificationId },
    { $set: { read: true } }
  )
}
