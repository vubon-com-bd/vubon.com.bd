/**
 * Report Command Handlers Barrel
 */
import { CreateReportHandler } from '../../../application/commands/report/create-report.handler.js';
import { GenerateReportHandler } from '../../../application/commands/report/generate-report.handler.js';
import { ScheduleReportHandler } from '../../../application/commands/report/schedule-report.handler.js';
import { ExportReportHandler } from '../../../application/commands/report/export-report.handler.js';

export const REPORT_COMMAND_HANDLERS = [
  CreateReportHandler,
  GenerateReportHandler,
  ScheduleReportHandler,
  ExportReportHandler,
] as const;

export {
  CreateReportHandler,
  GenerateReportHandler,
  ScheduleReportHandler,
  ExportReportHandler,
};
