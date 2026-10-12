import type { Provider } from '@nestjs/common';
/**
 * Metric Command Handlers Barrel
 * @module analytics-service/modules/metric/commands
 *
 * Metric module currently has no write commands (metrics are recorded
 * automatically via events — the recording happens inside the metric
 * service triggered by event handlers, not user commands).
 */
export const METRIC_COMMAND_HANDLERS: readonly unknown[] = [] as Provider[];
