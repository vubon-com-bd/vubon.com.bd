import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const REPORT_WIDGET_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    KPI: 'kpi',
    CHART_LINE: 'chart_line',
    CHART_BAR: 'chart_bar',
    CHART_PIE: 'chart_pie',
    CHART_DONUT: 'chart_donut',
    CHART_AREA: 'chart_area',
    CHART_SCATTER: 'chart_scatter',
    TABLE: 'table',
    MAP: 'map',
    GAUGE: 'gauge',
    METRIC: 'metric',
    TEXT: 'text',
    HTML: 'html',
    IMAGE: 'image',
    CUSTOM: 'custom',
  },
} as const;
