/**
 * Dashboard Query Handlers Barrel
 */
import { GetDashboardHandler } from '../../../application/queries/dashboard/get-dashboard.handler.js';
import { ListDashboardsHandler } from '../../../application/queries/dashboard/list-dashboards.handler.js';
import { GetDashboardDataHandler } from '../../../application/queries/dashboard/get-dashboard-data.handler.js';

export const DASHBOARD_QUERY_HANDLERS = [
  GetDashboardHandler,
  ListDashboardsHandler,
  GetDashboardDataHandler,
] as const;

export { GetDashboardHandler, ListDashboardsHandler, GetDashboardDataHandler };
