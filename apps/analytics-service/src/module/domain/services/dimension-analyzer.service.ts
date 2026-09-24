import { DimensionValueEntity } from '../entities/dimension-value.entity';

export interface DimensionBreakdown {
  readonly value: string;
  readonly count: number;
  readonly percentage: number;
}

export class DimensionAnalyzerService {
  /**
   * Break down a total by dimension values (top-N).
   */
  breakdown(
    values: readonly DimensionValueEntity[],
    limit: number,
  ): readonly DimensionBreakdown[] {
    const total = values.reduce((a, v) => a + v.frequency, 0);
    if (total === 0) return [];

    return [...values]
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, limit)
      .map((v) => ({
        value: v.value.value,
        count: v.frequency,
        percentage: (v.frequency / total) * 100,
      }));
  }

  /**
   * Compute concentration (Herfindahl index, 0..1).
   */
  concentrationIndex(values: readonly DimensionValueEntity[]): number {
    const total = values.reduce((a, v) => a + v.frequency, 0);
    if (total === 0) return 0;
    return values.reduce((sum, v) => sum + Math.pow(v.frequency / total, 2), 0);
  }
}
