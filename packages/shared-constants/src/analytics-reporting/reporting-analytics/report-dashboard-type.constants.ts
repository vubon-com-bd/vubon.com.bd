/**
 * @fileoverview Report dashboard type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Dashboard types enum
 */
export enum DashboardType {
  /** Executive dashboard for leadership */
  EXECUTIVE_DASHBOARD = 'EXECUTIVE_DASHBOARD',
  /** Operational dashboard for daily operations */
  OPERATIONAL_DASHBOARD = 'OPERATIONAL_DASHBOARD',
  /** Analytical dashboard for data analysis */
  ANALYTICAL_DASHBOARD = 'ANALYTICAL_DASHBOARD',
  /** Strategic dashboard for long-term planning */
  STRATEGIC_DASHBOARD = 'STRATEGIC_DASHBOARD',
  /** Team dashboard for team performance */
  TEAM_DASHBOARD = 'TEAM_DASHBOARD',
  /** Department dashboard for department metrics */
  DEPARTMENT_DASHBOARD = 'DEPARTMENT_DASHBOARD',
  /** Project dashboard for project tracking */
  PROJECT_DASHBOARD = 'PROJECT_DASHBOARD',
  /** Sales dashboard for sales metrics */
  SALES_DASHBOARD = 'SALES_DASHBOARD',
  /** Marketing dashboard for marketing metrics */
  MARKETING_DASHBOARD = 'MARKETING_DASHBOARD',
  /** Finance dashboard for financial metrics */
  FINANCE_DASHBOARD = 'FINANCE_DASHBOARD',
  /** HR dashboard for human resources metrics */
  HR_DASHBOARD = 'HR_DASHBOARD',
  /** Operations dashboard for operations metrics */
  OPERATIONS_DASHBOARD = 'OPERATIONS_DASHBOARD',
  /** IT dashboard for IT metrics */
  IT_DASHBOARD = 'IT_DASHBOARD',
  /** Support dashboard for customer support metrics */
  SUPPORT_DASHBOARD = 'SUPPORT_DASHBOARD',
  /** Product dashboard for product metrics */
  PRODUCT_DASHBOARD = 'PRODUCT_DASHBOARD',
  /** Customer dashboard for customer metrics */
  CUSTOMER_DASHBOARD = 'CUSTOMER_DASHBOARD',
  /** Vendor dashboard for vendor metrics */
  VENDOR_DASHBOARD = 'VENDOR_DASHBOARD',
  /** Supply chain dashboard for supply chain metrics */
  SUPPLY_CHAIN_DASHBOARD = 'SUPPLY_CHAIN_DASHBOARD',
  /** Logistics dashboard for logistics metrics */
  LOGISTICS_DASHBOARD = 'LOGISTICS_DASHBOARD',
  /** Inventory dashboard for inventory metrics */
  INVENTORY_DASHBOARD = 'INVENTORY_DASHBOARD',
  /** Performance dashboard for performance metrics */
  PERFORMANCE_DASHBOARD = 'PERFORMANCE_DASHBOARD',
  /** KPI dashboard for KPI tracking */
  KPI_DASHBOARD = 'KPI_DASHBOARD',
  /** Metric dashboard for metric visualization */
  METRIC_DASHBOARD = 'METRIC_DASHBOARD',
  /** Comparative dashboard for comparisons */
  COMPARATIVE_DASHBOARD = 'COMPARATIVE_DASHBOARD',
  /** Trend dashboard for trend analysis */
  TREND_DASHBOARD = 'TREND_DASHBOARD',
  /** Forecast dashboard for forecasting */
  FORECAST_DASHBOARD = 'FORECAST_DASHBOARD',
  /** Real-time dashboard for live data */
  REAL_TIME_DASHBOARD = 'REAL_TIME_DASHBOARD',
  /** Historical dashboard for historical data */
  HISTORICAL_DASHBOARD = 'HISTORICAL_DASHBOARD',
  /** Predictive dashboard for predictions */
  PREDICTIVE_DASHBOARD = 'PREDICTIVE_DASHBOARD',
  /** Prescriptive dashboard for recommendations */
  PRESCRIPTIVE_DASHBOARD = 'PRESCRIPTIVE_DASHBOARD',
  /** Diagnostic dashboard for diagnostics */
  DIAGNOSTIC_DASHBOARD = 'DIAGNOSTIC_DASHBOARD',
  /** Descriptive dashboard for descriptions */
  DESCRIPTIVE_DASHBOARD = 'DESCRIPTIVE_DASHBOARD',
  /** Monitoring dashboard for monitoring */
  MONITORING_DASHBOARD = 'MONITORING_DASHBOARD',
  /** Alert dashboard for alerts */
  ALERT_DASHBOARD = 'ALERT_DASHBOARD',
  /** Custom dashboard for custom needs */
  CUSTOM_DASHBOARD = 'CUSTOM_DASHBOARD',
  /** Personal dashboard for personal use */
  PERSONAL_DASHBOARD = 'PERSONAL_DASHBOARD',
  /** Shared dashboard for sharing */
  SHARED_DASHBOARD = 'SHARED_DASHBOARD',
  /** Public dashboard for public access */
  PUBLIC_DASHBOARD = 'PUBLIC_DASHBOARD',
  /** Private dashboard for private access */
  PRIVATE_DASHBOARD = 'PRIVATE_DASHBOARD',
  /** Embedded dashboard for embedding */
  EMBEDDED_DASHBOARD = 'EMBEDDED_DASHBOARD',
}

/**
 * Dashboard category for grouping
 */
export enum DashboardCategory {
  /** Executive dashboards */
  EXECUTIVE = 'EXECUTIVE',
  /** Operational dashboards */
  OPERATIONAL = 'OPERATIONAL',
  /** Analytical dashboards */
  ANALYTICAL = 'ANALYTICAL',
  /** Strategic dashboards */
  STRATEGIC = 'STRATEGIC',
  /** Functional dashboards */
  FUNCTIONAL = 'FUNCTIONAL',
  /** Departmental dashboards */
  DEPARTMENTAL = 'DEPARTMENTAL',
  /** Performance dashboards */
  PERFORMANCE = 'PERFORMANCE',
  /** Real-time dashboards */
  REALTIME = 'REALTIME',
  /** Custom dashboards */
  CUSTOM = 'CUSTOM',
  /** Access-based dashboards */
  ACCESS = 'ACCESS',
}

/**
 * Dashboard category mapping
 */
export const DASHBOARD_CATEGORY_MAP: Record<DashboardType, DashboardCategory> = {
  [DashboardType.EXECUTIVE_DASHBOARD]: DashboardCategory.EXECUTIVE,
  [DashboardType.OPERATIONAL_DASHBOARD]: DashboardCategory.OPERATIONAL,
  [DashboardType.ANALYTICAL_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.STRATEGIC_DASHBOARD]: DashboardCategory.STRATEGIC,
  [DashboardType.TEAM_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.DEPARTMENT_DASHBOARD]: DashboardCategory.DEPARTMENTAL,
  [DashboardType.PROJECT_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.SALES_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.MARKETING_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.FINANCE_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.HR_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.OPERATIONS_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.IT_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.SUPPORT_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.PRODUCT_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.CUSTOMER_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.VENDOR_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.SUPPLY_CHAIN_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.LOGISTICS_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.INVENTORY_DASHBOARD]: DashboardCategory.FUNCTIONAL,
  [DashboardType.PERFORMANCE_DASHBOARD]: DashboardCategory.PERFORMANCE,
  [DashboardType.KPI_DASHBOARD]: DashboardCategory.PERFORMANCE,
  [DashboardType.METRIC_DASHBOARD]: DashboardCategory.PERFORMANCE,
  [DashboardType.COMPARATIVE_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.TREND_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.FORECAST_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.REAL_TIME_DASHBOARD]: DashboardCategory.REALTIME,
  [DashboardType.HISTORICAL_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.PREDICTIVE_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.PRESCRIPTIVE_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.DIAGNOSTIC_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.DESCRIPTIVE_DASHBOARD]: DashboardCategory.ANALYTICAL,
  [DashboardType.MONITORING_DASHBOARD]: DashboardCategory.OPERATIONAL,
  [DashboardType.ALERT_DASHBOARD]: DashboardCategory.OPERATIONAL,
  [DashboardType.CUSTOM_DASHBOARD]: DashboardCategory.CUSTOM,
  [DashboardType.PERSONAL_DASHBOARD]: DashboardCategory.CUSTOM,
  [DashboardType.SHARED_DASHBOARD]: DashboardCategory.ACCESS,
  [DashboardType.PUBLIC_DASHBOARD]: DashboardCategory.ACCESS,
  [DashboardType.PRIVATE_DASHBOARD]: DashboardCategory.ACCESS,
  [DashboardType.EMBEDDED_DASHBOARD]: DashboardCategory.CUSTOM,
};

/**
 * Dashboard type configuration
 */
export interface DashboardTypeConfig {
  label: string;
  description: string;
  category: DashboardCategory;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresDataSelection: boolean;
  recommendedFor: string[];
}

export const DASHBOARD_TYPE_CONFIG: Record<DashboardType, DashboardTypeConfig> = {
  [DashboardType.EXECUTIVE_DASHBOARD]: {
    label: 'Executive Dashboard',
    description: 'High-level dashboard for executives',
    category: DashboardCategory.EXECUTIVE,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['CEO', 'CFO', 'Board Members'],
  },
  [DashboardType.OPERATIONAL_DASHBOARD]: {
    label: 'Operational Dashboard',
    description: 'Real-time operational metrics dashboard',
    category: DashboardCategory.OPERATIONAL,
    icon: 'Activity',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Operations Managers', 'Team Leads'],
  },
  [DashboardType.ANALYTICAL_DASHBOARD]: {
    label: 'Analytical Dashboard',
    description: 'In-depth analytical insights dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'BarChart',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Data Analysts', 'Researchers'],
  },
  [DashboardType.STRATEGIC_DASHBOARD]: {
    label: 'Strategic Dashboard',
    description: 'Long-term strategic planning dashboard',
    category: DashboardCategory.STRATEGIC,
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Strategic Planners', 'Directors'],
  },
  [DashboardType.TEAM_DASHBOARD]: {
    label: 'Team Dashboard',
    description: 'Team performance and collaboration dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Users',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Team Leads', 'Project Managers'],
  },
  [DashboardType.DEPARTMENT_DASHBOARD]: {
    label: 'Department Dashboard',
    description: 'Department-wide metrics and KPIs',
    category: DashboardCategory.DEPARTMENTAL,
    icon: 'Building',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Department Heads', 'Directors'],
  },
  [DashboardType.PROJECT_DASHBOARD]: {
    label: 'Project Dashboard',
    description: 'Project progress and status tracking',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Clipboard',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Project Managers', 'Team Members'],
  },
  [DashboardType.SALES_DASHBOARD]: {
    label: 'Sales Dashboard',
    description: 'Sales performance and pipeline dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Sales Managers', 'Sales Reps'],
  },
  [DashboardType.MARKETING_DASHBOARD]: {
    label: 'Marketing Dashboard',
    description: 'Marketing campaign and analytics dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Megaphone',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Marketing Managers', 'Campaign Managers'],
  },
  [DashboardType.FINANCE_DASHBOARD]: {
    label: 'Finance Dashboard',
    description: 'Financial metrics and reporting dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'DollarSign',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Finance Managers', 'Accountants'],
  },
  [DashboardType.HR_DASHBOARD]: {
    label: 'HR Dashboard',
    description: 'Human resources metrics and analytics',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['HR Managers', 'Recruiters'],
  },
  [DashboardType.OPERATIONS_DASHBOARD]: {
    label: 'Operations Dashboard',
    description: 'Operations efficiency and metrics dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Settings',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Operations Managers'],
  },
  [DashboardType.IT_DASHBOARD]: {
    label: 'IT Dashboard',
    description: 'IT infrastructure and performance dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Monitor',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['IT Managers', 'DevOps Teams'],
  },
  [DashboardType.SUPPORT_DASHBOARD]: {
    label: 'Support Dashboard',
    description: 'Customer support metrics and ticket tracking',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Headset',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Support Managers', 'Support Agents'],
  },
  [DashboardType.PRODUCT_DASHBOARD]: {
    label: 'Product Dashboard',
    description: 'Product performance and analytics dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Package',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Product Managers', 'Product Owners'],
  },
  [DashboardType.CUSTOMER_DASHBOARD]: {
    label: 'Customer Dashboard',
    description: 'Customer insights and analytics dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Users',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Customer Success Managers', 'Sales Teams'],
  },
  [DashboardType.VENDOR_DASHBOARD]: {
    label: 'Vendor Dashboard',
    description: 'Vendor performance and management dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Truck',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Procurement Managers'],
  },
  [DashboardType.SUPPLY_CHAIN_DASHBOARD]: {
    label: 'Supply Chain Dashboard',
    description: 'Supply chain visibility and metrics dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Package',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Supply Chain Managers'],
  },
  [DashboardType.LOGISTICS_DASHBOARD]: {
    label: 'Logistics Dashboard',
    description: 'Logistics and delivery tracking dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Truck',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Logistics Managers'],
  },
  [DashboardType.INVENTORY_DASHBOARD]: {
    label: 'Inventory Dashboard',
    description: 'Inventory status and management dashboard',
    category: DashboardCategory.FUNCTIONAL,
    icon: 'Package',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Inventory Managers'],
  },
  [DashboardType.PERFORMANCE_DASHBOARD]: {
    label: 'Performance Dashboard',
    description: 'Performance metrics and KPIs dashboard',
    category: DashboardCategory.PERFORMANCE,
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Managers', 'Directors'],
  },
  [DashboardType.KPI_DASHBOARD]: {
    label: 'KPI Dashboard',
    description: 'Key Performance Indicator tracking dashboard',
    category: DashboardCategory.PERFORMANCE,
    icon: 'Target',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Managers'],
  },
  [DashboardType.METRIC_DASHBOARD]: {
    label: 'Metric Dashboard',
    description: 'Comprehensive metric visualization dashboard',
    category: DashboardCategory.PERFORMANCE,
    icon: 'BarChart',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Data Teams'],
  },
  [DashboardType.COMPARATIVE_DASHBOARD]: {
    label: 'Comparative Dashboard',
    description: 'Side-by-side comparison dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'GitCompare',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Researchers'],
  },
  [DashboardType.TREND_DASHBOARD]: {
    label: 'Trend Dashboard',
    description: 'Trend analysis and visualization dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Forecasters'],
  },
  [DashboardType.FORECAST_DASHBOARD]: {
    label: 'Forecast Dashboard',
    description: 'Predictive forecasting dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Forecasters', 'Planners'],
  },
  [DashboardType.REAL_TIME_DASHBOARD]: {
    label: 'Real-Time Dashboard',
    description: 'Live real-time data dashboard',
    category: DashboardCategory.REALTIME,
    icon: 'Activity',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['Operations Teams', 'Monitoring Teams'],
  },
  [DashboardType.HISTORICAL_DASHBOARD]: {
    label: 'Historical Dashboard',
    description: 'Historical data analysis dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'Clock',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Researchers'],
  },
  [DashboardType.PREDICTIVE_DASHBOARD]: {
    label: 'Predictive Dashboard',
    description: 'Predictive analytics dashboard',
    category: DashboardCategory.ANALYTICAL,
    icon: 'TrendingUp',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Data Scientists', 'Analysts'],
  },
  [DashboardType.PRESCRIPTIVE_DASHBOARD]: {
    label: 'Prescriptive Dashboard',
    description: 'Prescriptive analytics and recommendations',
    category: DashboardCategory.ANALYTICAL,
    icon: 'Lightbulb',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Decision Makers', 'Managers'],
  },
  [DashboardType.DIAGNOSTIC_DASHBOARD]: {
    label: 'Diagnostic Dashboard',
    description: 'Diagnostic analysis and troubleshooting',
    category: DashboardCategory.ANALYTICAL,
    icon: 'Stethoscope',
    color: '#EF4444',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Support Teams'],
  },
  [DashboardType.DESCRIPTIVE_DASHBOARD]: {
    label: 'Descriptive Dashboard',
    description: 'Descriptive statistics and summaries',
    category: DashboardCategory.ANALYTICAL,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Analysts', 'Managers'],
  },
  [DashboardType.MONITORING_DASHBOARD]: {
    label: 'Monitoring Dashboard',
    description: 'System and process monitoring dashboard',
    category: DashboardCategory.OPERATIONAL,
    icon: 'Activity',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: true,
    recommendedFor: ['System Admins', 'DevOps Teams'],
  },
  [DashboardType.ALERT_DASHBOARD]: {
    label: 'Alert Dashboard',
    description: 'Alerts and notifications dashboard',
    category: DashboardCategory.OPERATIONAL,
    icon: 'Bell',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresDataSelection: false,
    recommendedFor: ['Operations Teams', 'Support Teams'],
  },
  [DashboardType.CUSTOM_DASHBOARD]: {
    label: 'Custom Dashboard',
    description: 'Fully customizable dashboard',
    category: DashboardCategory.CUSTOM,
    icon: 'Settings',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Advanced Users'],
  },
  [DashboardType.PERSONAL_DASHBOARD]: {
    label: 'Personal Dashboard',
    description: 'Personalized individual dashboard',
    category: DashboardCategory.CUSTOM,
    icon: 'User',
    color: '#8B5CF6',
    priority: 3,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['All Users'],
  },
  [DashboardType.SHARED_DASHBOARD]: {
    label: 'Shared Dashboard',
    description: 'Shared collaboration dashboard',
    category: DashboardCategory.ACCESS,
    icon: 'Share2',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Teams', 'Groups'],
  },
  [DashboardType.PUBLIC_DASHBOARD]: {
    label: 'Public Dashboard',
    description: 'Publicly accessible dashboard',
    category: DashboardCategory.ACCESS,
    icon: 'Globe',
    color: '#3B82F6',
    priority: 3,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Public Data'],
  },
  [DashboardType.PRIVATE_DASHBOARD]: {
    label: 'Private Dashboard',
    description: 'Private access only dashboard',
    category: DashboardCategory.ACCESS,
    icon: 'Lock',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Individual Users'],
  },
  [DashboardType.EMBEDDED_DASHBOARD]: {
    label: 'Embedded Dashboard',
    description: 'Dashboard for embedding in applications',
    category: DashboardCategory.CUSTOM,
    icon: 'Code',
    color: '#8B5CF6',
    priority: 3,
    isRealtime: false,
    requiresDataSelection: true,
    recommendedFor: ['Developers', 'Application Owners'],
  },
};

/**
 * Get dashboard type label
 */
export function getDashboardTypeLabel(type: DashboardType): string {
  return DASHBOARD_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get dashboard type description
 */
export function getDashboardTypeDescription(type: DashboardType): string {
  return DASHBOARD_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get dashboard type category
 */
export function getDashboardTypeCategory(type: DashboardType): DashboardCategory {
  return DASHBOARD_CATEGORY_MAP[type];
}

/**
 * Get dashboard types by category
 */
export function getDashboardTypesByCategory(category: DashboardCategory): DashboardType[] {
  return Object.entries(DASHBOARD_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as DashboardType);
}

/**
 * Get executive dashboards
 */
export function getExecutiveDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.EXECUTIVE);
}

/**
 * Get operational dashboards
 */
export function getOperationalDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.OPERATIONAL);
}

/**
 * Get analytical dashboards
 */
export function getAnalyticalDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.ANALYTICAL);
}

/**
 * Get strategic dashboards
 */
export function getStrategicDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.STRATEGIC);
}

/**
 * Get functional dashboards
 */
export function getFunctionalDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.FUNCTIONAL);
}

/**
 * Get departmental dashboards
 */
export function getDepartmentalDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.DEPARTMENTAL);
}

/**
 * Get performance dashboards
 */
export function getPerformanceDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.PERFORMANCE);
}

/**
 * Get real-time dashboards
 */
export function getRealtimeDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.REALTIME);
}

/**
 * Get custom dashboards
 */
export function getCustomDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.CUSTOM);
}

/**
 * Get access-based dashboards
 */
export function getAccessDashboards(): DashboardType[] {
  return getDashboardTypesByCategory(DashboardCategory.ACCESS);
}

/**
 * Check if dashboard type is real-time
 */
export function isDashboardTypeRealtime(type: DashboardType): boolean {
  return DASHBOARD_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Check if dashboard type requires data selection
 */
export function dashboardTypeRequiresDataSelection(type: DashboardType): boolean {
  return DASHBOARD_TYPE_CONFIG[type]?.requiresDataSelection || false;
}

/**
 * Get dashboard type priority
 */
export function getDashboardTypePriority(type: DashboardType): number {
  return DASHBOARD_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Get recommended dashboard types for a role
 */
export function getRecommendedDashboardTypes(role: string): DashboardType[] {
  return Object.entries(DASHBOARD_TYPE_CONFIG)
    .filter(([_, config]) => config.recommendedFor.includes(role))
    .map(([type]) => type as DashboardType);
}

/**
 * Dashboard type status
 */
export enum DashboardTypeStatus {
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
 * Default status for dashboard types
 */
export const DASHBOARD_TYPE_DEFAULT_STATUS: Record<DashboardType, DashboardTypeStatus> = {
  [DashboardType.EXECUTIVE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.OPERATIONAL_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.ANALYTICAL_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.STRATEGIC_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.TEAM_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.DEPARTMENT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PROJECT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.SALES_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.MARKETING_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.FINANCE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.HR_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.OPERATIONS_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.IT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.SUPPORT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PRODUCT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.CUSTOMER_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.VENDOR_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.SUPPLY_CHAIN_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.LOGISTICS_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.INVENTORY_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PERFORMANCE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.KPI_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.METRIC_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.COMPARATIVE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.TREND_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.FORECAST_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.REAL_TIME_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.HISTORICAL_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PREDICTIVE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PRESCRIPTIVE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.DIAGNOSTIC_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.DESCRIPTIVE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.MONITORING_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.ALERT_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.CUSTOM_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PERSONAL_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.SHARED_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PUBLIC_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.PRIVATE_DASHBOARD]: DashboardTypeStatus.ACTIVE,
  [DashboardType.EMBEDDED_DASHBOARD]: DashboardTypeStatus.ACTIVE,
};

/**
 * Get dashboard type status
 */
export function getDashboardTypeStatus(type: DashboardType): DashboardTypeStatus {
  return DASHBOARD_TYPE_DEFAULT_STATUS[type] || DashboardTypeStatus.INACTIVE;
}

/**
 * Set dashboard type status
 */
export function setDashboardTypeStatus(type: DashboardType, status: DashboardTypeStatus): void {
  DASHBOARD_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Dashboard type priority levels
 */
export const DASHBOARD_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential dashboards */
  CRITICAL: 1,
  /** High - important dashboards */
  HIGH: 2,
  /** Medium - useful dashboards */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get dashboard types by priority
 */
export function getDashboardTypesByPriority(priority: number): DashboardType[] {
  return Object.entries(DASHBOARD_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as DashboardType);
}

/**
 * Get critical dashboard types
 */
export function getCriticalDashboardTypes(): DashboardType[] {
  return getDashboardTypesByPriority(DASHBOARD_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Dashboard type groups
 */
export const DASHBOARD_TYPE_GROUPS = {
  /** Executive dashboards */
  EXECUTIVE: [
    DashboardType.EXECUTIVE_DASHBOARD,
    DashboardType.STRATEGIC_DASHBOARD,
    DashboardType.PERFORMANCE_DASHBOARD,
  ],
  /** Operational dashboards */
  OPERATIONAL: [
    DashboardType.OPERATIONAL_DASHBOARD,
    DashboardType.MONITORING_DASHBOARD,
    DashboardType.ALERT_DASHBOARD,
  ],
  /** Analytical dashboards */
  ANALYTICAL: [
    DashboardType.ANALYTICAL_DASHBOARD,
    DashboardType.COMPARATIVE_DASHBOARD,
    DashboardType.TREND_DASHBOARD,
    DashboardType.FORECAST_DASHBOARD,
    DashboardType.PREDICTIVE_DASHBOARD,
    DashboardType.PRESCRIPTIVE_DASHBOARD,
    DashboardType.DIAGNOSTIC_DASHBOARD,
    DashboardType.DESCRIPTIVE_DASHBOARD,
  ],
  /** Functional dashboards */
  FUNCTIONAL: [
    DashboardType.SALES_DASHBOARD,
    DashboardType.MARKETING_DASHBOARD,
    DashboardType.FINANCE_DASHBOARD,
    DashboardType.HR_DASHBOARD,
    DashboardType.SUPPORT_DASHBOARD,
    DashboardType.PRODUCT_DASHBOARD,
    DashboardType.CUSTOMER_DASHBOARD,
    DashboardType.INVENTORY_DASHBOARD,
  ],
} as const;
