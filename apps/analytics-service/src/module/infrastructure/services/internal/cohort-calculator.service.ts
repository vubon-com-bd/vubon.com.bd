import { Injectable } from '@nestjs/common';

export interface CohortRecord {
  readonly userId: string;
  readonly firstSeenAt: Date;
  readonly returnedAt: readonly Date[];
}

export interface CohortResult {
  readonly cohortBucket: string;
  readonly size: number;
  readonly retainedByDay: readonly number[];
  readonly retentionRateByDay: readonly number[];
}

@Injectable()
export class CohortCalculatorService {
  /**
   * Calculate retention curve for a cohort of users.
   */
  calculate(
    bucketKey: string,
    records: readonly CohortRecord[],
    periods: number,
  ): CohortResult {
    const size = records.length;
    const retained = new Array<number>(periods + 1).fill(0);
    retained[0] = size;

    for (let day = 1; day <= periods; day++) {
      let active = 0;
      for (const r of records) {
        const hasReturnOnDay = r.returnedAt.some((d) => {
          const diffDays = Math.floor(
            (d.getTime() - r.firstSeenAt.getTime()) / (24 * 60 * 60 * 1000),
          );
          return diffDays === day;
        });
        if (hasReturnOnDay) active++;
      }
      retained[day] = active;
    }

    const rates = retained.map((r) => (size === 0 ? 0 : (r / size) * 100));

    return {
      cohortBucket: bucketKey,
      size,
      retainedByDay: retained,
      retentionRateByDay: rates,
    };
  }

  /**
   * Compute retention curve from bucketed users.
   */
  retentionCurve(
    initialUsers: readonly string[],
    activeUsersByDay: readonly (readonly string[])[],
  ): readonly number[] {
    const initial = new Set(initialUsers);
    const size = initial.size;
    return activeUsersByDay.map((active) => {
      const overlap = active.filter((u) => initial.has(u)).length;
      return size === 0 ? 0 : (overlap / size) * 100;
    });
  }
}
