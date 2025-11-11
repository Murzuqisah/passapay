interface QueuedRequest {
  id: string
  endpoint: string
  method: string
  data: Record<string, unknown>
  timestamp: number
}

const QUEUE_KEY = 'passapay_sync_queue'

export function addToQueue(endpoint: string, method: string, data: Record<string, unknown>) {
  const queue = getQueue()
  const request: QueuedRequest = {
    id: Date.now().toString(),
    endpoint,
    method,
    data,
    timestamp: Date.now()
  }
  queue.push(request)
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
}

export function getQueue(): QueuedRequest[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(QUEUE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function removeFromQueue(id: string) {
  const queue = getQueue().filter(item => item.id !== id)
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue))
}

export async function syncQueue() {
  const queue = getQueue()
  if (queue.length === 0) return { synced: 0, failed: 0 }

  let synced = 0
  let failed = 0

  for (const request of queue) {
    try {
      const response = await fetch(request.endpoint, {
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request.data)
      })

      if (response.ok) {
        removeFromQueue(request.id)
        synced++
      } else {
        failed++
      }
    } catch (error) {
      failed++
    }
  }

  return { synced, failed }
}