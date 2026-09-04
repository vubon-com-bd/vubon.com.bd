/**
 * Admin Report Endpoints
 * অ্যাডমিন রিপোর্ট এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminReport, AdminReportCreateInput, AdminReportUpdateInput } from '@vubon/shared-types';

export class AdminReportEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get reports
   * রিপোর্ট পাওয়া
   */
  async getReports(
    adminId: string,
    params?: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
    }
  ): Promise<{
    reports: AdminReport[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.type) queryParams.type = params.type;
    if (params?.status) queryParams.status = params.status;

    return this.client.get(`/admin/${adminId}/reports`, { params: queryParams });
  }

  /**
   * Get report by ID
   * আইডি দ্বারা রিপোর্ট পাওয়া
   */
  async getReport(reportId: string): Promise<AdminReport> {
    return this.client.get<AdminReport>(`/admin/reports/${reportId}`);
  }

  /**
   * Create report
   * রিপোর্ট তৈরি করা
   */
  async createReport(data: AdminReportCreateInput): Promise<AdminReport> {
    return this.client.post<AdminReport>('/admin/reports', data);
  }

  /**
   * Update report
   * রিপোর্ট আপডেট করা
   */
  async updateReport(reportId: string, data: AdminReportUpdateInput): Promise<AdminReport> {
    return this.client.patch<AdminReport>(`/admin/reports/${reportId}`, data);
  }

  /**
   * Delete report
   * রিপোর্ট ডিলিট করা
   */
  async deleteReport(reportId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/reports/${reportId}`);
  }

  /**
   * Generate report
   * রিপোর্ট জেনারেট করা
   */
  async generateReport(reportId: string): Promise<{ success: boolean; downloadUrl?: string }> {
    return this.client.post<{ success: boolean; downloadUrl?: string }>(
      `/admin/reports/${reportId}/generate`
    );
  }

  /**
   * Download report
   * রিপোর্ট ডাউনলোড করা
   */
  async downloadReport(reportId: string): Promise<Blob> {
    return this.client.get<Blob>(`/admin/reports/${reportId}/download`);
  }

  /**
   * Get report stats
   * রিপোর্ট স্ট্যাটিসটিক্স পাওয়া
   */
  async getReportStats(adminId: string): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    pending: number;
    completed: number;
  }> {
    return this.client.get(`/admin/${adminId}/reports/stats`);
  }
}
