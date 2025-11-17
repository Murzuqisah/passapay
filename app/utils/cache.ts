const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

export const setCache = (key: string, data: any, ttlMs = 300000) => {
  cache.set(key, { data, timestamp: Date.now(), ttl: ttlMs })
}

export const getCache = <T>(key: string): T | null => {
  const item = cache.get(key)
  if (!item) return null
  
  if (Date.now() - item.timestamp > item.ttl) {
    cache.delete(key)
    return null
  }
  
  return item.data as T
}

export const clearCache = (key?: string) => {
  if (key) cache.delete(key)
  else cache.clear()
}