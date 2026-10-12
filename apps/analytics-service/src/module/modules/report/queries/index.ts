/**
 * Report Query Handlers Barrel
 */
import { GetReportHandler } from '../../../application/queries/report/get-report.handler.js';
import { ListReportsHandler } from '../../../application/queries/report/list-reports.handler.js';
import { ListScheduledReportsHandler } from '../../../application/queries/report/list-scheduled-reports.handler.js';

export const REPORT_QUERY_HANDLERS = [
  GetReportHandler,
  ListReportsHandler,
  ListScheduledReportsHandler,
] as const;

export { GetReportHandler, ListReportsHandler, ListScheduledReportsHandler };
