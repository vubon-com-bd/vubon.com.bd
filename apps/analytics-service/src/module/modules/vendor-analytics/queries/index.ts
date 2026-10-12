/**
 * Vendor Analytics Query Handlers Barrel
 */
import { GetVendorAnalyticsHandler } from '../../../application/queries/analytics/get-vendor-analytics.handler.js';

export const VENDOR_ANALYTICS_QUERY_HANDLERS = [
  GetVendorAnalyticsHandler,
] as const;

export { GetVendorAnalyticsHandler };
