/**
 * Report Dashboard Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_DASHBOARD_TYPE,
  REPORT_DASHBOARD_STATUS,
  REPORT_DASHBOARD_LAYOUT,
} from '@vubon/shared-constants/platform';
import type { UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { ReportWidgetPublic } from './report-widget.types';

export type ReportDashboardTypeValue =
  (typeof REPORT_DASHBOARD_TYPE)[keyof typeof REPORT_DASHBOARD_TYPE];

export type ReportDashboardStatusValue =
  (typeof REPORT_DASHBOARD_STATUS)[keyof typeof REPORT_DASHBOARD_STATUS];

export type ReportDashboardLayoutValue =
  (typeof REPORT_DASHBOARD_LAYOUT)[keyof typeof REPORT_DASHBOARD_LAYOUT];

export interface ReportDashboard extends BaseEntity<string> {
  readonly name: string;
  readonly description?: string;
  readonly type: ReportDashboardTypeValue;
  readonly status: ReportDashboardStatusValue;
  readonly layout: ReportDashboardLayoutValue;
  readonly ownerId: UserId;
  readonly widgets: readonly ReportWidgetPublic[];
  readonly sharedWith?: readonly UserId[];
  readonly isPublic: boolean;
  readonly isDefault: boolean;
  readonly theme?: string;
  readonly autoRefresh: boolean;
  readonly refreshIntervalSeconds: number;
}

export interface ReportDashboardPublic {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: ReportDashboardTypeValue;
  readonly layout: ReportDashboardLayoutValue;
  readonly widgets: readonly ReportWidgetPublic[];
  readonly isPublic: boolean;
}

export interface ReportDashboardCreateInput {
  readonly name: string;
  readonly description?: string;
  readonly type: ReportDashboardTypeValue;
  readonly layout: ReportDashboardLayoutValue;
  readonly widgets?: readonly string[];
}

export interface ReportDashboardFilter {
  readonly type?: ReportDashboardTypeValue;
  readonly status?: ReportDashboardStatusValue;
  readonly ownerId?: UserId;
  readonly isPublic?: boolean;
  readonly search?: string;
}
