/**
 * Report Validator
 */
import { CreateReportSchema } from '../dtos/requests/report/create-report.dto.js';
import { ScheduleReportSchema } from '../dtos/requests/report/schedule-report.dto.js';
import { ExportReportSchema } from '../dtos/requests/report/export-report.dto.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export class ReportValidator {
  static validateCreate(input: unknown): void {
    const result = CreateReportSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid report');
    }
  }

  static validateSchedule(input: unknown): void {
    const result = ScheduleReportSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid schedule');
    }
  }

  static validateExport(input: unknown): void {
    const result = ExportReportSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid export');
    }
  }
}
