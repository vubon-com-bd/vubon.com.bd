import type { Provider } from '@nestjs/common';
/**
 * KPI Command Handlers Barrel
 */
import { CreateKpiHandler } from '../../../application/commands/kpi/create-kpi.handler.js';
import { UpdateKpiHandler } from '../../../application/commands/kpi/update-kpi.handler.js';
import { EvaluateKpiHandler } from '../../../application/commands/kpi/evaluate-kpi.handler.js';

export const KPI_COMMAND_HANDLERS = [
  CreateKpiHandler,
  UpdateKpiHandler,
  EvaluateKpiHandler,
] as Provider[];

export { CreateKpiHandler, UpdateKpiHandler, EvaluateKpiHandler };
