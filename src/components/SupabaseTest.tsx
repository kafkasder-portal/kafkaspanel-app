import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle, Database, Wifi } from 'lucide-react'

interface ConnectionStatus {
  connected: boolean
  message: string
  timestamp: string
}

export default function SupabaseTest() {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    message: 'Bağlantı test ediliyor...',
    timestamp: new Date().toLocaleString('tr-TR')
  })
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      // Test Supabase connection
      const { data, error } = await supabase
        .from('test_table')
        .select('*')
        .limit(1)

      if (error) {
        // If test_table doesn't exist, that's still a successful connection
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          setStatus({
            connected: true,
            message: 'Supabase bağlantısı başarılı! (Test tablosu bulunamadı, bu normal)',
            timestamp: new Date().toLocaleString('tr-TR')
          })
        } else {
          throw error
        }
      } else {
        setStatus({
          connected: true,
          message: 'Supabase bağlantısı başarılı!',
          timestamp: new Date().toLocaleString('tr-TR')
        })
      }
    } catch (error: any) {
      setStatus({
        connected: false,
        message: `Bağlantı hatası: ${error.message}`,
        timestamp: new Date().toLocaleString('tr-TR')
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Supabase Bağlantı Testi
          </CardTitle>
          <CardDescription>
            Supabase veritabanı bağlantısının durumunu kontrol edin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span>Bağlantı Durumu:</span>
            </div>
            <Badge 
              variant={status.connected ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {status.connected ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              {status.connected ? 'Bağlı' : 'Bağlantısız'}
            </Badge>
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{status.message}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Son test: {status.timestamp}
            </p>
          </div>
          
          <Button 
            onClick={testConnection} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Test ediliyor...' : 'Bağlantıyı Tekrar Test Et'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}