import type { Provider } from '@nestjs/common';
/**
 * KPI Query Handlers Barrel
 */
import { ListKpisHandler } from '../../../application/queries/kpi/list-kpis.handler.js';
import { GetKpiHandler } from '../../../application/queries/kpi/get-kpi.handler.js';
import { GetKpiResultsHandler } from '../../../application/queries/kpi/get-kpi-results.handler.js';

export const KPI_QUERY_HANDLERS = [
  ListKpisHandler,
  GetKpiHandler,
  GetKpiResultsHandler,
] as Provider[];

export { ListKpisHandler, GetKpiHandler, GetKpiResultsHandler };
