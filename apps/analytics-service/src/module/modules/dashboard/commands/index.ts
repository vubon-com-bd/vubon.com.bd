/**
 * Dashboard Command Handlers Barrel
 */
import { CreateDashboardHandler } from '../../../application/commands/dashboard/create-dashboard.handler.js';
import { UpdateDashboardHandler } from '../../../application/commands/dashboard/update-dashboard.handler.js';

export const DASHBOARD_COMMAND_HANDLERS = [
  CreateDashboardHandler,
  UpdateDashboardHandler,
] as const;

export { CreateDashboardHandler, UpdateDashboardHandler };
