/**
 * @fileoverview Report widget type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Widget types enum
 */
export enum WidgetType {
  /** Line chart widget */
  LINE_CHART = 'LINE_CHART',
  /** Bar chart widget */
  BAR_CHART = 'BAR_CHART',
  /** Pie chart widget */
  PIE_CHART = 'PIE_CHART',
  /** Doughnut chart widget */
  DOUGHNUT_CHART = 'DOUGHNUT_CHART',
  /** Area chart widget */
  AREA_CHART = 'AREA_CHART',
  /** Scatter chart widget */
  SCATTER_CHART = 'SCATTER_CHART',
  /** Bubble chart widget */
  BUBBLE_CHART = 'BUBBLE_CHART',
  /** Radar chart widget */
  RADAR_CHART = 'RADAR_CHART',
  /** Polar area chart widget */
  POLAR_AREA_CHART = 'POLAR_AREA_CHART',
  /** Stacked bar chart widget */
  STACKED_BAR_CHART = 'STACKED_BAR_CHART',
  /** Stacked area chart widget */
  STACKED_AREA_CHART = 'STACKED_AREA_CHART',
  /** Histogram widget */
  HISTOGRAM = 'HISTOGRAM',
  /** Box plot widget */
  BOX_PLOT = 'BOX_PLOT',
  /** Violin plot widget */
  VIOLIN_PLOT = 'VIOLIN_PLOT',
  /** Heatmap widget */
  HEATMAP = 'HEATMAP',
  /** Tree map widget */
  TREE_MAP = 'TREE_MAP',
  /** Sunburst widget */
  SUNBURST = 'SUNBURST',
  /** Sankey chart widget */
  SANKEY = 'SANKEY',
  /** Network graph widget */
  NETWORK_GRAPH = 'NETWORK_GRAPH',
  /** Geo map widget */
  GEO_MAP = 'GEO_MAP',
  /** Table widget */
  TABLE_WIDGET = 'TABLE_WIDGET',
  /** Metric widget */
  METRIC_WIDGET = 'METRIC_WIDGET',
  /** KPI widget */
  KPI_WIDGET = 'KPI_WIDGET',
  /** Gauge widget */
  GAUGE_WIDGET = 'GAUGE_WIDGET',
  /** Thermometer widget */
  THERMOMETER_WIDGET = 'THERMOMETER_WIDGET',
  /** Bullet widget */
  BULLET_WIDGET = 'BULLET_WIDGET',
  /** Text widget */
  TEXT_WIDGET = 'TEXT_WIDGET',
  /** HTML widget */
  HTML_WIDGET = 'HTML_WIDGET',
  /** Image widget */
  IMAGE_WIDGET = 'IMAGE_WIDGET',
  /** Video widget */
  VIDEO_WIDGET = 'VIDEO_WIDGET',
  /** Iframe widget */
  IFRAME_WIDGET = 'IFRAME_WIDGET',
  /** List widget */
  LIST_WIDGET = 'LIST_WIDGET',
  /** Card widget */
  CARD_WIDGET = 'CARD_WIDGET',
  /** Tile widget */
  TILE_WIDGET = 'TILE_WIDGET',
  /** Calendar widget */
  CALENDAR_WIDGET = 'CALENDAR_WIDGET',
  /** Timeline widget */
  TIMELINE_WIDGET = 'TIMELINE_WIDGET',
  /** Activity feed widget */
  ACTIVITY_FEED = 'ACTIVITY_FEED',
  /** Notification widget */
  NOTIFICATION_WIDGET = 'NOTIFICATION_WIDGET',
  /** Alert widget */
  ALERT_WIDGET = 'ALERT_WIDGET',
  /** Status widget */
  STATUS_WIDGET = 'STATUS_WIDGET',
  /** Progress widget */
  PROGRESS_WIDGET = 'PROGRESS_WIDGET',
  /** Scorecard widget */
  SCORECARD_WIDGET = 'SCORECARD_WIDGET',
  /** Comparison widget */
  COMPARISON_WIDGET = 'COMPARISON_WIDGET',
  /** Trend widget */
  TREND_WIDGET = 'TREND_WIDGET',
  /** Forecast widget */
  FORECAST_WIDGET = 'FORECAST_WIDGET',
  /** Filter widget */
  FILTER_WIDGET = 'FILTER_WIDGET',
  /** Search widget */
  SEARCH_WIDGET = 'SEARCH_WIDGET',
  /** Custom widget */
  CUSTOM_WIDGET = 'CUSTOM_WIDGET',
}

/**
 * Widget category for grouping
 */
export enum WidgetCategory {
  /** Chart widgets */
  CHART = 'CHART',
  /** Data widgets */
  DATA = 'DATA',
  /** Metrics widgets */
  METRIC = 'METRIC',
  /** Visualization widgets */
  VISUALIZATION = 'VISUALIZATION',
  /** Content widgets */
  CONTENT = 'CONTENT',
  /** Interactive widgets */
  INTERACTIVE = 'INTERACTIVE',
  /** Utility widgets */
  UTILITY = 'UTILITY',
  /** Custom widgets */
  CUSTOM = 'CUSTOM',
}

/**
 * Widget category mapping
 */
export const WIDGET_CATEGORY_MAP: Record<WidgetType, WidgetCategory> = {
  [WidgetType.LINE_CHART]: WidgetCategory.CHART,
  [WidgetType.BAR_CHART]: WidgetCategory.CHART,
  [WidgetType.PIE_CHART]: WidgetCategory.CHART,
  [WidgetType.DOUGHNUT_CHART]: WidgetCategory.CHART,
  [WidgetType.AREA_CHART]: WidgetCategory.CHART,
  [WidgetType.SCATTER_CHART]: WidgetCategory.CHART,
  [WidgetType.BUBBLE_CHART]: WidgetCategory.CHART,
  [WidgetType.RADAR_CHART]: WidgetCategory.CHART,
  [WidgetType.POLAR_AREA_CHART]: WidgetCategory.CHART,
  [WidgetType.STACKED_BAR_CHART]: WidgetCategory.CHART,
  [WidgetType.STACKED_AREA_CHART]: WidgetCategory.CHART,
  [WidgetType.HISTOGRAM]: WidgetCategory.CHART,
  [WidgetType.BOX_PLOT]: WidgetCategory.CHART,
  [WidgetType.VIOLIN_PLOT]: WidgetCategory.CHART,
  [WidgetType.HEATMAP]: WidgetCategory.VISUALIZATION,
  [WidgetType.TREE_MAP]: WidgetCategory.VISUALIZATION,
  [WidgetType.SUNBURST]: WidgetCategory.VISUALIZATION,
  [WidgetType.SANKEY]: WidgetCategory.VISUALIZATION,
  [WidgetType.NETWORK_GRAPH]: WidgetCategory.VISUALIZATION,
  [WidgetType.GEO_MAP]: WidgetCategory.VISUALIZATION,
  [WidgetType.TABLE_WIDGET]: WidgetCategory.DATA,
  [WidgetType.METRIC_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.KPI_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.GAUGE_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.THERMOMETER_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.BULLET_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.TEXT_WIDGET]: WidgetCategory.CONTENT,
  [WidgetType.HTML_WIDGET]: WidgetCategory.CONTENT,
  [WidgetType.IMAGE_WIDGET]: WidgetCategory.CONTENT,
  [WidgetType.VIDEO_WIDGET]: WidgetCategory.CONTENT,
  [WidgetType.IFRAME_WIDGET]: WidgetCategory.CONTENT,
  [WidgetType.LIST_WIDGET]: WidgetCategory.DATA,
  [WidgetType.CARD_WIDGET]: WidgetCategory.DATA,
  [WidgetType.TILE_WIDGET]: WidgetCategory.DATA,
  [WidgetType.CALENDAR_WIDGET]: WidgetCategory.INTERACTIVE,
  [WidgetType.TIMELINE_WIDGET]: WidgetCategory.INTERACTIVE,
  [WidgetType.ACTIVITY_FEED]: WidgetCategory.INTERACTIVE,
  [WidgetType.NOTIFICATION_WIDGET]: WidgetCategory.INTERACTIVE,
  [WidgetType.ALERT_WIDGET]: WidgetCategory.INTERACTIVE,
  [WidgetType.STATUS_WIDGET]: WidgetCategory.INTERACTIVE,
  [WidgetType.PROGRESS_WIDGET]: WidgetCategory.UTILITY,
  [WidgetType.SCORECARD_WIDGET]: WidgetCategory.METRIC,
  [WidgetType.COMPARISON_WIDGET]: WidgetCategory.DATA,
  [WidgetType.TREND_WIDGET]: WidgetCategory.CHART,
  [WidgetType.FORECAST_WIDGET]: WidgetCategory.CHART,
  [WidgetType.FILTER_WIDGET]: WidgetCategory.UTILITY,
  [WidgetType.SEARCH_WIDGET]: WidgetCategory.UTILITY,
  [WidgetType.CUSTOM_WIDGET]: WidgetCategory.CUSTOM,
};

/**
 * Widget type configuration
 */
export interface WidgetTypeConfig {
  label: string;
  description: string;
  category: WidgetCategory;
  icon?: string;
  color?: string;
  priority: number;
  requiresData: boolean;
  requiresDateRange: boolean;
  supportsFiltering: boolean;
  supportsSorting: boolean;
  supportsPagination: boolean;
  isInteractive: boolean;
}

export const WIDGET_TYPE_CONFIG: Record<WidgetType, WidgetTypeConfig> = {
  [WidgetType.LINE_CHART]: {
    label: 'Line Chart',
    description: 'Line chart for trend visualization',
    category: WidgetCategory.CHART,
    icon: 'LineChart',
    color: '#3B82F6',
    priority: 1,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.BAR_CHART]: {
    label: 'Bar Chart',
    description: 'Bar chart for comparison visualization',
    category: WidgetCategory.CHART,
    icon: 'BarChart',
    color: '#10B981',
    priority: 1,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.PIE_CHART]: {
    label: 'Pie Chart',
    description: 'Pie chart for distribution visualization',
    category: WidgetCategory.CHART,
    icon: 'PieChart',
    color: '#F59E0B',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.DOUGHNUT_CHART]: {
    label: 'Doughnut Chart',
    description: 'Doughnut chart for distribution visualization',
    category: WidgetCategory.CHART,
    icon: 'PieChart',
    color: '#EC4899',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.AREA_CHART]: {
    label: 'Area Chart',
    description: 'Area chart for cumulative visualization',
    category: WidgetCategory.CHART,
    icon: 'AreaChart',
    color: '#8B5CF6',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.SCATTER_CHART]: {
    label: 'Scatter Chart',
    description: 'Scatter chart for correlation visualization',
    category: WidgetCategory.CHART,
    icon: 'ScatterChart',
    color: '#6366F1',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.BUBBLE_CHART]: {
    label: 'Bubble Chart',
    description: 'Bubble chart for multi-dimensional visualization',
    category: WidgetCategory.CHART,
    icon: 'BubbleChart',
    color: '#F472B6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.RADAR_CHART]: {
    label: 'Radar Chart',
    description: 'Radar chart for multi-variable comparison',
    category: WidgetCategory.CHART,
    icon: 'RadarChart',
    color: '#22C55E',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.POLAR_AREA_CHART]: {
    label: 'Polar Area Chart',
    description: 'Polar area chart for circular visualization',
    category: WidgetCategory.CHART,
    icon: 'PolarAreaChart',
    color: '#F59E0B',
    priority: 3,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.STACKED_BAR_CHART]: {
    label: 'Stacked Bar Chart',
    description: 'Stacked bar chart for composition visualization',
    category: WidgetCategory.CHART,
    icon: 'StackedBarChart',
    color: '#3B82F6',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.STACKED_AREA_CHART]: {
    label: 'Stacked Area Chart',
    description: 'Stacked area chart for cumulative composition',
    category: WidgetCategory.CHART,
    icon: 'StackedAreaChart',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.HISTOGRAM]: {
    label: 'Histogram',
    description: 'Histogram for frequency distribution',
    category: WidgetCategory.CHART,
    icon: 'Histogram',
    color: '#8B5CF6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.BOX_PLOT]: {
    label: 'Box Plot',
    description: 'Box plot for statistical distribution',
    category: WidgetCategory.CHART,
    icon: 'BoxPlot',
    color: '#EF4444',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.VIOLIN_PLOT]: {
    label: 'Violin Plot',
    description: 'Violin plot for density distribution',
    category: WidgetCategory.CHART,
    icon: 'ViolinPlot',
    color: '#EC4899',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.HEATMAP]: {
    label: 'Heatmap',
    description: 'Heatmap for matrix visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'Heatmap',
    color: '#F59E0B',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.TREE_MAP]: {
    label: 'Tree Map',
    description: 'Tree map for hierarchical visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'TreeMap',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.SUNBURST]: {
    label: 'Sunburst',
    description: 'Sunburst for hierarchical radial visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'Sunburst',
    color: '#8B5CF6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.SANKEY]: {
    label: 'Sankey',
    description: 'Sankey diagram for flow visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'Sankey',
    color: '#6366F1',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.NETWORK_GRAPH]: {
    label: 'Network Graph',
    description: 'Network graph for relationship visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'Network',
    color: '#F472B6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.GEO_MAP]: {
    label: 'Geo Map',
    description: 'Geographic map visualization',
    category: WidgetCategory.VISUALIZATION,
    icon: 'Map',
    color: '#3B82F6',
    priority: 1,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.TABLE_WIDGET]: {
    label: 'Table',
    description: 'Tabular data display widget',
    category: WidgetCategory.DATA,
    icon: 'Table',
    color: '#6B7280',
    priority: 1,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.METRIC_WIDGET]: {
    label: 'Metric',
    description: 'Single metric display widget',
    category: WidgetCategory.METRIC,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.KPI_WIDGET]: {
    label: 'KPI',
    description: 'Key Performance Indicator widget',
    category: WidgetCategory.METRIC,
    icon: 'Target',
    color: '#F59E0B',
    priority: 1,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.GAUGE_WIDGET]: {
    label: 'Gauge',
    description: 'Gauge meter widget',
    category: WidgetCategory.METRIC,
    icon: 'Gauge',
    color: '#8B5CF6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.THERMOMETER_WIDGET]: {
    label: 'Thermometer',
    description: 'Thermometer style progress widget',
    category: WidgetCategory.METRIC,
    icon: 'Thermometer',
    color: '#EF4444',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.BULLET_WIDGET]: {
    label: 'Bullet',
    description: 'Bullet chart for performance tracking',
    category: WidgetCategory.METRIC,
    icon: 'Bullet',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.TEXT_WIDGET]: {
    label: 'Text',
    description: 'Plain text content widget',
    category: WidgetCategory.CONTENT,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.HTML_WIDGET]: {
    label: 'HTML',
    description: 'Custom HTML content widget',
    category: WidgetCategory.CONTENT,
    icon: 'Code',
    color: '#8B5CF6',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.IMAGE_WIDGET]: {
    label: 'Image',
    description: 'Image display widget',
    category: WidgetCategory.CONTENT,
    icon: 'Image',
    color: '#3B82F6',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.VIDEO_WIDGET]: {
    label: 'Video',
    description: 'Video player widget',
    category: WidgetCategory.CONTENT,
    icon: 'Video',
    color: '#EC4899',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.IFRAME_WIDGET]: {
    label: 'Iframe',
    description: 'Iframe embed widget',
    category: WidgetCategory.CONTENT,
    icon: 'Layout',
    color: '#6B7280',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.LIST_WIDGET]: {
    label: 'List',
    description: 'List view data widget',
    category: WidgetCategory.DATA,
    icon: 'List',
    color: '#6366F1',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.CARD_WIDGET]: {
    label: 'Card',
    description: 'Card style data display widget',
    category: WidgetCategory.DATA,
    icon: 'LayoutGrid',
    color: '#8B5CF6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.TILE_WIDGET]: {
    label: 'Tile',
    description: 'Tile style data display widget',
    category: WidgetCategory.DATA,
    icon: 'Grid',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.CALENDAR_WIDGET]: {
    label: 'Calendar',
    description: 'Calendar view widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'Calendar',
    color: '#3B82F6',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.TIMELINE_WIDGET]: {
    label: 'Timeline',
    description: 'Timeline visualization widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'Clock',
    color: '#F59E0B',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.ACTIVITY_FEED]: {
    label: 'Activity Feed',
    description: 'Real-time activity feed widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'Activity',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.NOTIFICATION_WIDGET]: {
    label: 'Notification',
    description: 'Notification display widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'Bell',
    color: '#F472B6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: true,
    isInteractive: true,
  },
  [WidgetType.ALERT_WIDGET]: {
    label: 'Alert',
    description: 'Alert and warning widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'AlertCircle',
    color: '#EF4444',
    priority: 1,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.STATUS_WIDGET]: {
    label: 'Status',
    description: 'Status indicator widget',
    category: WidgetCategory.INTERACTIVE,
    icon: 'CheckCircle',
    color: '#22C55E',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.PROGRESS_WIDGET]: {
    label: 'Progress',
    description: 'Progress tracking widget',
    category: WidgetCategory.UTILITY,
    icon: 'Progress',
    color: '#3B82F6',
    priority: 2,
    requiresData: true,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.SCORECARD_WIDGET]: {
    label: 'Scorecard',
    description: 'Scorecard performance widget',
    category: WidgetCategory.METRIC,
    icon: 'Trophy',
    color: '#F59E0B',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
  [WidgetType.COMPARISON_WIDGET]: {
    label: 'Comparison',
    description: 'Data comparison widget',
    category: WidgetCategory.DATA,
    icon: 'GitCompare',
    color: '#6366F1',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: true,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.TREND_WIDGET]: {
    label: 'Trend',
    description: 'Trend analysis widget',
    category: WidgetCategory.CHART,
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.FORECAST_WIDGET]: {
    label: 'Forecast',
    description: 'Forecast prediction widget',
    category: WidgetCategory.CHART,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    requiresData: true,
    requiresDateRange: true,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.FILTER_WIDGET]: {
    label: 'Filter',
    description: 'Data filter control widget',
    category: WidgetCategory.UTILITY,
    icon: 'Filter',
    color: '#8B5CF6',
    priority: 2,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.SEARCH_WIDGET]: {
    label: 'Search',
    description: 'Search input widget',
    category: WidgetCategory.UTILITY,
    icon: 'Search',
    color: '#3B82F6',
    priority: 2,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: true,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: true,
  },
  [WidgetType.CUSTOM_WIDGET]: {
    label: 'Custom',
    description: 'Custom built widget',
    category: WidgetCategory.CUSTOM,
    icon: 'Settings',
    color: '#6B7280',
    priority: 3,
    requiresData: false,
    requiresDateRange: false,
    supportsFiltering: false,
    supportsSorting: false,
    supportsPagination: false,
    isInteractive: false,
  },
};

/**
 * Get widget type label
 */
export function getWidgetTypeLabel(type: WidgetType): string {
  return WIDGET_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get widget type description
 */
export function getWidgetTypeDescription(type: WidgetType): string {
  return WIDGET_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get widget type category
 */
export function getWidgetTypeCategory(type: WidgetType): WidgetCategory {
  return WIDGET_CATEGORY_MAP[type];
}

/**
 * Get widget types by category
 */
export function getWidgetTypesByCategory(category: WidgetCategory): WidgetType[] {
  return Object.entries(WIDGET_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as WidgetType);
}

/**
 * Get chart widgets
 */
export function getChartWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.CHART);
}

/**
 * Get data widgets
 */
export function getDataWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.DATA);
}

/**
 * Get metric widgets
 */
export function getMetricWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.METRIC);
}

/**
 * Get visualization widgets
 */
export function getVisualizationWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.VISUALIZATION);
}

/**
 * Get content widgets
 */
export function getContentWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.CONTENT);
}

/**
 * Get interactive widgets
 */
export function getInteractiveWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.INTERACTIVE);
}

/**
 * Get utility widgets
 */
export function getUtilityWidgets(): WidgetType[] {
  return getWidgetTypesByCategory(WidgetCategory.UTILITY);
}

/**
 * Check if widget type requires data
 */
export function widgetTypeRequiresData(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.requiresData || false;
}

/**
 * Check if widget type requires date range
 */
export function widgetTypeRequiresDateRange(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.requiresDateRange || false;
}

/**
 * Check if widget type supports filtering
 */
export function widgetTypeSupportsFiltering(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.supportsFiltering || false;
}

/**
 * Check if widget type supports sorting
 */
export function widgetTypeSupportsSorting(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.supportsSorting || false;
}

/**
 * Check if widget type supports pagination
 */
export function widgetTypeSupportsPagination(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.supportsPagination || false;
}

/**
 * Check if widget type is interactive
 */
export function isWidgetTypeInteractive(type: WidgetType): boolean {
  return WIDGET_TYPE_CONFIG[type]?.isInteractive || false;
}

/**
 * Get widget type priority
 */
export function getWidgetTypePriority(type: WidgetType): number {
  return WIDGET_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Get recommended widget types for data type
 */
export function getRecommendedWidgetsForDataType(dataType: string): WidgetType[] {
  const recommendations: Record<string, WidgetType[]> = {
    time_series: [
      WidgetType.LINE_CHART,
      WidgetType.AREA_CHART,
      WidgetType.TREND_WIDGET,
      WidgetType.FORECAST_WIDGET,
    ],
    categorical: [
      WidgetType.BAR_CHART,
      WidgetType.PIE_CHART,
      WidgetType.DOUGHNUT_CHART,
      WidgetType.STACKED_BAR_CHART,
    ],
    geographic: [WidgetType.GEO_MAP],
    hierarchical: [WidgetType.TREE_MAP, WidgetType.SUNBURST, WidgetType.SANKEY],
    relational: [WidgetType.SCATTER_CHART, WidgetType.BUBBLE_CHART, WidgetType.NETWORK_GRAPH],
    tabular: [WidgetType.TABLE_WIDGET, WidgetType.LIST_WIDGET, WidgetType.CARD_WIDGET],
    metric: [
      WidgetType.METRIC_WIDGET,
      WidgetType.KPI_WIDGET,
      WidgetType.GAUGE_WIDGET,
      WidgetType.BULLET_WIDGET,
    ],
    comparative: [WidgetType.COMPARISON_WIDGET, WidgetType.STACKED_BAR_CHART, WidgetType.BOX_PLOT],
    distribution: [WidgetType.HISTOGRAM, WidgetType.BOX_PLOT, WidgetType.VIOLIN_PLOT],
    matrix: [WidgetType.HEATMAP],
  };
  return recommendations[dataType] || [WidgetType.TABLE_WIDGET];
}

/**
 * Widget type status
 */
export enum WidgetTypeStatus {
  /** Active and available */
  ACTIVE = 'ACTIVE',
  /** Inactive and hidden */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for widget types
 */
export const WIDGET_TYPE_DEFAULT_STATUS: Record<WidgetType, WidgetTypeStatus> = {
  [WidgetType.LINE_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.BAR_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.PIE_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.DOUGHNUT_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.AREA_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.SCATTER_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.BUBBLE_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.RADAR_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.POLAR_AREA_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.STACKED_BAR_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.STACKED_AREA_CHART]: WidgetTypeStatus.ACTIVE,
  [WidgetType.HISTOGRAM]: WidgetTypeStatus.ACTIVE,
  [WidgetType.BOX_PLOT]: WidgetTypeStatus.ACTIVE,
  [WidgetType.VIOLIN_PLOT]: WidgetTypeStatus.ACTIVE,
  [WidgetType.HEATMAP]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TREE_MAP]: WidgetTypeStatus.ACTIVE,
  [WidgetType.SUNBURST]: WidgetTypeStatus.ACTIVE,
  [WidgetType.SANKEY]: WidgetTypeStatus.ACTIVE,
  [WidgetType.NETWORK_GRAPH]: WidgetTypeStatus.ACTIVE,
  [WidgetType.GEO_MAP]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TABLE_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.METRIC_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.KPI_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.GAUGE_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.THERMOMETER_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.BULLET_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TEXT_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.HTML_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.IMAGE_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.VIDEO_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.IFRAME_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.LIST_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.CARD_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TILE_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.CALENDAR_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TIMELINE_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.ACTIVITY_FEED]: WidgetTypeStatus.ACTIVE,
  [WidgetType.NOTIFICATION_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.ALERT_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.STATUS_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.PROGRESS_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.SCORECARD_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.COMPARISON_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.TREND_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.FORECAST_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.FILTER_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.SEARCH_WIDGET]: WidgetTypeStatus.ACTIVE,
  [WidgetType.CUSTOM_WIDGET]: WidgetTypeStatus.ACTIVE,
};

/**
 * Get widget type status
 */
export function getWidgetTypeStatus(type: WidgetType): WidgetTypeStatus {
  return WIDGET_TYPE_DEFAULT_STATUS[type] || WidgetTypeStatus.INACTIVE;
}

/**
 * Set widget type status
 */
export function setWidgetTypeStatus(type: WidgetType, status: WidgetTypeStatus): void {
  WIDGET_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Widget type priority levels
 */
export const WIDGET_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential widgets */
  CRITICAL: 1,
  /** High - important widgets */
  HIGH: 2,
  /** Medium - useful widgets */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get widget types by priority
 */
export function getWidgetTypesByPriority(priority: number): WidgetType[] {
  return Object.entries(WIDGET_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as WidgetType);
}

/**
 * Get critical widget types
 */
export function getCriticalWidgetTypes(): WidgetType[] {
  return getWidgetTypesByPriority(WIDGET_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Widget type groups
 */
export const WIDGET_TYPE_GROUPS = {
  /** Chart widgets */
  CHARTS: [
    WidgetType.LINE_CHART,
    WidgetType.BAR_CHART,
    WidgetType.PIE_CHART,
    WidgetType.DOUGHNUT_CHART,
    WidgetType.AREA_CHART,
    WidgetType.SCATTER_CHART,
    WidgetType.BUBBLE_CHART,
    WidgetType.RADAR_CHART,
  ],
  /** Metric widgets */
  METRICS: [
    WidgetType.METRIC_WIDGET,
    WidgetType.KPI_WIDGET,
    WidgetType.GAUGE_WIDGET,
    WidgetType.BULLET_WIDGET,
    WidgetType.SCORECARD_WIDGET,
  ],
  /** Data widgets */
  DATA: [
    WidgetType.TABLE_WIDGET,
    WidgetType.LIST_WIDGET,
    WidgetType.CARD_WIDGET,
    WidgetType.TILE_WIDGET,
  ],
  /** Visualization widgets */
  VISUALIZATIONS: [
    WidgetType.HEATMAP,
    WidgetType.TREE_MAP,
    WidgetType.SUNBURST,
    WidgetType.SANKEY,
    WidgetType.NETWORK_GRAPH,
    WidgetType.GEO_MAP,
  ],
} as const;
