/**
 * Report Sagas Barrel
 */
import { ReportGenerationSaga } from '../../../application/sagas/report-generation.saga.js';
import { ReportSchedulingSaga } from '../../../application/sagas/report-scheduling.saga.js';

export const REPORT_SAGAS = [
  ReportGenerationSaga,
  ReportSchedulingSaga,
] as const;

export { ReportGenerationSaga, ReportSchedulingSaga };
