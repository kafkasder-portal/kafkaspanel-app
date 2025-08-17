/**
 * Analytics Metric Card Component
 * TypeScript best practices ile metrik kartı
 */

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { AnalyticsMetric } from '@/lib/analytics/analyticsEngine';

interface AnalyticsMetricCardProps {
  readonly metric: AnalyticsMetric;
  readonly className?: string;
}

export const AnalyticsMetricCard: React.FC<AnalyticsMetricCardProps> = ({
  metric,
  className = ''
}) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const formatChange = (change: number): string => {
    const abs = Math.abs(change);
    return `${change >= 0 ? '+' : ''}${abs.toFixed(1)}%`;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-xs font-medium">
            {formatChange(metric.change)}
          </span>
        </div>
      </div>
      
      <div className="mb-1">
        <div className="text-2xl font-bold text-gray-900">
          {formatValue(metric.value)}
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        {metric.period}
      </div>
    </div>
  );
};
