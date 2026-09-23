import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { MarketingReportServiceInterface } from '../interfaces/marketing-report.service.interface';
import type { MarketingReportRepository } from '../../../domain/repositories/marketing-report.repository.interface';
import { MarketingReportEntity } from '../../../domain/entities/marketing-report.entity';
import { ReportTypeVO } from '../../../domain/value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../../../domain/value-objects/primitives/report-format.vo';
import type { GenerateReportRequestDTO } from '../../dtos/requests/report/generate-report.dto';
import type { MarketingReportResponseDTO } from '../../dtos/responses/marketing-report-response.dto';

@Injectable()
export class MarketingReportService
  extends BaseService<MarketingReportEntity, string>
  implements MarketingReportServiceInterface
{
  readonly name = 'MarketingReportService';

  constructor(private readonly repo: MarketingReportRepository) {
    super();
  }

  async generate(input: GenerateReportRequestDTO): Promise<MarketingReportResponseDTO> {
    const entity = MarketingReportEntity.create({
      name: input.name,
      type: ReportTypeVO.create(input.type),
      format: ReportFormatVO.create(input.format ?? 'json'),
      generatedAt: new Date(),
      data: null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async findByType(type: string): Promise<readonly MarketingReportResponseDTO[]> {
    const entities = await this.repo.findByType(ReportTypeVO.create(type));
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: MarketingReportEntity): MarketingReportResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name,
      type: entity.type.value,
      format: entity.format.value,
      generatedAt: entity.generatedAt.toISOString(),
      data: entity.data ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as MarketingReportResponseDTO;
  }
}
