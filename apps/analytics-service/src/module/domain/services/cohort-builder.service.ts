import { CohortEntity } from '../entities/cohort.entity';
import { CohortNameVO } from '../value-objects/primitives/cohort-name.vo';
import { CohortPeriodVO } from '../value-objects/primitives/cohort-period.vo';

export interface UserActivityRecord {
  readonly userId: string;
  readonly occurredAt: Date;
}

export class CohortBuilderService {
  /**
   * Build cohorts from user activity records grouped by period bucket.
   */
  build(
    records: readonly UserActivityRecord[],
    name: string,
    period: string,
  ): readonly CohortEntity[] {
    const periodVO = CohortPeriodVO.create(period);
    const nameVO = CohortNameVO.create(name);
    const buckets = new Map<string, { start: Date; end: Date; users: Set<string> }>();

    for (const r of records) {
      const key = periodVO.bucketFor(r.occurredAt);
      const existing = buckets.get(key);
      if (existing) {
        existing.users.add(r.userId);
        if (r.occurredAt < existing.start) existing.start = r.occurredAt;
        if (r.occurredAt > existing.end) existing.end = r.occurredAt;
      } else {
        buckets.set(key, {
          start: r.occurredAt,
          end: r.occurredAt,
          users: new Set([r.userId]),
        });
      }
    }

    return Array.from(buckets.values()).map((b) =>
      CohortEntity.create({
        name: nameVO,
        period: periodVO,
        startDate: b.start,
        endDate: b.end,
        userIds: Array.from(b.users),
      }),
    );
  }
}
