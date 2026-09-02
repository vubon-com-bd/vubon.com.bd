import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export interface ReportOptions {
  type: 'sales' | 'users' | 'products' | 'inventory' | 'analytics';
  startDate: string;
  endDate: string;
  format: 'csv' | 'excel' | 'pdf' | 'json';
  filters?: Record<string, unknown>;
  groupBy?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ReportResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    type: string;
    rows: number;
    size: number;
    format: string;
  };
}

export interface ScheduledReportOptions {
  name: string;
  type: ReportOptions['type'];
  schedule: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  format: ReportOptions['format'];
  filters?: Record<string, unknown>;
  active?: boolean;
}

export interface ScheduledReportResponse extends ReportResponse {
  name: string;
  schedule: string;
  recipients: string[];
  nextRunAt: string;
  lastRunAt?: string;
}

export class ReportEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  async generateReport(options: ReportOptions): Promise<ReportResponse> {
    return this.client.post<ReportResponse>('/reports/generate', options);
  }

  async getReportStatus(reportId: string): Promise<ReportResponse> {
    return this.client.get<ReportResponse>(`/reports/${reportId}/status`);
  }

  async downloadReport(reportId: string, format?: string): Promise<Blob> {
    const params: Record<string, string> = {};
    if (format) params.format = format;
    return this.client.get<Blob>(`/reports/${reportId}/download`, { params });
  }

  async listReports(options: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
  }): Promise<{
    items: ReportResponse[];
    total: number;
    page: number;
    limit: number;
  }> {
    const params: Record<string, string> = {};
    if (options.page) params.page = String(options.page);
    if (options.limit) params.limit = String(options.limit);
    if (options.type) params.type = options.type;
    if (options.status) params.status = options.status;

    return this.client.get('/reports', { params });
  }

  async deleteReport(reportId: string): Promise<{ success: boolean }> {
    return this.client.delete(`/reports/${reportId}`);
  }

  async deleteOldReports(days: number = 30): Promise<{ success: boolean; count: number }> {
    return this.client.delete('/reports/old', { params: { days: String(days) } });
  }

  async createScheduledReport(options: ScheduledReportOptions): Promise<ScheduledReportResponse> {
    return this.client.post<ScheduledReportResponse>('/reports/schedule', options);
  }

  async getScheduledReports(): Promise<ScheduledReportResponse[]> {
    return this.client.get<ScheduledReportResponse[]>('/reports/schedule');
  }

  async updateScheduledReport(
    reportId: string,
    options: Partial<ScheduledReportOptions>
  ): Promise<ScheduledReportResponse> {
    return this.client.patch<ScheduledReportResponse>(`/reports/schedule/${reportId}`, options);
  }

  async deleteScheduledReport(reportId: string): Promise<{ success: boolean }> {
    return this.client.delete(`/reports/schedule/${reportId}`);
  }

  async exportData<T = unknown>(data: T[], format: ReportOptions['format']): Promise<Blob> {
    return this.client.post<Blob>('/reports/export', { data, format });
  }
}
