import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { TrendingUp, TrendingDown, Users, DollarSign, PieChart } from 'lucide-react'

interface BaseCardProps {
  title?: string
  className?: string
}

interface TotalDonationsCardProps extends BaseCardProps {
  totalDonations: number
  change?: number
}

interface MonthlyGrowthCardProps extends BaseCardProps {
  growthRate: number
  period?: string
}

interface ActiveBeneficiariesCardProps extends BaseCardProps {
  count: number
  change?: number
}

interface FundDistributionCardProps extends BaseCardProps {
  distributionRate: number
  status?: 'good' | 'warning' | 'critical'
}

export function TotalDonationsCard({ 
  totalDonations, 
  change, 
  title = "Toplam Bağışlar",
  className = ""
}: TotalDonationsCardProps) {
  const formattedAmount = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalDonations)

  return (
    <Card className={`financial-card dashboard-widget ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-financial-primary">
          {formattedAmount}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <TrendingUp className="h-4 w-4 text-financial-success mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-financial-error mr-1" />
            )}
            <span className={`text-sm ${change > 0 ? 'text-financial-success' : 'text-financial-error'}`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-muted-foreground ml-1">önceki aya göre</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function MonthlyGrowthCard({ 
  growthRate, 
  period = "Bu Ay",
  title = "Büyüme Oranı",
  className = ""
}: MonthlyGrowthCardProps) {
  const isPositive = growthRate > 0
  
  return (
    <Card className={`financial-card dashboard-widget ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-financial-success" />
        ) : (
          <TrendingDown className="h-4 w-4 text-financial-error" />
        )}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${isPositive ? 'text-financial-success' : 'text-financial-error'}`}>
          {isPositive ? '+' : ''}{growthRate}%
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {period} döneminde
        </p>
      </CardContent>
    </Card>
  )
}

export function ActiveBeneficiariesCard({ 
  count, 
  change,
  title = "Aktif Yararlanıcılar",
  className = ""
}: ActiveBeneficiariesCardProps) {
  const formattedCount = new Intl.NumberFormat('tr-TR').format(count)
  
  return (
    <Card className={`financial-card dashboard-widget ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-financial-primary">
          {formattedCount}
        </div>
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {change > 0 ? (
              <TrendingUp className="h-4 w-4 text-financial-success mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-financial-error mr-1" />
            )}
            <span className={`text-sm ${change > 0 ? 'text-financial-success' : 'text-financial-error'}`}>
              {change > 0 ? '+' : ''}{change}
            </span>
            <span className="text-sm text-muted-foreground ml-1">yeni kayıt</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function FundDistributionCard({ 
  distributionRate, 
  status = 'good',
  title = "Fon Dağıtım Oranı",
  className = ""
}: FundDistributionCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-financial-success'
      case 'warning':
        return 'text-financial-warning'
      case 'critical':
        return 'text-financial-error'
      default:
        return 'text-financial-primary'
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case 'good':
        return <Badge variant="default" className="bg-financial-success text-white">İyi</Badge>
      case 'warning':
        return <Badge variant="default" className="bg-financial-warning text-white">Dikkat</Badge>
      case 'critical':
        return <Badge variant="destructive">Kritik</Badge>
      default:
        return null
    }
  }
  
  return (
    <Card className={`financial-card dashboard-widget ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <PieChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${getStatusColor()}`}>
          {distributionRate}%
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            Toplam fonların dağıtımı
          </p>
          {getStatusBadge()}
        </div>
      </CardContent>
    </Card>
  )
}
