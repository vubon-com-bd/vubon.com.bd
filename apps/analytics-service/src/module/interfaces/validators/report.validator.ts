/**
 * Report Validator (interface layer)
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';

export const CreateReportSchema = z.object({
  name: z.string().min(3).max(200),
  type: z.string().min(2).max(50),
  format: z.enum(['json', 'csv', 'xlsx', 'pdf', 'html']),
  frequency: z.enum(['once', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  description: z.string().max(500).optional(),
});

export const GenerateReportSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  filters: z.record(z.string(), z.unknown()).optional(),
  force: z.boolean().optional(),
});

export const ScheduleReportSchema = z.object({
  frequency: z.enum(['hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  startAt: z.string().datetime().optional(),
  timezone: z.string().max(50).optional(),
  recipients: z.array(z.string().email()).max(50).optional(),
});

export const ExportReportSchema = z.object({
  format: z.enum(['json', 'csv', 'tsv', 'xlsx']),
  includeTotals: z.boolean().optional(),
  maskPii: z.boolean().optional(),
  compress: z.boolean().optional(),
  rowLimit: z.number().int().positive().max(100000).optional(),
});

function throwValidationError(error: z.ZodError, defaultMsg: string): never {
  const first = error.errors[0];
  throw new BadRequestException({
    statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    code: ERROR_CODE.VAL_REQUIRED,
    message: first?.message ?? defaultMsg,
    field: first?.path.join('.'),
  });
}

@Injectable()
export class ReportValidator {
  validateCreate(input: unknown): z.infer<typeof CreateReportSchema> {
    const result = CreateReportSchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid report payload');
    return result.data;
  }

  validateGenerate(input: unknown): z.infer<typeof GenerateReportSchema> {
    const result = GenerateReportSchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid generate payload');
    return result.data;
  }

  validateSchedule(input: unknown): z.infer<typeof ScheduleReportSchema> {
    const result = ScheduleReportSchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid schedule payload');
    return result.data;
  }

  validateExport(input: unknown): z.infer<typeof ExportReportSchema> {
    const result = ExportReportSchema.safeParse(input);
    if (!result.success) throwValidationError(result.error, 'Invalid export payload');
    return result.data;
  }
}
