import { BaseEntity } from '../common/base.types';
import { DOCUMENT } from '@vubon/shared-constants/src/common/document.constants';
import { AdminPublic } from './admin.types';

/**
 * Report format value
 */
export type ReportFormat = Extract<
  (typeof DOCUMENT.FORMATS)[keyof typeof DOCUMENT.FORMATS],
  'pdf' | 'excel' | 'csv' | 'json'
>;

/**
 * Admin report interface
 */
export interface AdminReport extends BaseEntity {
  reportId: string;
  adminId: string;
  admin: AdminPublic;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  format: ReportFormat;
}
