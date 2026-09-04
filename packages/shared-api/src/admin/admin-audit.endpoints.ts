/**
 * Admin Audit Endpoints
 * অ্যাডমিন অডিট এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminAudit, AdminAuditCreateInput, AdminAuditQuery } from '@vubon/shared-types';
import { ADMIN_AUDIT } from '@vubon/shared-constants';

export class AdminAuditEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get audit logs
   * অডিট লগ পাওয়া
   */
  async getAuditLogs(query?: AdminAuditQuery): Promise<{
    audits: AdminAudit[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (query?.adminId) params.adminId = query.adminId;
    if (query?.action) params.action = query.action;
    if (query?.resource) params.resource = query.resource;
    if (query?.startDate) params.startDate = query.startDate?.toISOString();
    if (query?.endDate) params.endDate = query.endDate?.toISOString();
    if (query?.page) params.page = String(query.page);
    if (query?.limit) params.limit = String(query.limit);

    return this.client.get('/admin/audit', { params });
  }

  /**
   * Get audit by ID
   * আইডি দ্বারা অডিট পাওয়া
   */
  async getAudit(auditId: string): Promise<AdminAudit> {
    return this.client.get<AdminAudit>(`/admin/audit/${auditId}`);
  }

  /**
   * Create audit log
   * অডিট লগ তৈরি করা
   */
  async createAudit(data: AdminAuditCreateInput): Promise<AdminAudit> {
    return this.client.post<AdminAudit>('/admin/audit', data);
  }

  /**
   * Get audit stats
   * অডিট স্ট্যাটিসটিক্স পাওয়া
   */
  async getAuditStats(params?: { startDate?: string; endDate?: string }): Promise<{
    total: number;
    byAction: Record<string, number>;
    byResource: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.startDate) queryParams.startDate = params.startDate;
    if (params?.endDate) queryParams.endDate = params.endDate;

    return this.client.get('/admin/audit/stats', { params: queryParams });
  }

  /**
   * Get admin audit logs
   * অ্যাডমিনের অডিট লগ পাওয়া
   */
  async getAdminAuditLogs(
    adminId: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    audits: AdminAudit[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get(`/admin/${adminId}/audit`, { params: queryParams });
  }

  /**
   * Get available audit actions from constants
   * কনস্ট্যান্ট থেকে উপলব্ধ অডিট অ্যাকশন পাওয়া
   */
  getAuditActions(): Record<string, string> {
    return {
      CREATE: ADMIN_AUDIT.ACTIONS.CREATE,
      UPDATE: ADMIN_AUDIT.ACTIONS.UPDATE,
      DELETE: ADMIN_AUDIT.ACTIONS.DELETE,
      VIEW: ADMIN_AUDIT.ACTIONS.VIEW,
      EXPORT: ADMIN_AUDIT.ACTIONS.EXPORT,
      IMPORT: ADMIN_AUDIT.ACTIONS.IMPORT,
      LOGIN: ADMIN_AUDIT.ACTIONS.LOGIN,
      LOGOUT: ADMIN_AUDIT.ACTIONS.LOGOUT,
      APPROVE: ADMIN_AUDIT.ACTIONS.APPROVE,
      REJECT: ADMIN_AUDIT.ACTIONS.REJECT,
      SUSPEND: ADMIN_AUDIT.ACTIONS.SUSPEND,
      UNSUSPEND: ADMIN_AUDIT.ACTIONS.UNSUSPEND,
      BAN: ADMIN_AUDIT.ACTIONS.BAN,
      UNBAN: ADMIN_AUDIT.ACTIONS.UNBAN,
      LOCK: ADMIN_AUDIT.ACTIONS.LOCK,
      UNLOCK: ADMIN_AUDIT.ACTIONS.UNLOCK,
      ROLE_CHANGE: ADMIN_AUDIT.ACTIONS.ROLE_CHANGE,
      PERMISSION_CHANGE: ADMIN_AUDIT.ACTIONS.PERMISSION_CHANGE,
      SETTINGS_CHANGE: ADMIN_AUDIT.ACTIONS.SETTINGS_CHANGE,
      PASSWORD_CHANGE: ADMIN_AUDIT.ACTIONS.PASSWORD_CHANGE,
      PROFILE_UPDATE: ADMIN_AUDIT.ACTIONS.PROFILE_UPDATE,
    };
  }

  /**
   * Get audit resources from constants
   * কনস্ট্যান্ট থেকে অডিট রিসোর্স পাওয়া
   */
  getAuditResources(): Record<string, string> {
    return {
      ADMIN: ADMIN_AUDIT.RESOURCES.ADMIN,
      USER: ADMIN_AUDIT.RESOURCES.USER,
      CONTENT: ADMIN_AUDIT.RESOURCES.CONTENT,
      FINANCE: ADMIN_AUDIT.RESOURCES.FINANCE,
      SETTINGS: ADMIN_AUDIT.RESOURCES.SETTINGS,
      SYSTEM: ADMIN_AUDIT.RESOURCES.SYSTEM,
      ROLE: ADMIN_AUDIT.RESOURCES.ROLE,
      PERMISSION: ADMIN_AUDIT.RESOURCES.PERMISSION,
      REPORT: ADMIN_AUDIT.RESOURCES.REPORT,
      NOTIFICATION: ADMIN_AUDIT.RESOURCES.NOTIFICATION,
    };
  }

  /**
   * Get audit statuses from constants
   * কনস্ট্যান্ট থেকে অডিট স্ট্যাটাস পাওয়া
   */
  getAuditStatuses(): Record<string, string> {
    return {
      SUCCESS: ADMIN_AUDIT.STATUS.SUCCESS,
      FAILED: ADMIN_AUDIT.STATUS.FAILED,
      PENDING: ADMIN_AUDIT.STATUS.PENDING,
    };
  }
}
