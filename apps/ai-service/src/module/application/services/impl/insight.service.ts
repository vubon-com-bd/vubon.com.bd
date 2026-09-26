import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { InsightServiceInterface } from '../interfaces/insight.service.interface';
import type { InsightRepository } from '../../../domain/repositories/insight.repository.interface';
import { InsightEntity } from '../../../domain/entities/insight.entity';
import { InsightIdVO } from '../../../domain/value-objects/primitives/insight-id.vo';
import { InsightStatusVO } from '../../../domain/value-objects/primitives/insight-status.vo';
import { InsightResultVO } from '../../../domain/value-objects/composites/insight-result.vo';
import { InsightGeneratorService } from '../../../domain/services/insight-generator.service';
import { AnomalyDetectionService } from '../../../domain/services/anomaly-detection.service';
import { InsightGenerationFailedError } from '../../errors/insight.errors';
import type { GenerateInsightRequestDTO } from '../../dtos/requests/insight/generate-insight.dto';
import type { DetectAnomalyRequestDTO } from '../../dtos/requests/insight/detect-anomaly.dto';
import type { InsightResponseDTO } from '../../dtos/responses/insight-response.dto';

@Injectable()
export class InsightService
  extends BaseService<InsightEntity, InsightIdVO>
  implements InsightServiceInterface
{
  readonly name = 'InsightService';

  constructor(
    private readonly insightRepo: InsightRepository,
    private readonly insightGenerator: InsightGeneratorService,
    private readonly anomalyDetector: AnomalyDetectionService,
  ) {
    super();
  }

  async generate(input: GenerateInsightRequestDTO): Promise<InsightResponseDTO> {
    const type = String(input.type);
    const priority = String(input.priority ?? 'medium');

    if (input.findings.length === 0) {
      throw new InsightGenerationFailedError('no findings provided');
    }

    const findings = input.findings.map((f) => ({
      label: f.label,
      value: f.value,
      unit: f.unit ?? null,
    }));

    const generated = this.insightGenerator.generate({
      target: input.target,
      type,
      findings,
      confidence: input.confidence,
    });

    const result = InsightResultVO.create({
      findings,
      confidence: generated.confidence,
      summary: generated.summary,
    });

    const entity = InsightEntity.create({
      type,
      priority,
      status: InsightStatusVO.create('active'),
      result,
      target: input.target,
    });

    await this.insightRepo.save(entity);

    return {
      id: entity.id.value,
      type: entity.type,
      priority: entity.priority,
      status: entity.status.value,
      target: entity.target,
      summary: entity.result.summary,
      confidence: entity.result.confidence.value,
      createdAt: entity.createdAt,
    } as unknown as InsightResponseDTO;
  }

  async detectAnomalies(
    input: DetectAnomalyRequestDTO,
  ): Promise<readonly { readonly timestamp: string; readonly value: number; readonly severity: string }[]> {
    const data = input.dataPoints.map((p) => ({
      timestamp: new Date(p.timestamp),
      value: p.value,
    }));

    const method = String(input.method ?? 'zscore');
    const anomalies =
      method === 'iqr'
        ? this.anomalyDetector.detectIqr(data)
        : this.anomalyDetector.detect(data, input.threshold);

    return anomalies.map((a) => ({
      timestamp: a.timestamp.toISOString(),
      value: a.value,
      severity: a.severity,
    }));
  }

  async dismiss(insightId: string): Promise<void> {
    const entity = await this.insightRepo.findById(InsightIdVO.create(insightId));
    if (!entity) return;
    await this.insightRepo.save(entity.dismiss());
  }
}
