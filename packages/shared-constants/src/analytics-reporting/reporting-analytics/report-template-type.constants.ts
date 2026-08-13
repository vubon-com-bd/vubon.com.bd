/**
 * @fileoverview Report template type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report template types enum
 */
export enum ReportTemplateType {
  /** Sales report template */
  SALES_TEMPLATE = 'SALES_TEMPLATE',
  /** Marketing report template */
  MARKETING_TEMPLATE = 'MARKETING_TEMPLATE',
  /** Financial report template */
  FINANCIAL_TEMPLATE = 'FINANCIAL_TEMPLATE',
  /** Operational report template */
  OPERATIONAL_TEMPLATE = 'OPERATIONAL_TEMPLATE',
  /** Executive report template */
  EXECUTIVE_TEMPLATE = 'EXECUTIVE_TEMPLATE',
  /** Customer report template */
  CUSTOMER_TEMPLATE = 'CUSTOMER_TEMPLATE',
  /** Product report template */
  PRODUCT_TEMPLATE = 'PRODUCT_TEMPLATE',
  /** Inventory report template */
  INVENTORY_TEMPLATE = 'INVENTORY_TEMPLATE',
  /** Performance report template */
  PERFORMANCE_TEMPLATE = 'PERFORMANCE_TEMPLATE',
  /** KPI report template */
  KPI_TEMPLATE = 'KPI_TEMPLATE',
  /** Dashboard template */
  DASHBOARD_TEMPLATE = 'DASHBOARD_TEMPLATE',
  /** Analytical template */
  ANALYTICAL_TEMPLATE = 'ANALYTICAL_TEMPLATE',
  /** Strategic template */
  STRATEGIC_TEMPLATE = 'STRATEGIC_TEMPLATE',
  /** Comparative template */
  COMPARATIVE_TEMPLATE = 'COMPARATIVE_TEMPLATE',
  /** Trend template */
  TREND_TEMPLATE = 'TREND_TEMPLATE',
  /** Forecast template */
  FORECAST_TEMPLATE = 'FORECAST_TEMPLATE',
  /** Blank template */
  BLANK_TEMPLATE = 'BLANK_TEMPLATE',
  /** Custom template */
  CUSTOM_TEMPLATE = 'CUSTOM_TEMPLATE',
  /** Branded template */
  BRANDED_TEMPLATE = 'BRANDED_TEMPLATE',
  /** Responsive template */
  RESPONSIVE_TEMPLATE = 'RESPONSIVE_TEMPLATE',
  /** Print template */
  PRINT_TEMPLATE = 'PRINT_TEMPLATE',
  /** Digital template */
  DIGITAL_TEMPLATE = 'DIGITAL_TEMPLATE',
  /** Interactive template */
  INTERACTIVE_TEMPLATE = 'INTERACTIVE_TEMPLATE',
  /** Static template */
  STATIC_TEMPLATE = 'STATIC_TEMPLATE',
  /** Dynamic template */
  DYNAMIC_TEMPLATE = 'DYNAMIC_TEMPLATE',
  /** Single page template */
  SINGLE_PAGE_TEMPLATE = 'SINGLE_PAGE_TEMPLATE',
  /** Multi page template */
  MULTI_PAGE_TEMPLATE = 'MULTI_PAGE_TEMPLATE',
  /** Sectioned template */
  SECTIONED_TEMPLATE = 'SECTIONED_TEMPLATE',
  /** Grid template */
  GRID_TEMPLATE = 'GRID_TEMPLATE',
  /** Card template */
  CARD_TEMPLATE = 'CARD_TEMPLATE',
  /** List template */
  LIST_TEMPLATE = 'LIST_TEMPLATE',
  /** Table template */
  TABLE_TEMPLATE = 'TABLE_TEMPLATE',
  /** Chart template */
  CHART_TEMPLATE = 'CHART_TEMPLATE',
  /** Mixed template */
  MIXED_TEMPLATE = 'MIXED_TEMPLATE',
}

/**
 * Template type category for grouping
 */
export enum ReportTemplateTypeCategory {
  /** Business domain templates */
  BUSINESS = 'BUSINESS',
  /** Analytical templates */
  ANALYTICAL = 'ANALYTICAL',
  /** Functional templates */
  FUNCTIONAL = 'FUNCTIONAL',
  /** Layout templates */
  LAYOUT = 'LAYOUT',
  /** Medium templates */
  MEDIUM = 'MEDIUM',
  /** Interactivity templates */
  INTERACTIVITY = 'INTERACTIVITY',
  /** Structure templates */
  STRUCTURE = 'STRUCTURE',
}

/**
 * Template type category mapping
 */
export const REPORT_TEMPLATE_TYPE_CATEGORY_MAP: Record<
  ReportTemplateType,
  ReportTemplateTypeCategory
> = {
  [ReportTemplateType.SALES_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.MARKETING_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.FINANCIAL_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.OPERATIONAL_TEMPLATE]: ReportTemplateTypeCategory.FUNCTIONAL,
  [ReportTemplateType.EXECUTIVE_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.CUSTOMER_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.PRODUCT_TEMPLATE]: ReportTemplateTypeCategory.BUSINESS,
  [ReportTemplateType.INVENTORY_TEMPLATE]: ReportTemplateTypeCategory.FUNCTIONAL,
  [ReportTemplateType.PERFORMANCE_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.KPI_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.DASHBOARD_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.ANALYTICAL_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.STRATEGIC_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.COMPARATIVE_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.TREND_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.FORECAST_TEMPLATE]: ReportTemplateTypeCategory.ANALYTICAL,
  [ReportTemplateType.BLANK_TEMPLATE]: ReportTemplateTypeCategory.STRUCTURE,
  [ReportTemplateType.CUSTOM_TEMPLATE]: ReportTemplateTypeCategory.STRUCTURE,
  [ReportTemplateType.BRANDED_TEMPLATE]: ReportTemplateTypeCategory.MEDIUM,
  [ReportTemplateType.RESPONSIVE_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.PRINT_TEMPLATE]: ReportTemplateTypeCategory.MEDIUM,
  [ReportTemplateType.DIGITAL_TEMPLATE]: ReportTemplateTypeCategory.MEDIUM,
  [ReportTemplateType.INTERACTIVE_TEMPLATE]: ReportTemplateTypeCategory.INTERACTIVITY,
  [ReportTemplateType.STATIC_TEMPLATE]: ReportTemplateTypeCategory.INTERACTIVITY,
  [ReportTemplateType.DYNAMIC_TEMPLATE]: ReportTemplateTypeCategory.INTERACTIVITY,
  [ReportTemplateType.SINGLE_PAGE_TEMPLATE]: ReportTemplateTypeCategory.STRUCTURE,
  [ReportTemplateType.MULTI_PAGE_TEMPLATE]: ReportTemplateTypeCategory.STRUCTURE,
  [ReportTemplateType.SECTIONED_TEMPLATE]: ReportTemplateTypeCategory.STRUCTURE,
  [ReportTemplateType.GRID_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.CARD_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.LIST_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.TABLE_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.CHART_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
  [ReportTemplateType.MIXED_TEMPLATE]: ReportTemplateTypeCategory.LAYOUT,
};

/**
 * Template type configuration
 */
export interface ReportTemplateTypeConfig {
  label: string;
  description: string;
  category: ReportTemplateTypeCategory;
  icon?: string;
  color?: string;
  priority: number;
  recommendedFor: string[];
  isInteractive: boolean;
  isResponsive: boolean;
}

export const REPORT_TEMPLATE_TYPE_CONFIG: Record<ReportTemplateType, ReportTemplateTypeConfig> = {
  [ReportTemplateType.SALES_TEMPLATE]: {
    label: 'Sales Template',
    description: 'Template designed for sales reports and analytics',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    recommendedFor: ['Sales Team', 'Sales Managers', 'Revenue Analysts'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.MARKETING_TEMPLATE]: {
    label: 'Marketing Template',
    description: 'Template for marketing campaign reports',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'Megaphone',
    color: '#F472B6',
    priority: 1,
    recommendedFor: ['Marketing Team', 'Campaign Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.FINANCIAL_TEMPLATE]: {
    label: 'Financial Template',
    description: 'Template for financial reports and statements',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'DollarSign',
    color: '#10B981',
    priority: 1,
    recommendedFor: ['Finance Team', 'Accountants', 'CFO'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.OPERATIONAL_TEMPLATE]: {
    label: 'Operational Template',
    description: 'Template for operational performance reports',
    category: ReportTemplateTypeCategory.FUNCTIONAL,
    icon: 'Activity',
    color: '#6366F1',
    priority: 2,
    recommendedFor: ['Operations Team', 'Process Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.EXECUTIVE_TEMPLATE]: {
    label: 'Executive Template',
    description: 'Template for executive summary reports',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 1,
    recommendedFor: ['Executives', 'Board Members', 'Senior Management'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.CUSTOMER_TEMPLATE]: {
    label: 'Customer Template',
    description: 'Template for customer analytics reports',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    recommendedFor: ['Customer Success', 'Sales Team'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.PRODUCT_TEMPLATE]: {
    label: 'Product Template',
    description: 'Template for product performance reports',
    category: ReportTemplateTypeCategory.BUSINESS,
    icon: 'Package',
    color: '#F59E0B',
    priority: 2,
    recommendedFor: ['Product Team', 'Product Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.INVENTORY_TEMPLATE]: {
    label: 'Inventory Template',
    description: 'Template for inventory management reports',
    category: ReportTemplateTypeCategory.FUNCTIONAL,
    icon: 'Package',
    color: '#10B981',
    priority: 2,
    recommendedFor: ['Inventory Team', 'Supply Chain Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.PERFORMANCE_TEMPLATE]: {
    label: 'Performance Template',
    description: 'Template for performance metrics and KPIs',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    recommendedFor: ['Performance Analysts', 'Management'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.KPI_TEMPLATE]: {
    label: 'KPI Template',
    description: 'Template for KPI tracking reports',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'Target',
    color: '#F59E0B',
    priority: 1,
    recommendedFor: ['Business Analysts', 'KPI Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.DASHBOARD_TEMPLATE]: {
    label: 'Dashboard Template',
    description: 'Template for interactive dashboards',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'Layout',
    color: '#3B82F6',
    priority: 1,
    recommendedFor: ['Analysts', 'Managers', 'Executives'],
    isInteractive: true,
    isResponsive: true,
  },
  [ReportTemplateType.ANALYTICAL_TEMPLATE]: {
    label: 'Analytical Template',
    description: 'Template for in-depth analytical reports',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'BarChart',
    color: '#8B5CF6',
    priority: 2,
    recommendedFor: ['Data Analysts', 'Researchers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.STRATEGIC_TEMPLATE]: {
    label: 'Strategic Template',
    description: 'Template for strategic planning reports',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#6366F1',
    priority: 2,
    recommendedFor: ['Strategic Planners', 'Management'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.COMPARATIVE_TEMPLATE]: {
    label: 'Comparative Template',
    description: 'Template for comparative analysis',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'GitCompare',
    color: '#F472B6',
    priority: 2,
    recommendedFor: ['Analysts', 'Researchers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.TREND_TEMPLATE]: {
    label: 'Trend Template',
    description: 'Template for trend analysis reports',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    recommendedFor: ['Data Analysts', 'Forecasters'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.FORECAST_TEMPLATE]: {
    label: 'Forecast Template',
    description: 'Template for forecasting and predictions',
    category: ReportTemplateTypeCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    recommendedFor: ['Forecasters', 'Planning Team'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.BLANK_TEMPLATE]: {
    label: 'Blank Template',
    description: 'Empty template for custom design',
    category: ReportTemplateTypeCategory.STRUCTURE,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    recommendedFor: ['Designers', 'Advanced Users'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.CUSTOM_TEMPLATE]: {
    label: 'Custom Template',
    description: 'Custom designed template',
    category: ReportTemplateTypeCategory.STRUCTURE,
    icon: 'Settings',
    color: '#8B5CF6',
    priority: 3,
    recommendedFor: ['Advanced Users', 'Designers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.BRANDED_TEMPLATE]: {
    label: 'Branded Template',
    description: 'Template with brand styling',
    category: ReportTemplateTypeCategory.MEDIUM,
    icon: 'Tag',
    color: '#EC4899',
    priority: 2,
    recommendedFor: ['Marketing Team', 'Brand Managers'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.RESPONSIVE_TEMPLATE]: {
    label: 'Responsive Template',
    description: 'Template that adapts to screen size',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'Layout',
    color: '#10B981',
    priority: 2,
    recommendedFor: ['All Users'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.PRINT_TEMPLATE]: {
    label: 'Print Template',
    description: 'Template optimized for print',
    category: ReportTemplateTypeCategory.MEDIUM,
    icon: 'Printer',
    color: '#6B7280',
    priority: 3,
    recommendedFor: ['Print Production'],
    isInteractive: false,
    isResponsive: false,
  },
  [ReportTemplateType.DIGITAL_TEMPLATE]: {
    label: 'Digital Template',
    description: 'Template optimized for digital viewing',
    category: ReportTemplateTypeCategory.MEDIUM,
    icon: 'Monitor',
    color: '#3B82F6',
    priority: 2,
    recommendedFor: ['All Users'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.INTERACTIVE_TEMPLATE]: {
    label: 'Interactive Template',
    description: 'Template with interactive elements',
    category: ReportTemplateTypeCategory.INTERACTIVITY,
    icon: 'MousePointerClick',
    color: '#F59E0B',
    priority: 2,
    recommendedFor: ['Analysts', 'Presentation Teams'],
    isInteractive: true,
    isResponsive: true,
  },
  [ReportTemplateType.STATIC_TEMPLATE]: {
    label: 'Static Template',
    description: 'Non-interactive static template',
    category: ReportTemplateTypeCategory.INTERACTIVITY,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    recommendedFor: ['Print', 'Archival'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.DYNAMIC_TEMPLATE]: {
    label: 'Dynamic Template',
    description: 'Template with dynamic content updates',
    category: ReportTemplateTypeCategory.INTERACTIVITY,
    icon: 'Refresh',
    color: '#22C55E',
    priority: 2,
    recommendedFor: ['Real-time Reports', 'Dashboards'],
    isInteractive: true,
    isResponsive: true,
  },
  [ReportTemplateType.SINGLE_PAGE_TEMPLATE]: {
    label: 'Single Page Template',
    description: 'Template with single page layout',
    category: ReportTemplateTypeCategory.STRUCTURE,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    recommendedFor: ['Summaries', 'Dashboards'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.MULTI_PAGE_TEMPLATE]: {
    label: 'Multi Page Template',
    description: 'Template with multiple pages',
    category: ReportTemplateTypeCategory.STRUCTURE,
    icon: 'Files',
    color: '#8B5CF6',
    priority: 2,
    recommendedFor: ['Full Reports', 'Documents'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.SECTIONED_TEMPLATE]: {
    label: 'Sectioned Template',
    description: 'Template with clear section divisions',
    category: ReportTemplateTypeCategory.STRUCTURE,
    icon: 'Layers',
    color: '#F59E0B',
    priority: 2,
    recommendedFor: ['Structured Reports'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.GRID_TEMPLATE]: {
    label: 'Grid Template',
    description: 'Template using grid layout',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'Grid',
    color: '#10B981',
    priority: 2,
    recommendedFor: ['Dashboards', 'Data Dense Reports'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.CARD_TEMPLATE]: {
    label: 'Card Template',
    description: 'Template with card-based layout',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'LayoutGrid',
    color: '#F472B6',
    priority: 2,
    recommendedFor: ['Modern Dashboards', 'Summaries'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.LIST_TEMPLATE]: {
    label: 'List Template',
    description: 'Template with list-based layout',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'List',
    color: '#6366F1',
    priority: 2,
    recommendedFor: ['Itemized Reports', 'Inventories'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.TABLE_TEMPLATE]: {
    label: 'Table Template',
    description: 'Template focused on tabular data',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'Table',
    color: '#3B82F6',
    priority: 2,
    recommendedFor: ['Data Tables', 'Spreadsheets'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.CHART_TEMPLATE]: {
    label: 'Chart Template',
    description: 'Template focused on charts and visualizations',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'PieChart',
    color: '#F59E0B',
    priority: 2,
    recommendedFor: ['Data Visualization', 'Analytics'],
    isInteractive: false,
    isResponsive: true,
  },
  [ReportTemplateType.MIXED_TEMPLATE]: {
    label: 'Mixed Template',
    description: 'Template combining multiple layout styles',
    category: ReportTemplateTypeCategory.LAYOUT,
    icon: 'Layers',
    color: '#8B5CF6',
    priority: 2,
    recommendedFor: ['Complex Reports'],
    isInteractive: false,
    isResponsive: true,
  },
};

/**
 * Get template type label
 */
export function getTemplateTypeLabel(type: ReportTemplateType): string {
  return REPORT_TEMPLATE_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get template type description
 */
export function getTemplateTypeDescription(type: ReportTemplateType): string {
  return REPORT_TEMPLATE_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get template type category
 */
export function getTemplateTypeCategory(type: ReportTemplateType): ReportTemplateTypeCategory {
  return REPORT_TEMPLATE_TYPE_CATEGORY_MAP[type];
}

/**
 * Get template types by category
 */
export function getTemplateTypesByCategory(
  category: ReportTemplateTypeCategory
): ReportTemplateType[] {
  return Object.entries(REPORT_TEMPLATE_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ReportTemplateType);
}

/**
 * Get business templates
 */
export function getBusinessTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.BUSINESS);
}

/**
 * Get analytical templates
 */
export function getAnalyticalTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.ANALYTICAL);
}

/**
 * Get functional templates
 */
export function getFunctionalTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.FUNCTIONAL);
}

/**
 * Get layout templates
 */
export function getLayoutTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.LAYOUT);
}

/**
 * Get structure templates
 */
export function getStructureTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.STRUCTURE);
}

/**
 * Get medium templates
 */
export function getMediumTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.MEDIUM);
}

/**
 * Get interactivity templates
 */
export function getInteractivityTemplates(): ReportTemplateType[] {
  return getTemplateTypesByCategory(ReportTemplateTypeCategory.INTERACTIVITY);
}

/**
 * Get interactive templates
 */
export function getInteractiveTemplates(): ReportTemplateType[] {
  return Object.values(ReportTemplateType).filter(
    (type) => REPORT_TEMPLATE_TYPE_CONFIG[type]?.isInteractive === true
  );
}

/**
 * Get responsive templates
 */
export function getResponsiveTemplates(): ReportTemplateType[] {
  return Object.values(ReportTemplateType).filter(
    (type) => REPORT_TEMPLATE_TYPE_CONFIG[type]?.isResponsive === true
  );
}

/**
 * Check if template type is interactive
 */
export function isTemplateTypeInteractive(type: ReportTemplateType): boolean {
  return REPORT_TEMPLATE_TYPE_CONFIG[type]?.isInteractive || false;
}

/**
 * Check if template type is responsive
 */
export function isTemplateTypeResponsive(type: ReportTemplateType): boolean {
  return REPORT_TEMPLATE_TYPE_CONFIG[type]?.isResponsive || false;
}

/**
 * Get template type priority
 */
export function getTemplateTypePriority(type: ReportTemplateType): number {
  return REPORT_TEMPLATE_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Get recommended template types for a domain
 */
export function getRecommendedTemplateTypes(domain: string): ReportTemplateType[] {
  return Object.entries(REPORT_TEMPLATE_TYPE_CONFIG)
    .filter(([_, config]) => config.recommendedFor.includes(domain))
    .map(([type]) => type as ReportTemplateType);
}

/**
 * Template type status
 */
export enum ReportTemplateTypeStatus {
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
 * Default status for template types
 */
export const REPORT_TEMPLATE_TYPE_DEFAULT_STATUS: Record<
  ReportTemplateType,
  ReportTemplateTypeStatus
> = {
  [ReportTemplateType.SALES_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.MARKETING_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.FINANCIAL_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.OPERATIONAL_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.EXECUTIVE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.CUSTOMER_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.PRODUCT_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.INVENTORY_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.PERFORMANCE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.KPI_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.DASHBOARD_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.ANALYTICAL_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.STRATEGIC_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.COMPARATIVE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.TREND_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.FORECAST_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.BLANK_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.CUSTOM_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.BRANDED_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.RESPONSIVE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.PRINT_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.DIGITAL_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.INTERACTIVE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.STATIC_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.DYNAMIC_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.SINGLE_PAGE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.MULTI_PAGE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.SECTIONED_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.GRID_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.CARD_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.LIST_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.TABLE_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.CHART_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
  [ReportTemplateType.MIXED_TEMPLATE]: ReportTemplateTypeStatus.ACTIVE,
};

/**
 * Get template type status
 */
export function getTemplateTypeStatus(type: ReportTemplateType): ReportTemplateTypeStatus {
  return REPORT_TEMPLATE_TYPE_DEFAULT_STATUS[type] || ReportTemplateTypeStatus.INACTIVE;
}

/**
 * Set template type status
 */
export function setTemplateTypeStatus(
  type: ReportTemplateType,
  status: ReportTemplateTypeStatus
): void {
  REPORT_TEMPLATE_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Template type priority levels
 */
export const TEMPLATE_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential templates */
  CRITICAL: 1,
  /** High - important templates */
  HIGH: 2,
  /** Medium - useful templates */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get template types by priority
 */
export function getTemplateTypesByPriority(priority: number): ReportTemplateType[] {
  return Object.entries(REPORT_TEMPLATE_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as ReportTemplateType);
}

/**
 * Get critical template types
 */
export function getCriticalTemplateTypes(): ReportTemplateType[] {
  return getTemplateTypesByPriority(TEMPLATE_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Template type groups
 */
export const TEMPLATE_TYPE_GROUPS = {
  /** Business domain templates */
  BUSINESS_DOMAIN: [
    ReportTemplateType.SALES_TEMPLATE,
    ReportTemplateType.MARKETING_TEMPLATE,
    ReportTemplateType.FINANCIAL_TEMPLATE,
    ReportTemplateType.CUSTOMER_TEMPLATE,
    ReportTemplateType.PRODUCT_TEMPLATE,
  ],
  /** Executive templates */
  EXECUTIVE: [
    ReportTemplateType.EXECUTIVE_TEMPLATE,
    ReportTemplateType.DASHBOARD_TEMPLATE,
    ReportTemplateType.KPI_TEMPLATE,
  ],
  /** Analytical templates */
  ANALYTICAL: [
    ReportTemplateType.ANALYTICAL_TEMPLATE,
    ReportTemplateType.COMPARATIVE_TEMPLATE,
    ReportTemplateType.TREND_TEMPLATE,
    ReportTemplateType.FORECAST_TEMPLATE,
  ],
  /** Layout templates */
  LAYOUT_STYLES: [
    ReportTemplateType.GRID_TEMPLATE,
    ReportTemplateType.CARD_TEMPLATE,
    ReportTemplateType.LIST_TEMPLATE,
    ReportTemplateType.TABLE_TEMPLATE,
    ReportTemplateType.CHART_TEMPLATE,
    ReportTemplateType.MIXED_TEMPLATE,
  ],
} as const;
