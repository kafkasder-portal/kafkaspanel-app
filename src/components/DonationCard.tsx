import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { TrendingUp, TrendingDown, Users, DollarSign, CreditCard, Globe } from 'lucide-react'

interface BaseCardProps {
  title?: string
  className?: string
}

interface TotalDonationsCardProps extends BaseCardProps {
  title: string
  amount: number
  change?: number
  period?: string
}

interface MonthlyDonationsCardProps extends BaseCardProps {
  title: string
  amount: number
  monthlyTarget?: number
}

interface DonorCountCardProps extends BaseCardProps {
  title: string
  count: number
  change?: number
}

interface OnlineDonationsCardProps extends BaseCardProps {
  title: string
  amount: number
  percentage?: number
}

export function TotalDonationsCard({ 
  title,
  amount, 
  change, 
  period = "Bu Ay",
  className = ""
}: TotalDonationsCardProps) {
  const formattedAmount = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
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
            <span className="text-sm text-muted-foreground ml-1">{period}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function MonthlyDonationsCard({ 
  title,
  amount,
  monthlyTarget,
  className = ""
}: MonthlyDonationsCardProps) {
  const formattedAmount = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  const targetPercentage = monthlyTarget ? Math.round((amount / monthlyTarget) * 100) : null
  
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
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
        {monthlyTarget && targetPercentage && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Hedef: {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(monthlyTarget)}</span>
              <span className={targetPercentage >= 100 ? 'text-financial-success' : 'text-financial-warning'}>
                {targetPercentage}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full ${targetPercentage >= 100 ? 'bg-financial-success' : 'bg-financial-warning'}`}
                style={{ width: `${Math.min(targetPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function DonorCountCard({ 
  title,
  count,
  change,
  className = ""
}: DonorCountCardProps) {
  const formattedCount = new Intl.NumberFormat('tr-TR').format(count)
  
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
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
            ) : change < 0 ? (
              <TrendingDown className="h-4 w-4 text-financial-error mr-1" />
            ) : null}
            <span className={`text-sm ${
              change > 0 ? 'text-financial-success' : 
              change < 0 ? 'text-financial-error' : 
              'text-muted-foreground'
            }`}>
              {change > 0 ? '+' : ''}{change} kişi
            </span>
            <span className="text-sm text-muted-foreground ml-1">bu ay</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function OnlineDonationsCard({ 
  title,
  amount,
  percentage,
  className = ""
}: OnlineDonationsCardProps) {
  const formattedAmount = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
  
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-financial-primary">
          {formattedAmount}
        </div>
        {percentage !== undefined && (
          <div className="flex items-center mt-2">
            <Badge variant="secondary" className="text-xs">
              Toplam bağışların %{percentage}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
