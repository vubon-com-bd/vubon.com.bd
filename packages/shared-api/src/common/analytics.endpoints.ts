import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminAnalytics,
  AdminAnalyticsCreateInput,
  AdminAnalyticsQuery,
  AdminAnalyticsSummary,
} from '@vubon/shared-types';

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

// Admin Analytics Endpoints
export class AdminAnalyticsEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin analytics
   * অ্যাডমিন অ্যানালিটিক্স পাওয়া
   */
  async getAnalytics(adminId: string, query?: AdminAnalyticsQuery): Promise<AdminAnalytics[]> {
    const params: Record<string, string> = {};
    if (query?.type) params.type = query.type;
    if (query?.period) params.period = query.period;
    if (query?.startDate) params.startDate = query.startDate.toISOString();
    if (query?.endDate) params.endDate = query.endDate.toISOString();
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get<AdminAnalytics[]>(`/admin/${adminId}/analytics`, { params });
  }

  /**
   * Get admin analytics summary
   * অ্যাডমিন অ্যানালিটিক্স সেরসংক্ষেপ পাওয়া
   */
  async getAnalyticsSummary(adminId: string): Promise<AdminAnalyticsSummary> {
    return this.client.get<AdminAnalyticsSummary>(`/admin/${adminId}/analytics/summary`);
  }

  /**
   * Create admin analytics
   * অ্যাডমিন অ্যানালিটিক্স তৈরি করা
   */
  async createAnalytics(adminId: string, data: AdminAnalyticsCreateInput): Promise<AdminAnalytics> {
    return this.client.post<AdminAnalytics>(`/admin/${adminId}/analytics`, data);
  }

  /**
   * Get admin analytics by type
   * টাইপ অনুযায়ী অ্যাডমিন অ্যানালিটিক্স পাওয়া
   */
  async getAnalyticsByType(adminId: string, type: string): Promise<AdminAnalytics[]> {
    return this.client.get<AdminAnalytics[]>(`/admin/${adminId}/analytics/type/${type}`);
  }

  /**
   * Get admin analytics by period
   * পিরিয়ড অনুযায়ী অ্যাডমিন অ্যানালিটিক্স পাওয়া
   */
  async getAnalyticsByPeriod(adminId: string, period: string): Promise<AdminAnalytics[]> {
    return this.client.get<AdminAnalytics[]>(`/admin/${adminId}/analytics/period/${period}`);
  }

  /**
   * Get current admin analytics
   * বর্তমান অ্যাডমিনের অ্যানালিটিক্স পাওয়া
   */
  async getMyAnalytics(query?: AdminAnalyticsQuery): Promise<AdminAnalytics[]> {
    const params: Record<string, string> = {};
    if (query?.type) params.type = query.type;
    if (query?.period) params.period = query.period;
    if (query?.startDate) params.startDate = query.startDate.toISOString();
    if (query?.endDate) params.endDate = query.endDate.toISOString();
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get<AdminAnalytics[]>('/admin/me/analytics', { params });
  }

  /**
   * Get current admin analytics summary
   * বর্তমান অ্যাডমিনের অ্যানালিটিক্স সেরসংক্ষেপ পাওয়া
   */
  async getMyAnalyticsSummary(): Promise<AdminAnalyticsSummary> {
    return this.client.get<AdminAnalyticsSummary>('/admin/me/analytics/summary');
  }
}
