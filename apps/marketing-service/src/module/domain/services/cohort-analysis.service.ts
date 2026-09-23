export interface CohortDataPoint {
  readonly cohort: string;
  readonly value: number;
}

export class CohortAnalysisService {
  averageByCohort(points: readonly CohortDataPoint[]): Readonly<Record<string, number>> {
    const buckets: Record<string, { sum: number; count: number }> = {};
    for (const p of points) {
      const b = buckets[p.cohort] ?? { sum: 0, count: 0 };
      b.sum += p.value;
      b.count += 1;
      buckets[p.cohort] = b;
    }
    const result: Record<string, number> = {};
    for (const [k, v] of Object.entries(buckets)) {
      result[k] = v.sum / v.count;
    }
    return result;
  }
}
