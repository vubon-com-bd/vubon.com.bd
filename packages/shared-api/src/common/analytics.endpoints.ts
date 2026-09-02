import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
  userId?: string;
  sessionId?: string;
}

export interface AnalyticsOptions {
  startDate?: string;
  endDate?: string;
  interval?: 'hourly' | 'daily' | 'weekly' | 'monthly';
  metrics?: string[];
  dimensions?: string[];
  filters?: Record<string, unknown>;
}

export interface AnalyticsResponse {
  data: {
    timestamp: string;
    values: Record<string, number>;
  }[];
  summary?: Record<string, number>;
  total?: number;
}

export interface EventStats {
  eventName: string;
  total: number;
  uniqueUsers: number;
  uniqueSessions: number;
  averagePerUser: number;
}

export class AnalyticsEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async track(event: AnalyticsEvent): Promise<{ success: boolean; id: string }> {
    return this.client.post<{ success: boolean; id: string }>('/analytics/track', event);
  }

  async trackBatch(events: AnalyticsEvent[]): Promise<{ success: boolean; count: number }> {
    return this.client.post<{ success: boolean; count: number }>('/analytics/track/batch', {
      events,
    });
  }

  async getMetrics(options: AnalyticsOptions): Promise<AnalyticsResponse> {
    const params: Record<string, string> = {};
    if (options.startDate) params.startDate = options.startDate;
    if (options.endDate) params.endDate = options.endDate;
    if (options.interval) params.interval = options.interval;
    if (options.metrics) params.metrics = options.metrics.join(',');
    if (options.dimensions) params.dimensions = options.dimensions.join(',');
    if (options.filters) params.filters = JSON.stringify(options.filters);

    return this.client.get<AnalyticsResponse>('/analytics/metrics', { params });
  }

  async getEventStats(options: {
    eventName: string;
    startDate?: string;
    endDate?: string;
  }): Promise<EventStats> {
    const params: Record<string, string> = { eventName: options.eventName };
    if (options.startDate) params.startDate = options.startDate;
    if (options.endDate) params.endDate = options.endDate;

    return this.client.get<EventStats>('/analytics/events/stats', { params });
  }

  async getTopEvents(limit: number = 10): Promise<EventStats[]> {
    return this.client.get<EventStats[]>('/analytics/events/top', {
      params: { limit: String(limit) },
    });
  }

  async getUserAnalytics(
    userId: string,
    options: Omit<AnalyticsOptions, 'filters'>
  ): Promise<AnalyticsResponse> {
    const params: Record<string, string> = {};
    if (options.startDate) params.startDate = options.startDate;
    if (options.endDate) params.endDate = options.endDate;
    if (options.interval) params.interval = options.interval;
    if (options.metrics) params.metrics = options.metrics?.join(',');
    if (options.dimensions) params.dimensions = options.dimensions?.join(',');

    return this.client.get<AnalyticsResponse>(`/analytics/users/${userId}`, { params });
  }

  async getSessionAnalytics(
    sessionId: string,
    options: Omit<AnalyticsOptions, 'filters'>
  ): Promise<AnalyticsResponse> {
    const params: Record<string, string> = {};
    if (options.startDate) params.startDate = options.startDate;
    if (options.endDate) params.endDate = options.endDate;
    if (options.interval) params.interval = options.interval;
    if (options.metrics) params.metrics = options.metrics?.join(',');
    if (options.dimensions) params.dimensions = options.dimensions?.join(',');

    return this.client.get<AnalyticsResponse>(`/analytics/sessions/${sessionId}`, { params });
  }

  async getRealtimeAnalytics(): Promise<{
    activeUsers: number;
    currentVisitors: number;
    pageViews: number;
    events: { name: string; count: number }[];
  }> {
    return this.client.get('/analytics/realtime');
  }

  async getDashboardAnalytics(days: number = 30): Promise<{
    totalVisitors: number;
    uniqueVisitors: number;
    pageViews: number;
    bounceRate: number;
    averageSessionDuration: number;
    topPages: { path: string; views: number }[];
    trafficSources: { source: string; count: number }[];
  }> {
    return this.client.get('/analytics/dashboard', { params: { days: String(days) } });
  }
}
