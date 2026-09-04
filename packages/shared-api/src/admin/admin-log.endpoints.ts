/**
 * Admin Log Endpoints
 * অ্যাডমিন লগ এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminLog, AdminLogCreateInput, AdminLogQuery } from '@vubon/shared-types';
import { ADMIN_LOG } from '@vubon/shared-constants';

export class AdminLogEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin logs
   * অ্যাডমিনের লগ পাওয়া
   */
  async getLogs(
    adminId: string,
    query?: AdminLogQuery
  ): Promise<{
    logs: AdminLog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (query?.level) params.level = query.level;
    if (query?.category) params.category = query.category;
    if (query?.startDate) params.startDate = query.startDate?.toISOString();
    if (query?.endDate) params.endDate = query.endDate?.toISOString();
    if (query?.search) params.search = query.search;
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get(`/admin/${adminId}/logs`, { params });
  }

  /**
   * Get current admin logs
   * বর্তমান অ্যাডমিনের লগ পাওয়া
   */
  async getMyLogs(query?: AdminLogQuery): Promise<{
    logs: AdminLog[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (query?.level) params.level = query.level;
    if (query?.category) params.category = query.category;
    if (query?.startDate) params.startDate = query.startDate?.toISOString();
    if (query?.endDate) params.endDate = query.endDate?.toISOString();
    if (query?.search) params.search = query.search;
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get('/admin/me/logs', { params });
  }

  /**
   * Get log by ID
   * আইডি দ্বারা লগ পাওয়া
   */
  async getLog(logId: string): Promise<AdminLog> {
    return this.client.get<AdminLog>(`/admin/logs/${logId}`);
  }

  /**
   * Create log
   * লগ তৈরি করা
   */
  async createLog(data: AdminLogCreateInput): Promise<AdminLog> {
    return this.client.post<AdminLog>('/admin/logs', data);
  }

  /**
   * Get log stats
   * লগ স্ট্যাটিসটিক্স পাওয়া
   */
  async getLogStats(
    adminId: string,
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
    return this.client.get(`/admin/${adminId}/logs/stats`, { params });
  }

  /**
   * Get current admin log stats
   * বর্তমান অ্যাডমিনের লগ স্ট্যাটিসটিক্স পাওয়া
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
    return this.client.get('/admin/me/logs/stats', { params });
  }

  /**
   * Get log levels from constants
   * কনস্ট্যান্ট থেকে লগ লেভেল পাওয়া
   */
  getLogLevels(): Record<string, string> {
    return {
      DEBUG: ADMIN_LOG.LEVELS.DEBUG,
      INFO: ADMIN_LOG.LEVELS.INFO,
      WARN: ADMIN_LOG.LEVELS.WARN,
      ERROR: ADMIN_LOG.LEVELS.ERROR,
      CRITICAL: ADMIN_LOG.LEVELS.CRITICAL,
    };
  }

  /**
   * Get log categories from constants
   * কনস্ট্যান্ট থেকে লগ ক্যাটাগরি পাওয়া
   */
  getLogCategories(): Record<string, string> {
    return {
      AUTH: ADMIN_LOG.CATEGORIES.AUTH,
      ADMIN: ADMIN_LOG.CATEGORIES.ADMIN,
      USER: ADMIN_LOG.CATEGORIES.USER,
      CONTENT: ADMIN_LOG.CATEGORIES.CONTENT,
      FINANCE: ADMIN_LOG.CATEGORIES.FINANCE,
      SYSTEM: ADMIN_LOG.CATEGORIES.SYSTEM,
      SECURITY: ADMIN_LOG.CATEGORIES.SECURITY,
      REPORT: ADMIN_LOG.CATEGORIES.REPORT,
      SETTINGS: ADMIN_LOG.CATEGORIES.SETTINGS,
      API: ADMIN_LOG.CATEGORIES.API,
      DATABASE: ADMIN_LOG.CATEGORIES.DATABASE,
      CACHE: ADMIN_LOG.CATEGORIES.CACHE,
      QUEUE: ADMIN_LOG.CATEGORIES.QUEUE,
      NOTIFICATION: ADMIN_LOG.CATEGORIES.NOTIFICATION,
    };
  }

  /**
   * Get log formats from constants
   * কনস্ট্যান্ট থেকে লগ ফরম্যাট পাওয়া
   */
  getLogFormats(): Record<string, string> {
    return {
      JSON: ADMIN_LOG.FORMATS.JSON,
      TEXT: ADMIN_LOG.FORMATS.TEXT,
      CSV: ADMIN_LOG.FORMATS.CSV,
    };
  }

  /**
   * Get default log config from constants
   * কনস্ট্যান্ট থেকে ডিফল্ট লগ কনফিগ পাওয়া
   */
  getLogDefaults(): {
    level: string;
    format: string;
    maxSize: number;
    maxFiles: number;
    retentionDays: number;
  } {
    return {
      level: ADMIN_LOG.DEFAULTS.LEVEL,
      format: ADMIN_LOG.DEFAULTS.FORMAT,
      maxSize: ADMIN_LOG.DEFAULTS.MAX_SIZE,
      maxFiles: ADMIN_LOG.DEFAULTS.MAX_FILES,
      retentionDays: ADMIN_LOG.DEFAULTS.RETENTION_DAYS,
    };
  }
}
