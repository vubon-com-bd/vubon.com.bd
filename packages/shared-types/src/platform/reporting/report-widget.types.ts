import { BaseEntity } from '../../common/base.types';
import { REPORT_WIDGET } from '@vubon/shared-constants/src/platform/reporting/report-widget.constants';
import { REPORT_WIDGET_TYPE } from '@vubon/shared-constants/src/platform/reporting/report-widget-type.constants';
import { ReportDashboard } from './report-dashboard.types';

export interface WidgetConfig {
  colors: string[];
  labels: string[];
  metrics: string[];
  dimensions: string[];
  filters: Record<string, unknown>;
  refreshInterval: number;
  showLegend: boolean;
  showTooltip: boolean;
}

export interface ReportWidget extends BaseEntity {
  widgetId: string;
  dashboardId: string;
  dashboard: ReportDashboard;
  type: keyof typeof REPORT_WIDGET.TYPES | string;
  widgetType: keyof typeof REPORT_WIDGET_TYPE.TYPES | string;
  size: keyof typeof REPORT_WIDGET.WIDGET_SIZES | string;
  position: keyof typeof REPORT_WIDGET.WIDGET_POSITIONS | string;
  title: string;
  description?: string;
  config: WidgetConfig;
  data: unknown;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
