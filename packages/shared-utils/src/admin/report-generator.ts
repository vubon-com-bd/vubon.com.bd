import { generateId } from '../common/generator/id-generator';

export interface AdminReport {
  reportId: string;
  adminId: string;
  type: string;
  title: string;
  description: string;
  data: Record<string, unknown>;
  generatedAt: Date;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  metadata: Record<string, unknown>;
}

export const generateReport = (
  adminId: string,
  type: string,
  title: string,
  data: Record<string, unknown>
): AdminReport => {
  return {
    reportId: generateId('RPT', 12),
    adminId,
    type,
    title,
    description: '',
    data,
    generatedAt: new Date(),
    format: 'pdf',
    metadata: {},
  };
};
