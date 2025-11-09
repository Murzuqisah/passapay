'use client'

import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'payment_received' | 'payment_sent' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    // Mock notification - in real app, listen to blockchain events
    const mockNotification: Notification = {
      id: '1',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'You received 5,000 USDC from promoter',
      timestamp: new Date(),
      read: false
    }
    
    // Simulate receiving a notification after 3 seconds
    const timer = setTimeout(() => {
      setNotifications([mockNotification])
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        className="btn btn-ghost btn-circle relative"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <span className="icon-[mdi--bell] text-xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'payment_received' ? 'bg-green-500' :
                      notification.type === 'payment_sent' ? 'bg-blue-500' :
                      'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}