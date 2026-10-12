import type { Provider } from '@nestjs/common';
/**
 * KPI Sagas Barrel
 */
import { KpiMonitoringSaga } from '../../../application/sagas/kpi-monitoring.saga.js';

export const KPI_SAGAS = [KpiMonitoringSaga] as Provider[];

export { KpiMonitoringSaga };
