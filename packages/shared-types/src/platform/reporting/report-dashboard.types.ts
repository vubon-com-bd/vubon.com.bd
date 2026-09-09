import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { REPORT_DASHBOARD } from '@vubon/shared-constants/src/platform/reporting/report-dashboard.constants';
import { ReportWidget } from './report-widget.types';

export interface DashboardLayoutItem {
  widgetId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DashboardLayout {
  columns: number;
  rows: number;
  items: DashboardLayoutItem[];
}

export interface ReportDashboard extends BaseEntity {
  dashboardId: string;
  name: string;
  description?: string;
  status: keyof typeof REPORT_DASHBOARD.STATUS | string;
  type: keyof typeof REPORT_DASHBOARD.DASHBOARD_TYPES | string;
  widgets: ReportWidget[];
  widgetCount: number;
  layout: DashboardLayout;
  createdBy: string;
  createdByUser: User;
  isActive: boolean;
  isPublished: boolean;
  isShared: boolean;
  sharedWith: string[];
  metadata: Record<string, unknown>;
}
