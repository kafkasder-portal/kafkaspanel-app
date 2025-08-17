/**
 * Analytics Chart Component
 * TypeScript best practices ile chart rendering
 */

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import type { ChartData } from '@/lib/analytics/analyticsEngine';

interface AnalyticsChartProps {
  readonly chart: ChartData;
  readonly height?: number;
  readonly className?: string;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  chart,
  height = 300,
  className = ''
}) => {
  // Process data for recharts
  const chartData = useMemo(() => {
    return chart.data.map((point, index) => ({
      name: point.label || point.x.toString(),
      value: point.y,
      x: point.x,
      y: point.y,
      color: point.color || chart.config.colors[index % chart.config.colors.length]
    }));
  }, [chart]);

  const formatTooltipValue = (value: number): string => {
    switch (chart.config.yAxis.format) {
      case 'currency':
        return `₺${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      default:
        return value.toLocaleString();
    }
  };

  const formatXAxisValue = (value: string): string => {
    if (chart.config.xAxis.type === 'time') {
      try {
        const date = new Date(value);
        return date.toLocaleDateString('tr-TR', { 
          month: 'short', 
          day: 'numeric' 
        });
      } catch {
        return value;
      }
    }
    return value;
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (chart.type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisValue}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatTooltipValue(value)}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltipValue(value), chart.config.yAxis.label]}
              labelFormatter={(label) => `${chart.config.xAxis.label}: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chart.config.colors[0]}
              strokeWidth={2}
              dot={{ fill: chart.config.colors[0], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={chart.config.animation ? 1500 : 0}
            />
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisValue}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatTooltipValue(value)}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltipValue(value), chart.config.yAxis.label]}
              labelFormatter={(label) => `${chart.config.xAxis.label}: ${label}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chart.config.colors[0]}
              fill={chart.config.colors[0]}
              fillOpacity={0.3}
              strokeWidth={2}
              animationDuration={chart.config.animation ? 1500 : 0}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickFormatter={formatXAxisValue}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatTooltipValue(value)}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltipValue(value), chart.config.yAxis.label]}
              labelFormatter={(label) => `${chart.config.xAxis.label}: ${label}`}
            />
            <Legend />
            <Bar
              dataKey="value"
              fill={chart.config.colors[0]}
              radius={[4, 4, 0, 0]}
              animationDuration={chart.config.animation ? 1500 : 0}
            />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={Math.min(height * 0.35, 120)}
              fill="#8884d8"
              dataKey="value"
              animationDuration={chart.config.animation ? 1500 : 0}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || chart.config.colors[index % chart.config.colors.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [formatTooltipValue(value), chart.config.yAxis.label]}
            />
            <Legend />
          </PieChart>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500">
            Unsupported chart type: {chart.type}
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{chart.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <span>{chart.config.xAxis.label}</span>
          <span>•</span>
          <span>{chart.config.yAxis.label}</span>
        </div>
      </div>
      
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
