import {
  InsightResponseDTO,
  InsightFindingResponseDTO,
} from '../dtos/responses/insight.response.dto';

export interface AppInsightDTO {
  readonly id: string;
  readonly type: string;
  readonly priority: string;
  readonly status: string;
  readonly target: string;
  readonly summary: string;
  readonly confidence: number;
  readonly findings?: readonly {
    readonly label: string;
    readonly value: number;
    readonly unit: string | null;
  }[];
  readonly createdAt: string;
}

export class InsightControllerMapper {
  static toResponse(dto: AppInsightDTO): InsightResponseDTO {
    return {
      id: dto.id,
      type: dto.type,
      priority: dto.priority,
      status: dto.status,
      target: dto.target,
      summary: dto.summary,
      confidence: dto.confidence,
      findings: dto.findings?.map<InsightFindingResponseDTO>((f) => ({
        label: f.label,
        value: f.value,
        unit: f.unit,
      })),
      createdAt: dto.createdAt,
    };
  }
}
