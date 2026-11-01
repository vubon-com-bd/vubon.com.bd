import { GetPerformanceHandler } from '../../../application/queries/performance/get-performance.handler.js';
import { GetPerformanceStatsHandler } from '../../../application/queries/performance/get-performance-stats.handler.js';

export const VENDOR_PERFORMANCE_QUERY_HANDLERS = [
  GetPerformanceHandler,
  GetPerformanceStatsHandler,
] as const;

export { GetPerformanceHandler, GetPerformanceStatsHandler };
