import type { AiInsightPublic } from '@vubon/shared-types/ai';

export type InsightResponseDTO = AiInsightPublic;

export interface InsightFindingResponseDTO {
  readonly label: string;
  readonly value: number;
  readonly unit: string | null;
}
