import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Keyboard,
  Sparkles
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { useState, memo } from "react"
import { motion } from "motion/react"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
}

// Mock data - bu gerçek uygulamada API'den gelecek
const mockProjects = [
  {
    name: "E-Ticaret Platformu",
    status: "Devam Ediyor" as const,
    priority: "Yüksek" as const,
    dueDate: "15 Ağu",
    progress: 75
  },
  {
    name: "Mobil Uygulama",
    status: "İnceleme" as const,
    priority: "Orta" as const,
    dueDate: "20 Ağu",
    progress: 90
  },
  {
    name: "CRM Sistemi",
    status: "Planlama" as const,
    priority: "Düşük" as const,
    dueDate: "25 Ağu",
    progress: 25
  }
]

const mockActivities = [
  {
    user: "Mehmet Yılmaz",
    action: "E-Ticaret projesini güncelledi",
    time: "2 saat önce",
    type: "update" as const
  },
  {
    user: "Ayşe Demir",
    action: "Yeni görev oluşturdu",
    time: "4 saat önce",
    type: "create" as const
  },
  {
    user: "Can Öztürk",
    action: "Raporu tamamladı",
    time: "6 saat önce",
    type: "complete" as const
  },
  {
    user: "Zeynep Kaya",
    action: "Toplantı planladı",
    time: "8 saat önce",
    type: "schedule" as const
  }
]

const StatCard = memo(function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon 
}: {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: any
}) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-blue-600'
  }[changeType]

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">{title}</CardTitle>
          <motion.div
            whileHover={{ 
              rotate: 10, 
              scale: 1.2,
              color: changeType === 'positive' ? '#16a34a' : changeType === 'negative' ? '#dc2626' : '#2563eb'
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.div>
          <motion.p 
            className="text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span 
              className={changeColor}
              whileHover={{ scale: 1.05 }}
            >
              {change}
            </motion.span> geçen dönemden
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
})

export const MainContent = memo(function MainContent() {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)

  return (
    <motion.div 
      className="flex flex-1 flex-col gap-4 p-4 pt-0"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Üst başlık */}
      <motion.div 
        className="flex items-center justify-between"
        variants={staggerItem}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Hoş Geldiniz, Ahmet
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Bugün ki özet ve güncel durumlar
          </motion.p>
        </motion.div>
        <motion.div 
          className="flex gap-2"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Dialog open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen}>
            <motion.div variants={staggerItem}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsShortcutsOpen(true)}
                  title="Klavye Kısayolları"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Keyboard className="mr-2 h-4 w-4" />
                  </motion.div>
                  Kısayollar
                </Button>
              </motion.div>
            </motion.div>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Klavye Kısayolları</DialogTitle>
                <DialogDescription>
                  Hızlı navigasyon için klavye kısayolları
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sidebar Aç/Kapat</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
                      <span className="text-xs">Ctrl</span>B
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hızlı Arama</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
                      <span className="text-xs">Ctrl</span>K
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Menü Kapat</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium opacity-100">
                      ESC
                    </kbd>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Bu kısayollar tüm sayfalarda kullanılabilir.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Bugün
          </Button>
          <motion.div variants={staggerItem}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                </motion.div>
                Bugün
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={staggerItem}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button>
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                </motion.div>
                Yeni Proje
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* İstatistik kartları */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerItem}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="contents"
        >
          <StatCard
            title="Toplam Gelir"
            value="₺45,231"
            change="+20.1%"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Aktif Projeler"
            value="12"
            change="+2"
            changeType="neutral"
            icon={BarChart3}
          />
          <StatCard
            title="Ekip Üyeleri"
            value="24"
            change="+1"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Performans"
            value="98.2%"
            change="+2.1%"
            changeType="positive"
            icon={TrendingUp}
          />
        </motion.div>
      </motion.div>

      {/* Ana içerik alanı */}
      <motion.div 
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"
        variants={staggerItem}
      >
        {/* Son projeler */}
        <motion.div
          className="col-span-4"
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Son Projeler</CardTitle>
              <CardDescription>
                Bu hafta güncellenen projeleriniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {mockProjects.map((project, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                    variants={staggerItem}
                    whileHover={{ scale: 1.01, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{project.name}</p>
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant={
                            project.status === "Devam Ediyor" ? "default" :
                            project.status === "İnceleme" ? "secondary" : "outline"
                          }>
                            {project.status}
                          </Badge>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant={
                            project.priority === "Yüksek" ? "destructive" :
                            project.priority === "Orta" ? "default" : "secondary"
                          }>
                            {project.priority}
                          </Badge>
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm text-muted-foreground">{project.dueDate}</p>
                      <motion.p 
                        className="text-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {project.progress}%
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Son aktiviteler */}
        <motion.div
          className="col-span-3"
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Son Aktiviteler</CardTitle>
              <CardDescription>
                Ekibinizin son hareketleri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {mockActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 hover:bg-muted/50 p-2 rounded-md"
                    variants={staggerItem}
                    whileHover={{ scale: 1.01, x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activity.type === "update" && <AlertCircle className="h-4 w-4 text-blue-500" />}
                      {activity.type === "create" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {activity.type === "complete" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {activity.type === "schedule" && <Clock className="h-4 w-4 text-orange-500" />}
                    </motion.div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
})