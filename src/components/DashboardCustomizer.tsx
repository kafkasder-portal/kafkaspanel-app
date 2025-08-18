import React, { memo } from 'react'
import { X, Palette, Layout, Eye, Settings2 } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Switch } from './ui/switch'
import { Separator } from './ui/separator'

interface DashboardCustomizerProps {
  isOpen: boolean
  onClose: () => void
}

const DashboardCustomizer = memo(function DashboardCustomizer({ isOpen, onClose }: DashboardCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = React.useState('default')
  const [widgetSettings, setWidgetSettings] = React.useState({
    financialCards: true,
    activityFeed: true,
    chartsDashboard: true,
    goalsSection: true,
    eventsCalendar: true,
    quickActions: true,
  })

  const themes = [
    { id: 'default', name: 'Varsayılan', color: 'bg-brand-primary' },
    { id: 'dark', name: 'Koyu Tema', color: 'bg-neutral-800' },
    { id: 'blue', name: 'Mavi Tema', color: 'bg-blue-600' },
    { id: 'green', name: 'Yeşil Tema', color: 'bg-green-600' },
  ]

  const handleWidgetToggle = (widget: keyof typeof widgetSettings) => {
    setWidgetSettings(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }))
  }

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('dashboardSettings', JSON.stringify({
      theme: selectedTheme,
      widgets: widgetSettings
    }))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Dashboard Özelleştirme
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Theme Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Tema Seçimi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`
                      p-3 rounded-lg border-2 transition-all hover:shadow-md
                      ${selectedTheme === theme.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                      <span className="font-medium">{theme.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Widget Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Widget Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Finansal Kartlar</label>
                    <p className="text-sm text-muted-foreground">Toplam bağışlar, büyüme oranı vb.</p>
                  </div>
                  <Switch
                    checked={widgetSettings.financialCards}
                    onCheckedChange={() => handleWidgetToggle('financialCards')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Aktivite Akışı</label>
                    <p className="text-sm text-muted-foreground">Son aktiviteler ve bildirimler</p>
                  </div>
                  <Switch
                    checked={widgetSettings.activityFeed}
                    onCheckedChange={() => handleWidgetToggle('activityFeed')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Grafik Dashboard</label>
                    <p className="text-sm text-muted-foreground">İstatistik grafikleri ve analizler</p>
                  </div>
                  <Switch
                    checked={widgetSettings.chartsDashboard}
                    onCheckedChange={() => handleWidgetToggle('chartsDashboard')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Hedefler Bölümü</label>
                    <p className="text-sm text-muted-foreground">Aylık hedefler ve progress</p>
                  </div>
                  <Switch
                    checked={widgetSettings.goalsSection}
                    onCheckedChange={() => handleWidgetToggle('goalsSection')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Etkinlik Takvimi</label>
                    <p className="text-sm text-muted-foreground">Yaklaşan etkinlikler ve toplantılar</p>
                  </div>
                  <Switch
                    checked={widgetSettings.eventsCalendar}
                    onCheckedChange={() => handleWidgetToggle('eventsCalendar')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Hızlı Erişim</label>
                    <p className="text-sm text-muted-foreground">Hızlı erişim butonları</p>
                  </div>
                  <Switch
                    checked={widgetSettings.quickActions}
                    onCheckedChange={() => handleWidgetToggle('quickActions')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Layout Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Görünüm Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Kompakt Görünüm</span>
                    <Badge variant="secondary">Yakında</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Daha fazla içerik için daha az boşluk
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Grid Boyutu</span>
                    <Badge variant="secondary">Yakında</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Widget'ların boyutunu ayarla
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              İptal
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedTheme('default')
                  setWidgetSettings({
                    financialCards: true,
                    activityFeed: true,
                    chartsDashboard: true,
                    goalsSection: true,
                    eventsCalendar: true,
                    quickActions: true,
                  })
                }}
              >
                Sıfırla
              </Button>
              <Button onClick={handleSaveSettings}>
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
})

export default DashboardCustomizer
