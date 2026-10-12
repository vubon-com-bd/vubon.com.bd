/**
 * KPI Validator
 */
import { CreateKpiSchema } from '../dtos/requests/kpi/create-kpi.dto.js';
import { UpdateKpiSchema } from '../dtos/requests/kpi/update-kpi.dto.js';
import { EvaluateKpiSchema } from '../dtos/requests/kpi/evaluate-kpi.dto.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export class KpiValidator {
  static validateCreate(input: unknown): void {
    const result = CreateKpiSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid KPI');
    }
  }

  static validateUpdate(input: unknown): void {
    const result = UpdateKpiSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid update');
    }
  }

  static validateEvaluate(input: unknown): void {
    const result = EvaluateKpiSchema.safeParse(input);
    if (!result.success) {
      throw new ApplicationValidationError(result.error.errors[0]?.message ?? 'Invalid evaluate');
    }
  }
}
