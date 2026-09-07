import { Admin } from './admin.types';

export interface AdminReport {
  reportId: string;
  adminId: string;
  admin: Admin;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  metadata: Record<string, unknown>;
}
