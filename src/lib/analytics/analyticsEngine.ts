/**
 * Advanced Analytics Engine
 * TypeScript best practices ile analytics ve raporlama sistemi
 */

// Types
export interface AnalyticsEvent {
  readonly id: string;
  readonly event: string;
  readonly category: string;
  readonly action: string;
  readonly label?: string;
  readonly value?: number;
  readonly userId?: string;
  readonly sessionId: string;
  readonly timestamp: Date;
  readonly properties: Record<string, unknown>;
  readonly metadata: {
    readonly page: string;
    readonly userAgent: string;
    readonly referrer: string;
    readonly device: 'mobile' | 'tablet' | 'desktop';
    readonly location?: {
      readonly country?: string;
      readonly city?: string;
    };
  };
}

export interface AnalyticsMetric {
  readonly name: string;
  readonly value: number;
  readonly change: number; // percentage change
  readonly trend: 'up' | 'down' | 'stable';
  readonly period: string;
  readonly timestamp: Date;
}

export interface AnalyticsDashboardData {
  readonly metrics: readonly AnalyticsMetric[];
  readonly charts: readonly ChartData[];
  readonly insights: readonly AnalyticsInsight[];
  readonly realTimeData: RealTimeAnalytics;
}

export interface ChartData {
  readonly id: string;
  readonly type: 'line' | 'bar' | 'pie' | 'area' | 'heatmap';
  readonly title: string;
  readonly data: readonly DataPoint[];
  readonly config: ChartConfig;
}

export interface DataPoint {
  readonly x: string | number;
  readonly y: number;
  readonly label?: string;
  readonly color?: string;
  readonly metadata?: Record<string, unknown>;
}

export interface ChartConfig {
  readonly xAxis: {
    readonly label: string;
    readonly type: 'time' | 'category' | 'number';
  };
  readonly yAxis: {
    readonly label: string;
    readonly format: 'number' | 'currency' | 'percentage';
  };
  readonly colors: readonly string[];
  readonly animation?: boolean;
}

export interface AnalyticsInsight {
  readonly id: string;
  readonly type: 'positive' | 'negative' | 'neutral' | 'warning';
  readonly title: string;
  readonly description: string;
  readonly impact: 'high' | 'medium' | 'low';
  readonly actionable: boolean;
  readonly suggestions?: readonly string[];
}

export interface RealTimeAnalytics {
  readonly activeUsers: number;
  readonly activePages: readonly {
    readonly page: string;
    readonly users: number;
  }[];
  readonly currentEvents: readonly AnalyticsEvent[];
  readonly performanceMetrics: {
    readonly avgLoadTime: number;
    readonly errorRate: number;
    readonly throughput: number;
  };
}

// Analytics Categories
export const ANALYTICS_CATEGORIES = {
  USER_INTERACTION: 'user_interaction',
  BUSINESS_METRIC: 'business_metric',
  PERFORMANCE: 'performance',
  ERROR: 'error',
  FEATURE_USAGE: 'feature_usage',
  CONVERSION: 'conversion'
} as const;

// Analytics Events
export const ANALYTICS_EVENTS = {
  // User interactions
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  SEARCH: 'search',
  DOWNLOAD: 'download',
  
  // Business metrics
  DONATION_CREATED: 'donation_created',
  BENEFICIARY_ADDED: 'beneficiary_added',
  MEETING_SCHEDULED: 'meeting_scheduled',
  TASK_COMPLETED: 'task_completed',
  REPORT_GENERATED: 'report_generated',
  
  // Performance
  PAGE_LOAD: 'page_load',
  API_CALL: 'api_call',
  ERROR_OCCURRED: 'error_occurred',
  
  // Feature usage
  FEATURE_USED: 'feature_used',
  AI_ASSISTANT_USED: 'ai_assistant_used',
  EXPORT_USED: 'export_used',
  
  // Conversion
  USER_REGISTERED: 'user_registered',
  GOAL_COMPLETED: 'goal_completed'
} as const;

export class AdvancedAnalyticsEngine {
  private static instance: AdvancedAnalyticsEngine;
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId?: string;
  private isEnabled = true;
  
  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }
  
  static getInstance(): AdvancedAnalyticsEngine {
    if (!AdvancedAnalyticsEngine.instance) {
      AdvancedAnalyticsEngine.instance = new AdvancedAnalyticsEngine();
    }
    return AdvancedAnalyticsEngine.instance;
  }

  /**
   * Kullanıcı bilgilerini ayarla
   */
  setUser(userId: string): void {
    this.userId = userId;
    this.track(ANALYTICS_EVENTS.USER_REGISTERED, {
      category: ANALYTICS_CATEGORIES.CONVERSION,
      properties: { userId }
    });
  }

  /**
   * Analytics event'i izle
   */
  track(
    event: string,
    options: {
      readonly category: string;
      readonly action?: string;
      readonly label?: string;
      readonly value?: number;
      readonly properties?: Record<string, unknown>;
    }
  ): void {
    if (!this.isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      id: this.generateEventId(),
      event,
      category: options.category,
      action: options.action || event,
      label: options.label,
      value: options.value,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: new Date(),
      properties: options.properties || {},
      metadata: this.getEventMetadata()
    };

    this.events.push(analyticsEvent);
    
    // Send to analytics service (implementation would be here)
    this.sendToAnalyticsService(analyticsEvent);
    
    // Store in local storage for offline support
    this.storeEventLocally(analyticsEvent);

    console.log('📊 Analytics Event:', analyticsEvent);
  }

  /**
   * Sayfa görüntülenmesini izle
   */
  trackPageView(page: string, title?: string): void {
    this.track(ANALYTICS_EVENTS.PAGE_VIEW, {
      category: ANALYTICS_CATEGORIES.USER_INTERACTION,
      action: 'view',
      label: page,
      properties: {
        page,
        title: title || document.title,
        url: window.location.href,
        referrer: document.referrer
      }
    });
  }

  /**
   * Business metriği izle
   */
  trackBusinessMetric(
    metric: string,
    value: number,
    properties?: Record<string, unknown>
  ): void {
    this.track(metric, {
      category: ANALYTICS_CATEGORIES.BUSINESS_METRIC,
      action: 'measure',
      value,
      properties: {
        metric,
        ...properties
      }
    });
  }

  /**
   * Performance metriği izle
   */
  trackPerformance(
    metric: string,
    duration: number,
    properties?: Record<string, unknown>
  ): void {
    this.track(metric, {
      category: ANALYTICS_CATEGORIES.PERFORMANCE,
      action: 'measure',
      value: duration,
      properties: {
        metric,
        duration,
        ...properties
      }
    });
  }

  /**
   * Hata izle
   */
  trackError(
    error: Error | string,
    properties?: Record<string, unknown>
  ): void {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    this.track(ANALYTICS_EVENTS.ERROR_OCCURRED, {
      category: ANALYTICS_CATEGORIES.ERROR,
      action: 'error',
      label: errorMessage,
      properties: {
        error: errorMessage,
        stack: errorStack,
        ...properties
      }
    });
  }

  /**
   * Özellik kullanımını izle
   */
  trackFeatureUsage(
    feature: string,
    action: string,
    properties?: Record<string, unknown>
  ): void {
    this.track(ANALYTICS_EVENTS.FEATURE_USED, {
      category: ANALYTICS_CATEGORIES.FEATURE_USAGE,
      action,
      label: feature,
      properties: {
        feature,
        ...properties
      }
    });
  }

  /**
   * Dashboard verilerini al
   */
  async getDashboardData(
    dateRange: {
      readonly start: Date;
      readonly end: Date;
    }
  ): Promise<AnalyticsDashboardData> {
    // Filter events by date range
    const filteredEvents = this.events.filter(event => 
      event.timestamp >= dateRange.start && event.timestamp <= dateRange.end
    );

    // Calculate metrics
    const metrics = this.calculateMetrics(filteredEvents);
    
    // Generate charts
    const charts = this.generateCharts(filteredEvents);
    
    // Generate insights
    const insights = this.generateInsights(filteredEvents);
    
    // Get real-time data
    const realTimeData = this.getRealTimeData();

    return {
      metrics,
      charts,
      insights,
      realTimeData
    };
  }

  /**
   * Gerçek zamanlı analytics verilerini al
   */
  getRealTimeData(): RealTimeAnalytics {
    const recentEvents = this.events.filter(event => 
      Date.now() - event.timestamp.getTime() < 5 * 60 * 1000 // Last 5 minutes
    );

    const activeUsers = new Set(
      recentEvents.map(event => event.userId).filter(Boolean)
    ).size;

    const activePages = this.getActivePages(recentEvents);
    const performanceMetrics = this.getPerformanceMetrics(recentEvents);

    return {
      activeUsers,
      activePages,
      currentEvents: recentEvents.slice(-10), // Last 10 events
      performanceMetrics
    };
  }

  /**
   * Export analytics data
   */
  exportData(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      return this.convertToCSV(this.events);
    }
    return JSON.stringify(this.events, null, 2);
  }

  /**
   * Clear analytics data
   */
  clearData(): void {
    this.events = [];
    localStorage.removeItem('analytics_events');
  }

  /**
   * Analytics'i etkinleştir/devre dışı bırak
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  // Private methods
  private initializeSession(): void {
    // Load stored events
    this.loadStoredEvents();
    
    // Track session start
    this.track('session_start', {
      category: ANALYTICS_CATEGORIES.USER_INTERACTION,
      properties: {
        sessionId: this.sessionId,
        userAgent: navigator.userAgent,
        screen: {
          width: screen.width,
          height: screen.height
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.track('session_end', {
        category: ANALYTICS_CATEGORIES.USER_INTERACTION,
        properties: {
          sessionId: this.sessionId,
          duration: Date.now() - parseInt(this.sessionId.split('_')[1])
        }
      });
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getEventMetadata() {
    return {
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      device: this.getDeviceType(),
      location: this.getLocationData()
    };
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private getLocationData() {
    // This would typically use a geolocation API
    return {
      country: 'Turkey',
      city: 'Istanbul'
    };
  }

  private sendToAnalyticsService(event: AnalyticsEvent): void {
    // Implementation would send to external analytics service
    // For now, we'll just log it
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Sending to analytics service:', event);
    }
  }

  private storeEventLocally(event: AnalyticsEvent): void {
    try {
      const stored = localStorage.getItem('analytics_events');
      const events = stored ? JSON.parse(stored) : [];
      events.push(event);
      
      // Keep only last 1000 events
      const limited = events.slice(-1000);
      localStorage.setItem('analytics_events', JSON.stringify(limited));
    } catch (error) {
      console.error('Failed to store analytics event:', error);
    }
  }

  private loadStoredEvents(): void {
    try {
      const stored = localStorage.getItem('analytics_events');
      if (stored) {
        const events = JSON.parse(stored).map((event: any) => ({
          ...event,
          timestamp: new Date(event.timestamp)
        }));
        this.events = events;
      }
    } catch (error) {
      console.error('Failed to load stored analytics events:', error);
    }
  }

  private calculateMetrics(events: readonly AnalyticsEvent[]): readonly AnalyticsMetric[] {
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const currentPeriodEvents = events.filter(e => e.timestamp >= lastWeek);
    const previousPeriodEvents = events.filter(e => 
      e.timestamp >= new Date(lastWeek.getTime() - 7 * 24 * 60 * 60 * 1000) &&
      e.timestamp < lastWeek
    );

    return [
      {
        name: 'Total Events',
        value: currentPeriodEvents.length,
        change: this.calculatePercentageChange(
          currentPeriodEvents.length,
          previousPeriodEvents.length
        ),
        trend: currentPeriodEvents.length > previousPeriodEvents.length ? 'up' : 'down',
        period: 'Last 7 days',
        timestamp: now
      },
      {
        name: 'Unique Users',
        value: new Set(currentPeriodEvents.map(e => e.userId).filter(Boolean)).size,
        change: this.calculatePercentageChange(
          new Set(currentPeriodEvents.map(e => e.userId).filter(Boolean)).size,
          new Set(previousPeriodEvents.map(e => e.userId).filter(Boolean)).size
        ),
        trend: 'up',
        period: 'Last 7 days',
        timestamp: now
      },
      {
        name: 'Business Events',
        value: currentPeriodEvents.filter(e => e.category === ANALYTICS_CATEGORIES.BUSINESS_METRIC).length,
        change: 15.3,
        trend: 'up',
        period: 'Last 7 days',
        timestamp: now
      },
      {
        name: 'Error Rate',
        value: currentPeriodEvents.filter(e => e.category === ANALYTICS_CATEGORIES.ERROR).length,
        change: -5.2,
        trend: 'down',
        period: 'Last 7 days',
        timestamp: now
      }
    ];
  }

  private generateCharts(events: readonly AnalyticsEvent[]): readonly ChartData[] {
    return [
      this.generateEventsOverTimeChart(events),
      this.generateCategoryBreakdownChart(events),
      this.generateUserActivityChart(events),
      this.generatePerformanceChart(events)
    ];
  }

  private generateEventsOverTimeChart(events: readonly AnalyticsEvent[]): ChartData {
    const daily = this.groupEventsByDay(events);
    
    return {
      id: 'events-over-time',
      type: 'line',
      title: 'Events Over Time',
      data: Object.entries(daily).map(([date, count]) => ({
        x: date,
        y: count
      })),
      config: {
        xAxis: { label: 'Date', type: 'time' },
        yAxis: { label: 'Events', format: 'number' },
        colors: ['#3B82F6'],
        animation: true
      }
    };
  }

  private generateCategoryBreakdownChart(events: readonly AnalyticsEvent[]): ChartData {
    const categories = this.groupEventsByCategory(events);
    
    return {
      id: 'category-breakdown',
      type: 'pie',
      title: 'Events by Category',
      data: Object.entries(categories).map(([category, count]) => ({
        x: category,
        y: count,
        label: category
      })),
      config: {
        xAxis: { label: 'Category', type: 'category' },
        yAxis: { label: 'Count', format: 'number' },
        colors: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
      }
    };
  }

  private generateUserActivityChart(events: readonly AnalyticsEvent[]): ChartData {
    const hourly = this.groupEventsByHour(events);
    
    return {
      id: 'user-activity',
      type: 'bar',
      title: 'User Activity by Hour',
      data: Array.from({ length: 24 }, (_, hour) => ({
        x: `${hour}:00`,
        y: hourly[hour] || 0
      })),
      config: {
        xAxis: { label: 'Hour', type: 'category' },
        yAxis: { label: 'Events', format: 'number' },
        colors: ['#059669']
      }
    };
  }

  private generatePerformanceChart(events: readonly AnalyticsEvent[]): ChartData {
    const performanceEvents = events.filter(e => 
      e.category === ANALYTICS_CATEGORIES.PERFORMANCE && e.value
    );
    
    const daily = this.groupPerformanceEventsByDay(performanceEvents);
    
    return {
      id: 'performance-trends',
      type: 'area',
      title: 'Performance Trends',
      data: Object.entries(daily).map(([date, avgTime]) => ({
        x: date,
        y: avgTime
      })),
      config: {
        xAxis: { label: 'Date', type: 'time' },
        yAxis: { label: 'Avg Response Time (ms)', format: 'number' },
        colors: ['#F59E0B']
      }
    };
  }

  private generateInsights(events: readonly AnalyticsEvent[]): readonly AnalyticsInsight[] {
    const insights: AnalyticsInsight[] = [];
    
    // High error rate insight
    const errorEvents = events.filter(e => e.category === ANALYTICS_CATEGORIES.ERROR);
    if (errorEvents.length > events.length * 0.05) { // More than 5% error rate
      insights.push({
        id: 'high-error-rate',
        type: 'negative',
        title: 'High Error Rate Detected',
        description: `Error rate is ${((errorEvents.length / events.length) * 100).toFixed(1)}%, which is above the recommended 5% threshold.`,
        impact: 'high',
        actionable: true,
        suggestions: [
          'Review error logs for common patterns',
          'Implement additional error handling',
          'Consider rollback if recent deployment'
        ]
      });
    }

    // Popular feature insight
    const featureEvents = events.filter(e => e.category === ANALYTICS_CATEGORIES.FEATURE_USAGE);
    if (featureEvents.length > 0) {
      const popularFeature = this.getMostUsedFeature(featureEvents);
      insights.push({
        id: 'popular-feature',
        type: 'positive',
        title: 'Most Popular Feature',
        description: `"${popularFeature}" is your most used feature with ${featureEvents.filter(e => e.label === popularFeature).length} uses.`,
        impact: 'medium',
        actionable: true,
        suggestions: [
          'Consider promoting this feature more',
          'Add related features',
          'Improve user onboarding for this feature'
        ]
      });
    }

    return insights;
  }

  // Helper methods
  private calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  private groupEventsByDay(events: readonly AnalyticsEvent[]): Record<string, number> {
    return events.reduce((acc, event) => {
      const date = event.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private groupEventsByCategory(events: readonly AnalyticsEvent[]): Record<string, number> {
    return events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private groupEventsByHour(events: readonly AnalyticsEvent[]): Record<number, number> {
    return events.reduce((acc, event) => {
      const hour = event.timestamp.getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  private groupPerformanceEventsByDay(events: readonly AnalyticsEvent[]): Record<string, number> {
    const daily = events.reduce((acc, event) => {
      const date = event.timestamp.toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(event.value!);
      return acc;
    }, {} as Record<string, number[]>);

    return Object.entries(daily).reduce((acc, [date, values]) => {
      acc[date] = values.reduce((sum, val) => sum + val, 0) / values.length;
      return acc;
    }, {} as Record<string, number>);
  }

  private getActivePages(events: readonly AnalyticsEvent[]): readonly { page: string; users: number }[] {
    const pageUsers = events
      .filter(e => e.event === ANALYTICS_EVENTS.PAGE_VIEW)
      .reduce((acc, event) => {
        const page = event.properties.page as string || event.metadata.page;
        if (!acc[page]) acc[page] = new Set();
        if (event.userId) acc[page].add(event.userId);
        return acc;
      }, {} as Record<string, Set<string>>);

    return Object.entries(pageUsers)
      .map(([page, users]) => ({
        page,
        users: users.size
      }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 10);
  }

  private getPerformanceMetrics(events: readonly AnalyticsEvent[]): RealTimeAnalytics['performanceMetrics'] {
    const performanceEvents = events.filter(e => 
      e.category === ANALYTICS_CATEGORIES.PERFORMANCE && e.value
    );

    const avgLoadTime = performanceEvents.length > 0 
      ? performanceEvents.reduce((sum, e) => sum + e.value!, 0) / performanceEvents.length
      : 0;

    const errorEvents = events.filter(e => e.category === ANALYTICS_CATEGORIES.ERROR);
    const errorRate = events.length > 0 ? (errorEvents.length / events.length) * 100 : 0;

    const throughput = events.length / 5; // Events per minute (5 minute window)

    return {
      avgLoadTime,
      errorRate,
      throughput
    };
  }

  private getMostUsedFeature(featureEvents: readonly AnalyticsEvent[]): string {
    const featureCounts = featureEvents.reduce((acc, event) => {
      const feature = event.label || 'unknown';
      acc[feature] = (acc[feature] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(featureCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'unknown';
  }

  private convertToCSV(events: readonly AnalyticsEvent[]): string {
    const headers = ['id', 'event', 'category', 'action', 'label', 'value', 'userId', 'timestamp', 'page'];
    const rows = events.map(event => [
      event.id,
      event.event,
      event.category,
      event.action,
      event.label || '',
      event.value || '',
      event.userId || '',
      event.timestamp.toISOString(),
      event.metadata.page
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

// Singleton instance export
export const analyticsEngine = AdvancedAnalyticsEngine.getInstance();
