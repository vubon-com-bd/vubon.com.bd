export const ROUTE_STATUS = {
  DRAFT: 'draft',
  PLANNED: 'planned',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  OPTIMIZING: 'optimizing',
  ARCHIVED: 'archived',
} as const;

export const ROUTE_TYPE = {
  DELIVERY: 'delivery',
  PICKUP: 'pickup',
  MIXED: 'mixed',
  RETURN: 'return',
  TRANSFER: 'transfer',
  LINE_HAUL: 'line_haul',
  LAST_MILE: 'last_mile',
  FIRST_MILE: 'first_mile',
} as const;

export const ROUTE_OPTIMIZATION = {
  SHORTEST_DISTANCE: 'shortest_distance',
  FASTEST_TIME: 'fastest_time',
  LOWEST_COST: 'lowest_cost',
  BALANCED: 'balanced',
  CAPACITY_AWARE: 'capacity_aware',
  TIME_WINDOW: 'time_window',
} as const;

export const ROUTE = {
  STATUS: ROUTE_STATUS,
  TYPE: ROUTE_TYPE,
  OPTIMIZATION: ROUTE_OPTIMIZATION,
  MAX_STOPS: 200,
  MAX_DISTANCE_KM: 2000,
  MAX_DURATION_HOURS: 12,
  MAX_ACTIVE_ROUTES: 5000,
  OPTIMIZATION_TIMEOUT_SECONDS: 30,
  TRAFFIC_AWARE: true,
  WEATHER_AWARE: false,
  TIME_WINDOW_ENABLED: true,
  AUTO_OPTIMIZE: true,
  RECALCULATE_ON_DELAY: true,
} as const;

export type RouteStatusType = (typeof ROUTE_STATUS)[keyof typeof ROUTE_STATUS];
export type RouteTypeType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];
export type RouteOptimizationType = (typeof ROUTE_OPTIMIZATION)[keyof typeof ROUTE_OPTIMIZATION];
