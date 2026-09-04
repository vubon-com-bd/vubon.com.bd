/**
 * Admin Report Types
 * অ্যাডমিন রিপোর্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';

export interface AdminReport extends BaseEntity {
  adminId: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  format: 'pdf' | 'csv' | 'excel' | 'json';
  data: Record<string, unknown>;
  filters?: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  downloadUrl?: string;
  expiresAt?: Date;
  generatedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface AdminReportCreateInput {
  adminId: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  format: 'pdf' | 'csv' | 'excel' | 'json';
  filters?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface AdminReportListResponse {
  reports: AdminReport[];
  total: number;
  page: number;
  limit: number;
}
