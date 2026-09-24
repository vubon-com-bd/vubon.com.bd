import {
  CreateKpiSchema,
  UpdateKpiSchema,
  EvaluateKpiSchema,
} from '../../application/dtos/requests/kpi';

export class KpiValidator {
  static validateCreate(input: unknown) {
    return CreateKpiSchema.parse(input);
  }

  static validateUpdate(input: unknown) {
    return UpdateKpiSchema.parse(input);
  }

  static validateEvaluate(input: unknown) {
    return EvaluateKpiSchema.parse(input);
  }
}
