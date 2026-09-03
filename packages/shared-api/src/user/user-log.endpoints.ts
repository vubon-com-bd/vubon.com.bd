/**
 * User Log Endpoints
 * ইউজার লগ এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserLog, UserLogCreateInput, UserLogQuery } from '@vubon/shared-types';
import { USER_LOG } from '@vubon/shared-constants';

export class UserLogEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user logs
   * ইউজারের লগ পাওয়া
   */
  async getLogs(
    userId: string,
    query?: UserLogQuery
  ): Promise<{
    logs: UserLog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (query?.level) params.level = query.level;
    if (query?.category) params.category = query.category;
    if (query?.startDate) params.startDate = query.startDate.toISOString();
    if (query?.endDate) params.endDate = query.endDate.toISOString();
    if (query?.search) params.search = query.search;
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get(`/users/${userId}/logs`, { params });
  }

  /**
   * Get current user logs
   * বর্তমান ইউজারের লগ পাওয়া
   */
  async getMyLogs(query?: UserLogQuery): Promise<{
    logs: UserLog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (query?.level) params.level = query.level;
    if (query?.category) params.category = query.category;
    if (query?.startDate) params.startDate = query.startDate.toISOString();
    if (query?.endDate) params.endDate = query.endDate.toISOString();
    if (query?.search) params.search = query.search;
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get('/users/me/logs', { params });
  }

  /**
   * Get log by ID
   * আইডি দ্বারা লগ পাওয়া
   */
  async getLog(logId: string): Promise<UserLog> {
    return this.client.get<UserLog>(`/users/logs/${logId}`);
  }

  /**
   * Create log
   * লগ তৈরি করা
   */
  async createLog(data: UserLogCreateInput): Promise<UserLog> {
    return this.client.post<UserLog>('/users/logs', data);
  }

  /**
   * Get log stats
   * লগ স্ট্যাটিসটিক্স পাওয়া
   */
  async getLogStats(
    userId: string,
    days?: number
  ): Promise<{
    total: number;
    byLevel: Record<string, number>;
    byCategory: Record<string, number>;
    errors: number;
    warnings: number;
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get(`/users/${userId}/logs/stats`, { params });
  }

  /**
   * Get current user log stats
   * বর্তমান ইউজারের লগ স্ট্যাটিসটিক্স পাওয়া
   */
  async getMyLogStats(days?: number): Promise<{
    total: number;
    byLevel: Record<string, number>;
    byCategory: Record<string, number>;
    errors: number;
    warnings: number;
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get('/users/me/logs/stats', { params });
  }

  /**
   * Clear logs
   * লগ ক্লিয়ার করা
   */
  async clearLogs(
    userId: string,
    olderThan?: number
  ): Promise<{ success: boolean; count: number }> {
    const params: Record<string, string> = {};
    if (olderThan) params.olderThan = String(olderThan);
    return this.client.delete(`/users/${userId}/logs`, { params });
  }

  /**
   * Export logs
   * লগ এক্সপোর্ট করা
   */
  async exportLogs(userId: string, query?: UserLogQuery, format: string = 'csv'): Promise<Blob> {
    const params: Record<string, string> = { format };
    if (query?.level) params.level = query.level;
    if (query?.category) params.category = query.category;
    if (query?.startDate) params.startDate = query.startDate.toISOString();
    if (query?.endDate) params.endDate = query.endDate.toISOString();
    if (query?.search) params.search = query.search;

    return this.client.get(`/users/${userId}/logs/export`, { params });
  }

  /**
   * Get log levels from constants
   * কনস্ট্যান্ট থেকে লগ লেভেল পাওয়া
   */
  getLogLevels(): Record<string, string> {
    return {
      DEBUG: USER_LOG.LEVELS.DEBUG,
      INFO: USER_LOG.LEVELS.INFO,
      WARN: USER_LOG.LEVELS.WARN,
      ERROR: USER_LOG.LEVELS.ERROR,
      CRITICAL: USER_LOG.LEVELS.CRITICAL,
    };
  }

  /**
   * Get log categories from constants
   * কনস্ট্যান্ট থেকে লগ ক্যাটাগরি পাওয়া
   */
  getLogCategories(): Record<string, string> {
    return {
      AUTH: USER_LOG.CATEGORIES.AUTH,
      USER: USER_LOG.CATEGORIES.USER,
      PROFILE: USER_LOG.CATEGORIES.PROFILE,
      SETTINGS: USER_LOG.CATEGORIES.SETTINGS,
      SECURITY: USER_LOG.CATEGORIES.SECURITY,
      PAYMENT: USER_LOG.CATEGORIES.PAYMENT,
      ORDER: USER_LOG.CATEGORIES.ORDER,
      KYC: USER_LOG.CATEGORIES.KYC,
      VERIFICATION: USER_LOG.CATEGORIES.VERIFICATION,
      SYSTEM: USER_LOG.CATEGORIES.SYSTEM,
      API: USER_LOG.CATEGORIES.API,
    };
  }

  /**
   * Get log formats from constants
   * কনস্ট্যান্ট থেকে লগ ফরম্যাট পাওয়া
   */
  getLogFormats(): Record<string, string> {
    return {
      JSON: USER_LOG.FORMATS.JSON,
      TEXT: USER_LOG.FORMATS.TEXT,
      CSV: USER_LOG.FORMATS.CSV,
    };
  }
}
