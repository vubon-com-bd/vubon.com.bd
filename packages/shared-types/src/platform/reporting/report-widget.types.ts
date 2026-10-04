/**
 * Report Widget Types
 * @module shared-types/platform/reporting
 */

import type {
  REPORT_WIDGET_TYPE,
  REPORT_WIDGET_SIZE,
  REPORT_WIDGET_STATUS,
} from '@vubon/shared-constants/platform';

export type ReportWidgetTypeValue = (typeof REPORT_WIDGET_TYPE)[keyof typeof REPORT_WIDGET_TYPE];

export type ReportWidgetSizeValue = (typeof REPORT_WIDGET_SIZE)[keyof typeof REPORT_WIDGET_SIZE];

export type ReportWidgetStatusValue =
  (typeof REPORT_WIDGET_STATUS)[keyof typeof REPORT_WIDGET_STATUS];

export interface ReportWidget {
  readonly id: string;
  readonly dashboardId?: string;
  readonly title: string;
  readonly description?: string;
  readonly type: ReportWidgetTypeValue;
  readonly size: ReportWidgetSizeValue;
  readonly status: ReportWidgetStatusValue;
  readonly reportId?: string;
  readonly query?: Readonly<Record<string, unknown>>;
  readonly config: WidgetConfig;
  readonly position: WidgetPosition;
  readonly refreshIntervalSeconds?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReportWidgetPublic {
  readonly id: string;
  readonly title: string;
  readonly type: ReportWidgetTypeValue;
  readonly size: ReportWidgetSizeValue;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly position: WidgetPosition;
  readonly config: WidgetConfig;
}

export interface WidgetConfig {
  readonly chartType?: 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'funnel';
  readonly xAxis?: string;
  readonly yAxis?: string;
  readonly series?: readonly string[];
  readonly colors?: readonly string[];
  readonly showLegend?: boolean;
  readonly showTooltip?: boolean;
  readonly showGrid?: boolean;
  readonly options?: Readonly<Record<string, unknown>>;
}

export interface WidgetPosition {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
}
