import { BaseEntity } from '../common/base.types';
import { Admin } from './admin.types';

/**
 * Admin report interface
 */
export interface AdminReport extends BaseEntity {
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
