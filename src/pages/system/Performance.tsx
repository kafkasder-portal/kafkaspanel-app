import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Activity, Clock, Database, Server } from 'lucide-react'

export default function Performance() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sistem Performansı</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Kullanımı</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%24</div>
            <p className="text-xs text-muted-foreground">Son 24 saat ortalaması</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bellek Kullanımı</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%67</div>
            <p className="text-xs text-muted-foreground">8GB / 12GB kullanımda</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yanıt Süresi</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground">Ortalama API yanıt süresi</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sunucu Durumu</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Aktif</div>
            <p className="text-xs text-muted-foreground">Tüm servisler çalışıyor</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sistem Metrikleri</CardTitle>
            <CardDescription>Detaylı performans göstergeleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Veritabanı Bağlantıları</span>
                <span className="text-sm">45/100</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cache Hit Rate</span>
                <span className="text-sm">94%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Disk Kullanımı</span>
                <span className="text-sm">78%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistem Durumu</CardTitle>
            <CardDescription>Servis durumları ve sağlık kontrolleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Server</span>
              <span className="text-sm text-green-600 font-medium">● Çalışıyor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Veritabanı</span>
              <span className="text-sm text-green-600 font-medium">● Çalışıyor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Redis Cache</span>
              <span className="text-sm text-green-600 font-medium">● Çalışıyor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">File Storage</span>
              <span className="text-sm text-green-600 font-medium">● Çalışıyor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Background Jobs</span>
              <span className="text-sm text-yellow-600 font-medium">● Yavaş</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
