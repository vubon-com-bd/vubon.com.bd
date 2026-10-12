/**
 * Financial Analytics Query Handlers Barrel
 */
import { GetFinancialAnalyticsHandler } from '../../../application/queries/analytics/get-financial-analytics.handler.js';

export const FINANCIAL_ANALYTICS_QUERY_HANDLERS = [
  GetFinancialAnalyticsHandler,
] as const;

export { GetFinancialAnalyticsHandler };
