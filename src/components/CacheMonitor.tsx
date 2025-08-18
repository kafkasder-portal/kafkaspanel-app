import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { RefreshCw, Database, Clock } from 'lucide-react'

interface CacheMonitorProps {
  isOpen: boolean
  onClose: () => void
}

export default function CacheMonitor({ isOpen, onClose }: CacheMonitorProps) {
  const [cacheStats, setCacheStats] = React.useState({
    totalEntries: 0,
    totalSize: '0 KB',
    hitRate: 0,
    lastUpdated: new Date()
  })

  React.useEffect(() => {
    if (isOpen) {
      // Simulate cache stats
      setCacheStats({
        totalEntries: Math.floor(Math.random() * 100) + 50,
        totalSize: `${Math.floor(Math.random() * 500) + 100} KB`,
        hitRate: Math.floor(Math.random() * 30) + 70,
        lastUpdated: new Date()
      })
    }
  }, [isOpen])

  const handleClearCache = () => {
    // Clear any cache
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name)
        })
      })
    }
    localStorage.clear()
    sessionStorage.clear()
    
    setCacheStats({
      totalEntries: 0,
      totalSize: '0 KB',
      hitRate: 0,
      lastUpdated: new Date()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Cache Monitörü
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cache Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">Toplam Kayıt</div>
              <div className="text-2xl font-bold">{cacheStats.totalEntries}</div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">Toplam Boyut</div>
              <div className="text-2xl font-bold">{cacheStats.totalSize}</div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">Hit Rate</div>
              <div className="text-2xl font-bold text-green-600">{cacheStats.hitRate}%</div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="text-sm text-muted-foreground">Son Güncelleme</div>
              <div className="text-xs font-medium">
                {cacheStats.lastUpdated.toLocaleTimeString('tr-TR')}
              </div>
            </div>
          </div>

          {/* Cache Entries */}
          <div className="space-y-2">
            <h3 className="font-medium">Cache Entries</h3>
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {['dashboard-data', 'user-profile', 'navigation-items', 'api-responses', 'static-assets'].map((entry, index) => (
                <div key={entry} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{entry}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 50) + 10} KB
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={index % 2 === 0 ? "default" : "secondary"}>
                      {index % 2 === 0 ? "Active" : "Stale"}
                    </Badge>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 60)} dk önce
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Cache performans izleme aracı
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCacheStats(prev => ({ ...prev, lastUpdated: new Date() }))}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Yenile
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleClearCache}
              >
                Cache Temizle
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
