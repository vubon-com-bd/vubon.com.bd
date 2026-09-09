import { BaseEntity } from '../../common/base.types';
import { REPORT_SETTINGS } from '@vubon/shared-constants/src/platform/reporting/report-settings.constants';
import { REPORT_FORMAT } from '@vubon/shared-constants/src/platform/reporting/report-format.constants';

export interface ReportSettingsValues {
  defaultFormat: keyof typeof REPORT_FORMAT.TYPES | string;
  defaultTimezone: string;
  defaultLocale: string;
  maxRetentionDays: number;
  enableExport: boolean;
  enableSchedule: boolean;
  enableNotification: boolean;
  maxExportSize: number;
  maxExportRows: number;
}

export interface ReportSettings extends BaseEntity {
  settingsId: string;
  type: keyof typeof REPORT_SETTINGS.TYPES | string;
  key: keyof typeof REPORT_SETTINGS.SETTINGS_CATEGORIES | string;
  value: unknown;
  description?: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
