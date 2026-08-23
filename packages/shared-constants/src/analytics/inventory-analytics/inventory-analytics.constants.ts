/**
 * Inventory Analytics Constants
 * Configuration for inventory performance analytics and tracking
 */

export const INVENTORY_ANALYTICS = {
  // Inventory Analytics Types
  TYPES: {
    // Stock Analytics
    STOCK: 'stock',
    STOCK_LEVEL: 'stock_level',
    STOCK_MOVEMENT: 'stock_movement',
    STOCK_TURNOVER: 'stock_turnover',

    // Warehouse Analytics
    WAREHOUSE: 'warehouse',
    WAREHOUSE_CAPACITY: 'warehouse_capacity',
    WAREHOUSE_UTILIZATION: 'warehouse_utilization',

    // Product Analytics
    PRODUCT: 'product',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_SKU: 'product_sku',

    // Supply Chain Analytics
    SUPPLY_CHAIN: 'supply_chain',
    SUPPLIER: 'supplier',
    PROCUREMENT: 'procurement',

    // Demand Analytics
    DEMAND: 'demand',
    DEMAND_FORECAST: 'demand_forecast',
    DEMAND_PATTERN: 'demand_pattern',

    // Fulfillment Analytics
    FULFILLMENT: 'fulfillment',
    ORDER_FULFILLMENT: 'order_fulfillment',
    PICKING: 'picking',
    PACKING: 'packing',

    // Time Analytics
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Inventory Analytics Status
  STATUS: {
    TRACKING: 'tracking',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
    UPDATING: 'updating',
    REFRESHING: 'refreshing',
  } as const,

  // Inventory Analytics Scopes
  SCOPES: {
    INDIVIDUAL: 'individual',
    WAREHOUSE: 'warehouse',
    CATEGORY: 'category',
    PRODUCT: 'product',
    SUPPLIER: 'supplier',
    ALL_INVENTORY: 'all_inventory',
    COMPARATIVE: 'comparative',
  } as const,

  // Inventory Analytics Events
  EVENTS: {
    // Stock Events
    STOCK_ADDED: 'stock_added',
    STOCK_REMOVED: 'stock_removed',
    STOCK_UPDATED: 'stock_updated',
    STOCK_TRANSFERRED: 'stock_transferred',
    STOCK_ADJUSTED: 'stock_adjusted',

    // Stock Level Events
    STOCK_LOW: 'stock_low',
    STOCK_CRITICAL: 'stock_critical',
    STOCK_OUT: 'stock_out',
    STOCK_RESTOCKED: 'stock_restocked',
    STOCK_OVERSTOCKED: 'stock_overstocked',

    // Warehouse Events
    WAREHOUSE_RECEIVED: 'warehouse_received',
    WAREHOUSE_SHIPPED: 'warehouse_shipped',
    WAREHOUSE_TRANSFERRED: 'warehouse_transferred',
    WAREHOUSE_CAPACITY_REACHED: 'warehouse_capacity_reached',

    // Product Events
    PRODUCT_ADDED: 'product_added',
    PRODUCT_REMOVED: 'product_removed',
    PRODUCT_UPDATED: 'product_updated',
    PRODUCT_CATEGORY_CHANGED: 'product_category_changed',

    // Supplier Events
    SUPPLIER_ORDERED: 'supplier_ordered',
    SUPPLIER_RECEIVED: 'supplier_received',
    SUPPLIER_DELAYED: 'supplier_delayed',

    // Demand Events
    DEMAND_INCREASED: 'demand_increased',
    DEMAND_DECREASED: 'demand_decreased',
    DEMAND_PATTERN_CHANGED: 'demand_pattern_changed',

    // Fulfillment Events
    ORDER_FULFILLED: 'order_fulfilled',
    ORDER_PARTIALLY_FULFILLED: 'order_partially_fulfilled',
    ORDER_CANCELLED: 'order_cancelled',

    // Quality Events
    QUALITY_CHECK_PASSED: 'quality_check_passed',
    QUALITY_CHECK_FAILED: 'quality_check_failed',
    DAMAGED_REPORTED: 'damaged_reported',
    DAMAGED_REMOVED: 'damaged_removed',

    // Cost Events
    COST_INCREASED: 'cost_increased',
    COST_DECREASED: 'cost_decreased',
    HOLDING_COST_UPDATED: 'holding_cost_updated',
  } as const,

  // Inventory Analytics Dimensions
  DIMENSIONS: {
    // Product Attributes
    PRODUCT_ID: 'product_id',
    PRODUCT_NAME: 'product_name',
    PRODUCT_SKU: 'product_sku',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_SUB_CATEGORY: 'product_sub_category',
    PRODUCT_BRAND: 'product_brand',

    // Stock Attributes
    STOCK_LEVEL: 'stock_level',
    STOCK_STATUS: 'stock_status',
    STOCK_LOCATION: 'stock_location',
    STOCK_TYPE: 'stock_type',

    // Warehouse Attributes
    WAREHOUSE_ID: 'warehouse_id',
    WAREHOUSE_NAME: 'warehouse_name',
    WAREHOUSE_TYPE: 'warehouse_type',
    WAREHOUSE_LOCATION: 'warehouse_location',

    // Supplier Attributes
    SUPPLIER_ID: 'supplier_id',
    SUPPLIER_NAME: 'supplier_name',
    SUPPLIER_TYPE: 'supplier_type',
    SUPPLIER_LOCATION: 'supplier_location',

    // Time Attributes
    DATE: 'date',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',

    // Cost Attributes
    UNIT_COST: 'unit_cost',
    TOTAL_COST: 'total_cost',
    HOLDING_COST: 'holding_cost',
    ORDERING_COST: 'ordering_cost',

    // Demand Attributes
    DEMAND_LEVEL: 'demand_level',
    DEMAND_PATTERN: 'demand_pattern',
    DEMAND_SEASONALITY: 'demand_seasonality',

    // Fulfillment Attributes
    FULFILLMENT_RATE: 'fulfillment_rate',
    PICKING_TIME: 'picking_time',
    PACKING_TIME: 'packing_time',
    SHIPPING_TIME: 'shipping_time',
  } as const,

  // Inventory Analytics Metrics
  METRICS: {
    // Stock Metrics
    TOTAL_STOCK: 'total_stock',
    TOTAL_STOCK_VALUE: 'total_stock_value',
    AVG_STOCK_LEVEL: 'avg_stock_level',
    MAX_STOCK_LEVEL: 'max_stock_level',
    MIN_STOCK_LEVEL: 'min_stock_level',

    // Stock Movement Metrics
    STOCK_IN: 'stock_in',
    STOCK_OUT: 'stock_out',
    NET_STOCK_CHANGE: 'net_stock_change',
    STOCK_TURNOVER: 'stock_turnover',
    TURNOVER_RATE: 'turnover_rate',

    // Stock Health Metrics
    STOCK_AVAILABILITY: 'stock_availability',
    STOCK_ACCURACY: 'stock_accuracy',
    STOCK_LOSS_RATE: 'stock_loss_rate',
    DAMAGED_RATE: 'damaged_rate',

    // Warehouse Metrics
    WAREHOUSE_CAPACITY: 'warehouse_capacity',
    WAREHOUSE_UTILIZATION: 'warehouse_utilization',
    AVG_WAREHOUSE_OCCUPANCY: 'avg_warehouse_occupancy',

    // Supply Chain Metrics
    LEAD_TIME: 'lead_time',
    ORDER_CYCLE_TIME: 'order_cycle_time',
    SUPPLIER_DELIVERY_TIME: 'supplier_delivery_time',
    SUPPLIER_RELIABILITY: 'supplier_reliability',

    // Demand Metrics
    DEMAND_FORECAST: 'demand_forecast',
    DEMAND_ACCURACY: 'demand_accuracy',
    DEMAND_VARIABILITY: 'demand_variability',
    SEASONALITY_INDEX: 'seasonality_index',

    // Cost Metrics
    TOTAL_INVENTORY_COST: 'total_inventory_cost',
    HOLDING_COST: 'holding_cost',
    ORDERING_COST: 'ordering_cost',
    STOCKOUT_COST: 'stockout_cost',
    COST_PER_UNIT: 'cost_per_unit',

    // Fulfillment Metrics
    FULFILLMENT_RATE: 'fulfillment_rate',
    ORDER_FULFILLMENT_TIME: 'order_fulfillment_time',
    PICKING_ACCURACY: 'picking_accuracy',
    PACKING_ACCURACY: 'packing_accuracy',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    PERIOD_COMPARISON: 'period_comparison',
  } as const,

  // Inventory Analytics Segments
  SEGMENTS: {
    // Stock Segments
    HIGH_STOCK: 'high_stock',
    MEDIUM_STOCK: 'medium_stock',
    LOW_STOCK: 'low_stock',
    CRITICAL_STOCK: 'critical_stock',
    OUT_OF_STOCK: 'out_of_stock',

    // Category Segments
    FAST_MOVING: 'fast_moving',
    SLOW_MOVING: 'slow_moving',
    NON_MOVING: 'non_moving',
    SEASONAL: 'seasonal',
    PERISHABLE: 'perishable',

    // Supplier Segments
    RELIABLE: 'reliable',
    UNRELIABLE: 'unreliable',
    FAST_DELIVERY: 'fast_delivery',
    SLOW_DELIVERY: 'slow_delivery',

    // Warehouse Segments
    HIGH_UTILIZATION: 'high_utilization',
    MEDIUM_UTILIZATION: 'medium_utilization',
    LOW_UTILIZATION: 'low_utilization',

    // Cost Segments
    HIGH_COST: 'high_cost',
    MEDIUM_COST: 'medium_cost',
    LOW_COST: 'low_cost',

    // Demand Segments
    HIGH_DEMAND: 'high_demand',
    MEDIUM_DEMAND: 'medium_demand',
    LOW_DEMAND: 'low_demand',
  } as const,

  // Inventory Analytics Cohorts
  COHORTS: {
    PRODUCT_CATEGORY: 'product_category',
    WAREHOUSE: 'warehouse',
    SUPPLIER: 'supplier',
    STOCK_STATUS: 'stock_status',
    DEMAND_PATTERN: 'demand_pattern',
  } as const,

  // Inventory Analytics Granularity
  GRANULARITY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,
} as const;

// Inventory Analytics Types
export type InventoryAnalyticsType =
  (typeof INVENTORY_ANALYTICS.TYPES)[keyof typeof INVENTORY_ANALYTICS.TYPES];

// Inventory Analytics Status
export type InventoryAnalyticsStatus =
  (typeof INVENTORY_ANALYTICS.STATUS)[keyof typeof INVENTORY_ANALYTICS.STATUS];

// Inventory Analytics Scopes
export type InventoryAnalyticsScope =
  (typeof INVENTORY_ANALYTICS.SCOPES)[keyof typeof INVENTORY_ANALYTICS.SCOPES];

// Inventory Analytics Events
export type InventoryAnalyticsEvent =
  (typeof INVENTORY_ANALYTICS.EVENTS)[keyof typeof INVENTORY_ANALYTICS.EVENTS];

// Inventory Analytics Dimensions
export type InventoryAnalyticsDimension =
  (typeof INVENTORY_ANALYTICS.DIMENSIONS)[keyof typeof INVENTORY_ANALYTICS.DIMENSIONS];

// Inventory Analytics Metrics
export type InventoryAnalyticsMetric =
  (typeof INVENTORY_ANALYTICS.METRICS)[keyof typeof INVENTORY_ANALYTICS.METRICS];

// Inventory Analytics Segments
export type InventoryAnalyticsSegment =
  (typeof INVENTORY_ANALYTICS.SEGMENTS)[keyof typeof INVENTORY_ANALYTICS.SEGMENTS];

// Inventory Analytics Cohorts
export type InventoryAnalyticsCohort =
  (typeof INVENTORY_ANALYTICS.COHORTS)[keyof typeof INVENTORY_ANALYTICS.COHORTS];

// Inventory Analytics Granularity
export type InventoryAnalyticsGranularity =
  (typeof INVENTORY_ANALYTICS.GRANULARITY)[keyof typeof INVENTORY_ANALYTICS.GRANULARITY];

// Inventory Analytics Status Labels
export function getInventoryAnalyticsStatusLabel(status: InventoryAnalyticsStatus): string {
  const labels: Record<InventoryAnalyticsStatus, string> = {
    [INVENTORY_ANALYTICS.STATUS.TRACKING]: 'Tracking',
    [INVENTORY_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [INVENTORY_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [INVENTORY_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [INVENTORY_ANALYTICS.STATUS.FAILED]: 'Failed',
    [INVENTORY_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [INVENTORY_ANALYTICS.STATUS.STOPPED]: 'Stopped',
    [INVENTORY_ANALYTICS.STATUS.UPDATING]: 'Updating',
    [INVENTORY_ANALYTICS.STATUS.REFRESHING]: 'Refreshing',
  };
  return labels[status] || 'Unknown';
}

// Inventory Analytics Event Labels
export function getInventoryAnalyticsEventLabel(event: InventoryAnalyticsEvent): string {
  const labels: Record<InventoryAnalyticsEvent, string> = {
    [INVENTORY_ANALYTICS.EVENTS.STOCK_ADDED]: 'Stock Added',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_REMOVED]: 'Stock Removed',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_UPDATED]: 'Stock Updated',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_TRANSFERRED]: 'Stock Transferred',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_ADJUSTED]: 'Stock Adjusted',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_LOW]: 'Stock Low',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_CRITICAL]: 'Stock Critical',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_OUT]: 'Stock Out',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_RESTOCKED]: 'Stock Restocked',
    [INVENTORY_ANALYTICS.EVENTS.STOCK_OVERSTOCKED]: 'Stock Overstocked',
    [INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_RECEIVED]: 'Warehouse Received',
    [INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_SHIPPED]: 'Warehouse Shipped',
    [INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_TRANSFERRED]: 'Warehouse Transferred',
    [INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_CAPACITY_REACHED]: 'Warehouse Capacity Reached',
    [INVENTORY_ANALYTICS.EVENTS.PRODUCT_ADDED]: 'Product Added',
    [INVENTORY_ANALYTICS.EVENTS.PRODUCT_REMOVED]: 'Product Removed',
    [INVENTORY_ANALYTICS.EVENTS.PRODUCT_UPDATED]: 'Product Updated',
    [INVENTORY_ANALYTICS.EVENTS.PRODUCT_CATEGORY_CHANGED]: 'Product Category Changed',
    [INVENTORY_ANALYTICS.EVENTS.SUPPLIER_ORDERED]: 'Supplier Ordered',
    [INVENTORY_ANALYTICS.EVENTS.SUPPLIER_RECEIVED]: 'Supplier Received',
    [INVENTORY_ANALYTICS.EVENTS.SUPPLIER_DELAYED]: 'Supplier Delayed',
    [INVENTORY_ANALYTICS.EVENTS.DEMAND_INCREASED]: 'Demand Increased',
    [INVENTORY_ANALYTICS.EVENTS.DEMAND_DECREASED]: 'Demand Decreased',
    [INVENTORY_ANALYTICS.EVENTS.DEMAND_PATTERN_CHANGED]: 'Demand Pattern Changed',
    [INVENTORY_ANALYTICS.EVENTS.ORDER_FULFILLED]: 'Order Fulfilled',
    [INVENTORY_ANALYTICS.EVENTS.ORDER_PARTIALLY_FULFILLED]: 'Order Partially Fulfilled',
    [INVENTORY_ANALYTICS.EVENTS.ORDER_CANCELLED]: 'Order Cancelled',
    [INVENTORY_ANALYTICS.EVENTS.QUALITY_CHECK_PASSED]: 'Quality Check Passed',
    [INVENTORY_ANALYTICS.EVENTS.QUALITY_CHECK_FAILED]: 'Quality Check Failed',
    [INVENTORY_ANALYTICS.EVENTS.DAMAGED_REPORTED]: 'Damaged Reported',
    [INVENTORY_ANALYTICS.EVENTS.DAMAGED_REMOVED]: 'Damaged Removed',
    [INVENTORY_ANALYTICS.EVENTS.COST_INCREASED]: 'Cost Increased',
    [INVENTORY_ANALYTICS.EVENTS.COST_DECREASED]: 'Cost Decreased',
    [INVENTORY_ANALYTICS.EVENTS.HOLDING_COST_UPDATED]: 'Holding Cost Updated',
  };
  return labels[event] || 'Unknown';
}

// Inventory Analytics Dimension Labels
export function getInventoryAnalyticsDimensionLabel(
  dimension: InventoryAnalyticsDimension
): string {
  const labels: Record<InventoryAnalyticsDimension, string> = {
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_ID]: 'Product ID',
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_NAME]: 'Product Name',
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_SKU]: 'Product SKU',
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_CATEGORY]: 'Product Category',
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_SUB_CATEGORY]: 'Product Sub-Category',
    [INVENTORY_ANALYTICS.DIMENSIONS.PRODUCT_BRAND]: 'Product Brand',
    [INVENTORY_ANALYTICS.DIMENSIONS.STOCK_LEVEL]: 'Stock Level',
    [INVENTORY_ANALYTICS.DIMENSIONS.STOCK_STATUS]: 'Stock Status',
    [INVENTORY_ANALYTICS.DIMENSIONS.STOCK_LOCATION]: 'Stock Location',
    [INVENTORY_ANALYTICS.DIMENSIONS.STOCK_TYPE]: 'Stock Type',
    [INVENTORY_ANALYTICS.DIMENSIONS.WAREHOUSE_ID]: 'Warehouse ID',
    [INVENTORY_ANALYTICS.DIMENSIONS.WAREHOUSE_NAME]: 'Warehouse Name',
    [INVENTORY_ANALYTICS.DIMENSIONS.WAREHOUSE_TYPE]: 'Warehouse Type',
    [INVENTORY_ANALYTICS.DIMENSIONS.WAREHOUSE_LOCATION]: 'Warehouse Location',
    [INVENTORY_ANALYTICS.DIMENSIONS.SUPPLIER_ID]: 'Supplier ID',
    [INVENTORY_ANALYTICS.DIMENSIONS.SUPPLIER_NAME]: 'Supplier Name',
    [INVENTORY_ANALYTICS.DIMENSIONS.SUPPLIER_TYPE]: 'Supplier Type',
    [INVENTORY_ANALYTICS.DIMENSIONS.SUPPLIER_LOCATION]: 'Supplier Location',
    [INVENTORY_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [INVENTORY_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [INVENTORY_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [INVENTORY_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [INVENTORY_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [INVENTORY_ANALYTICS.DIMENSIONS.UNIT_COST]: 'Unit Cost',
    [INVENTORY_ANALYTICS.DIMENSIONS.TOTAL_COST]: 'Total Cost',
    [INVENTORY_ANALYTICS.DIMENSIONS.HOLDING_COST]: 'Holding Cost',
    [INVENTORY_ANALYTICS.DIMENSIONS.ORDERING_COST]: 'Ordering Cost',
    [INVENTORY_ANALYTICS.DIMENSIONS.DEMAND_LEVEL]: 'Demand Level',
    [INVENTORY_ANALYTICS.DIMENSIONS.DEMAND_PATTERN]: 'Demand Pattern',
    [INVENTORY_ANALYTICS.DIMENSIONS.DEMAND_SEASONALITY]: 'Demand Seasonality',
    [INVENTORY_ANALYTICS.DIMENSIONS.FULFILLMENT_RATE]: 'Fulfillment Rate',
    [INVENTORY_ANALYTICS.DIMENSIONS.PICKING_TIME]: 'Picking Time',
    [INVENTORY_ANALYTICS.DIMENSIONS.PACKING_TIME]: 'Packing Time',
    [INVENTORY_ANALYTICS.DIMENSIONS.SHIPPING_TIME]: 'Shipping Time',
  };
  return labels[dimension] || 'Unknown';
}

// Inventory Analytics Segment Labels
export function getInventoryAnalyticsSegmentLabel(segment: InventoryAnalyticsSegment): string {
  const labels: Record<InventoryAnalyticsSegment, string> = {
    [INVENTORY_ANALYTICS.SEGMENTS.HIGH_STOCK]: 'High Stock',
    [INVENTORY_ANALYTICS.SEGMENTS.MEDIUM_STOCK]: 'Medium Stock',
    [INVENTORY_ANALYTICS.SEGMENTS.LOW_STOCK]: 'Low Stock',
    [INVENTORY_ANALYTICS.SEGMENTS.CRITICAL_STOCK]: 'Critical Stock',
    [INVENTORY_ANALYTICS.SEGMENTS.OUT_OF_STOCK]: 'Out of Stock',
    [INVENTORY_ANALYTICS.SEGMENTS.FAST_MOVING]: 'Fast Moving',
    [INVENTORY_ANALYTICS.SEGMENTS.SLOW_MOVING]: 'Slow Moving',
    [INVENTORY_ANALYTICS.SEGMENTS.NON_MOVING]: 'Non-Moving',
    [INVENTORY_ANALYTICS.SEGMENTS.SEASONAL]: 'Seasonal',
    [INVENTORY_ANALYTICS.SEGMENTS.PERISHABLE]: 'Perishable',
    [INVENTORY_ANALYTICS.SEGMENTS.RELIABLE]: 'Reliable',
    [INVENTORY_ANALYTICS.SEGMENTS.UNRELIABLE]: 'Unreliable',
    [INVENTORY_ANALYTICS.SEGMENTS.FAST_DELIVERY]: 'Fast Delivery',
    [INVENTORY_ANALYTICS.SEGMENTS.SLOW_DELIVERY]: 'Slow Delivery',
    [INVENTORY_ANALYTICS.SEGMENTS.HIGH_UTILIZATION]: 'High Utilization',
    [INVENTORY_ANALYTICS.SEGMENTS.MEDIUM_UTILIZATION]: 'Medium Utilization',
    [INVENTORY_ANALYTICS.SEGMENTS.LOW_UTILIZATION]: 'Low Utilization',
    [INVENTORY_ANALYTICS.SEGMENTS.HIGH_COST]: 'High Cost',
    [INVENTORY_ANALYTICS.SEGMENTS.MEDIUM_COST]: 'Medium Cost',
    [INVENTORY_ANALYTICS.SEGMENTS.LOW_COST]: 'Low Cost',
    [INVENTORY_ANALYTICS.SEGMENTS.HIGH_DEMAND]: 'High Demand',
    [INVENTORY_ANALYTICS.SEGMENTS.MEDIUM_DEMAND]: 'Medium Demand',
    [INVENTORY_ANALYTICS.SEGMENTS.LOW_DEMAND]: 'Low Demand',
  };
  return labels[segment] || 'Unknown';
}

// Inventory Analytics Cohort Labels
export function getInventoryAnalyticsCohortLabel(cohort: InventoryAnalyticsCohort): string {
  const labels: Record<InventoryAnalyticsCohort, string> = {
    [INVENTORY_ANALYTICS.COHORTS.PRODUCT_CATEGORY]: 'Product Category',
    [INVENTORY_ANALYTICS.COHORTS.WAREHOUSE]: 'Warehouse',
    [INVENTORY_ANALYTICS.COHORTS.SUPPLIER]: 'Supplier',
    [INVENTORY_ANALYTICS.COHORTS.STOCK_STATUS]: 'Stock Status',
    [INVENTORY_ANALYTICS.COHORTS.DEMAND_PATTERN]: 'Demand Pattern',
  };
  return labels[cohort] || 'Unknown';
}

// Inventory Analytics Granularity Labels
export function getInventoryAnalyticsGranularityLabel(
  granularity: InventoryAnalyticsGranularity
): string {
  const labels: Record<InventoryAnalyticsGranularity, string> = {
    [INVENTORY_ANALYTICS.GRANULARITY.DAILY]: 'Daily',
    [INVENTORY_ANALYTICS.GRANULARITY.WEEKLY]: 'Weekly',
    [INVENTORY_ANALYTICS.GRANULARITY.MONTHLY]: 'Monthly',
    [INVENTORY_ANALYTICS.GRANULARITY.QUARTERLY]: 'Quarterly',
    [INVENTORY_ANALYTICS.GRANULARITY.YEARLY]: 'Yearly',
  };
  return labels[granularity] || 'Unknown';
}

// Check if inventory analytics is active
export function isInventoryAnalyticsActive(status: InventoryAnalyticsStatus): boolean {
  const activeStatuses: InventoryAnalyticsStatus[] = [
    INVENTORY_ANALYTICS.STATUS.TRACKING,
    INVENTORY_ANALYTICS.STATUS.PROCESSING,
    INVENTORY_ANALYTICS.STATUS.ANALYZING,
    INVENTORY_ANALYTICS.STATUS.UPDATING,
    INVENTORY_ANALYTICS.STATUS.REFRESHING,
  ];
  return activeStatuses.includes(status);
}

// Check if inventory analytics is completed
export function isInventoryAnalyticsCompleted(status: InventoryAnalyticsStatus): boolean {
  return status === INVENTORY_ANALYTICS.STATUS.COMPLETED;
}

// Check if inventory analytics has failed
export function isInventoryAnalyticsFailed(status: InventoryAnalyticsStatus): boolean {
  return status === INVENTORY_ANALYTICS.STATUS.FAILED;
}

// Check if event is stock event
export function isInventoryAnalyticsStockEvent(event: InventoryAnalyticsEvent): boolean {
  const stockEvents: InventoryAnalyticsEvent[] = [
    INVENTORY_ANALYTICS.EVENTS.STOCK_ADDED,
    INVENTORY_ANALYTICS.EVENTS.STOCK_REMOVED,
    INVENTORY_ANALYTICS.EVENTS.STOCK_UPDATED,
    INVENTORY_ANALYTICS.EVENTS.STOCK_TRANSFERRED,
    INVENTORY_ANALYTICS.EVENTS.STOCK_ADJUSTED,
  ];
  return stockEvents.includes(event);
}

// Check if event is stock level event
export function isInventoryAnalyticsStockLevelEvent(event: InventoryAnalyticsEvent): boolean {
  const stockLevelEvents: InventoryAnalyticsEvent[] = [
    INVENTORY_ANALYTICS.EVENTS.STOCK_LOW,
    INVENTORY_ANALYTICS.EVENTS.STOCK_CRITICAL,
    INVENTORY_ANALYTICS.EVENTS.STOCK_OUT,
    INVENTORY_ANALYTICS.EVENTS.STOCK_RESTOCKED,
    INVENTORY_ANALYTICS.EVENTS.STOCK_OVERSTOCKED,
  ];
  return stockLevelEvents.includes(event);
}

// Check if event is warehouse event
export function isInventoryAnalyticsWarehouseEvent(event: InventoryAnalyticsEvent): boolean {
  const warehouseEvents: InventoryAnalyticsEvent[] = [
    INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_RECEIVED,
    INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_SHIPPED,
    INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_TRANSFERRED,
    INVENTORY_ANALYTICS.EVENTS.WAREHOUSE_CAPACITY_REACHED,
  ];
  return warehouseEvents.includes(event);
}
