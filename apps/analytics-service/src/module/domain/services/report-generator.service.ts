import { ReportEntity } from '../entities/report.entity';
import { ReportTypeVO } from '../value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../value-objects/primitives/report-format.vo';
import { ReportFrequencyVO } from '../value-objects/primitives/report-frequency.vo';

export class ReportGeneratorService {
  /**
   * Create a new report in PENDING state.
   */
  generate(input: {
    type: string;
    format: string;
    ownerId: string;
    frequency?: string | null;
  }): ReportEntity {
    const type = ReportTypeVO.create(input.type);
    const format = ReportFormatVO.create(input.format);
    const frequency = input.frequency
      ? ReportFrequencyVO.create(input.frequency)
      : null;

    return ReportEntity.create({
      type,
      format,
      ownerId: input.ownerId,
      frequency,
    });
  }
}
