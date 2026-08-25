/**
 * Logistics Analytics Type Constants
 * Types of logistics analytics
 */

export const LOGISTICS_ANALYTICS_TYPE = {
  // Analytics Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
    QUALITY: 'quality',
  } as const,

  // Analytics Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGION: 'region',
    WAREHOUSE: 'warehouse',
    VEHICLE: 'vehicle',
    DRIVER: 'driver',
    ROUTE: 'route',
  } as const,

  // Analytics Dimensions
  DIMENSIONS: {
    TIME: 'time',
    REGION: 'region',
    WAREHOUSE: 'warehouse',
    VEHICLE_TYPE: 'vehicle_type',
    SHIPMENT_TYPE: 'shipment_type',
    DELIVERY_ZONE: 'delivery_zone',
    COURIER: 'courier',
    DRIVER: 'driver',
    ROUTE: 'route',
    STATUS: 'status',
  } as const,

  // Analytics Filters
  FILTERS: {
    DATE_RANGE: 'date_range',
    REGION: 'region',
    WAREHOUSE_ID: 'warehouse_id',
    VEHICLE_ID: 'vehicle_id',
    DRIVER_ID: 'driver_id',
    SHIPMENT_TYPE: 'shipment_type',
    DELIVERY_ZONE: 'delivery_zone',
    COURIER: 'courier',
    STATUS: 'status',
  } as const,

  // Analytics Formats
  FORMATS: {
    TABLE: 'table',
    CHART: 'chart',
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    EXPORT: 'export',
  } as const,

  // Data Sources
  DATA_SOURCES: {
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    VEHICLE: 'vehicle',
    DRIVER: 'driver',
    WAREHOUSE: 'warehouse',
    COURIER: 'courier',
    COST: 'cost',
    CUSTOMER: 'customer',
  } as const,

  // Export Formats
  EXPORT_FORMATS: {
    CSV: 'csv',
    XLSX: 'xlsx',
    PDF: 'pdf',
    JSON: 'json',
    HTML: 'html',
  } as const,
} as const;

// Analytics Categories
export type LogisticsAnalyticsTypeCategory =
  (typeof LOGISTICS_ANALYTICS_TYPE.CATEGORIES)[keyof typeof LOGISTICS_ANALYTICS_TYPE.CATEGORIES];

// Analytics Scopes
export type LogisticsAnalyticsTypeScope =
  (typeof LOGISTICS_ANALYTICS_TYPE.SCOPES)[keyof typeof LOGISTICS_ANALYTICS_TYPE.SCOPES];

// Analytics Dimensions
export type LogisticsAnalyticsTypeDimension =
  (typeof LOGISTICS_ANALYTICS_TYPE.DIMENSIONS)[keyof typeof LOGISTICS_ANALYTICS_TYPE.DIMENSIONS];

// Analytics Filters
export type LogisticsAnalyticsTypeFilter =
  (typeof LOGISTICS_ANALYTICS_TYPE.FILTERS)[keyof typeof LOGISTICS_ANALYTICS_TYPE.FILTERS];

// Analytics Formats
export type LogisticsAnalyticsTypeFormat =
  (typeof LOGISTICS_ANALYTICS_TYPE.FORMATS)[keyof typeof LOGISTICS_ANALYTICS_TYPE.FORMATS];

// Data Sources
export type LogisticsAnalyticsTypeDataSource =
  (typeof LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES)[keyof typeof LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES];

// Export Formats
export type LogisticsAnalyticsTypeExportFormat =
  (typeof LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS)[keyof typeof LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS];

// Utility Functions
export function logisticsAnalyticsTypeGetCategoryLabel(
  category: LogisticsAnalyticsTypeCategory
): string {
  const labels: Record<LogisticsAnalyticsTypeCategory, string> = {
    [LOGISTICS_ANALYTICS_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [LOGISTICS_ANALYTICS_TYPE.CATEGORIES.PERFORMANCE]: 'Performance',
    [LOGISTICS_ANALYTICS_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [LOGISTICS_ANALYTICS_TYPE.CATEGORIES.CUSTOMER]: 'Customer',
    [LOGISTICS_ANALYTICS_TYPE.CATEGORIES.QUALITY]: 'Quality',
  };
  return labels[category] || 'Unknown';
}

export function logisticsAnalyticsTypeGetScopeLabel(scope: LogisticsAnalyticsTypeScope): string {
  const labels: Record<LogisticsAnalyticsTypeScope, string> = {
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.GLOBAL]: 'Global',
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.REGION]: 'Region',
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.VEHICLE]: 'Vehicle',
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.DRIVER]: 'Driver',
    [LOGISTICS_ANALYTICS_TYPE.SCOPES.ROUTE]: 'Route',
  };
  return labels[scope] || 'Unknown';
}

export function logisticsAnalyticsTypeGetDimensionLabel(
  dimension: LogisticsAnalyticsTypeDimension
): string {
  const labels: Record<LogisticsAnalyticsTypeDimension, string> = {
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.TIME]: 'Time',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.REGION]: 'Region',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.VEHICLE_TYPE]: 'Vehicle Type',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.SHIPMENT_TYPE]: 'Shipment Type',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.DELIVERY_ZONE]: 'Delivery Zone',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.COURIER]: 'Courier',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.DRIVER]: 'Driver',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.ROUTE]: 'Route',
    [LOGISTICS_ANALYTICS_TYPE.DIMENSIONS.STATUS]: 'Status',
  };
  return labels[dimension] || 'Unknown';
}

export function logisticsAnalyticsTypeGetFormatLabel(format: LogisticsAnalyticsTypeFormat): string {
  const labels: Record<LogisticsAnalyticsTypeFormat, string> = {
    [LOGISTICS_ANALYTICS_TYPE.FORMATS.TABLE]: 'Table',
    [LOGISTICS_ANALYTICS_TYPE.FORMATS.CHART]: 'Chart',
    [LOGISTICS_ANALYTICS_TYPE.FORMATS.DASHBOARD]: 'Dashboard',
    [LOGISTICS_ANALYTICS_TYPE.FORMATS.REPORT]: 'Report',
    [LOGISTICS_ANALYTICS_TYPE.FORMATS.EXPORT]: 'Export',
  };
  return labels[format] || 'Unknown';
}

export function logisticsAnalyticsTypeGetDataSourceLabel(
  source: LogisticsAnalyticsTypeDataSource
): string {
  const labels: Record<LogisticsAnalyticsTypeDataSource, string> = {
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.SHIPMENT]: 'Shipment',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.DELIVERY]: 'Delivery',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.VEHICLE]: 'Vehicle',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.DRIVER]: 'Driver',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.COURIER]: 'Courier',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.COST]: 'Cost',
    [LOGISTICS_ANALYTICS_TYPE.DATA_SOURCES.CUSTOMER]: 'Customer',
  };
  return labels[source] || 'Unknown';
}

export function logisticsAnalyticsTypeGetExportFormatLabel(
  format: LogisticsAnalyticsTypeExportFormat
): string {
  const labels: Record<LogisticsAnalyticsTypeExportFormat, string> = {
    [LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS.CSV]: 'CSV',
    [LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS.XLSX]: 'Excel',
    [LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS.PDF]: 'PDF',
    [LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS.JSON]: 'JSON',
    [LOGISTICS_ANALYTICS_TYPE.EXPORT_FORMATS.HTML]: 'HTML',
  };
  return labels[format] || 'Unknown';
}
