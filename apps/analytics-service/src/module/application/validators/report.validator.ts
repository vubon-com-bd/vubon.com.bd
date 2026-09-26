import {
  CreateReportSchema,
  GenerateReportSchema,
  ScheduleReportSchema,
  ExportReportSchema,
} from '../dtos/requests/report';

export class ReportValidator {
  static validateCreate(input: unknown) {
    return CreateReportSchema.parse(input);
  }

  static validateGenerate(input: unknown) {
    return GenerateReportSchema.parse(input);
  }

  static validateSchedule(input: unknown) {
    return ScheduleReportSchema.parse(input);
  }

  static validateExport(input: unknown) {
    return ExportReportSchema.parse(input);
  }
}
