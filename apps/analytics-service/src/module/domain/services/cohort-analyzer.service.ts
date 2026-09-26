import { CohortEntity } from '../entities/cohort.entity';
import { CohortAnalysisVO } from '../value-objects/composites/cohort-analysis.vo';

export interface UserReturnRecord {
  readonly userId: string;
  readonly returnedAt: Date;
}

export interface AdvancedCohortResult {
  readonly analysis: CohortAnalysisVO;
  readonly rollingRetention: readonly number[];
  readonly weekOverWeek: readonly number[];
  readonly powerUsers: readonly string[];
}

export class CohortAnalyzerService {
  /**
   * Analyze cohort retention over N periods.
   */
  analyze(
    cohort: CohortEntity,
    returns: readonly UserReturnRecord[],
    periods: number,
  ): CohortAnalysisVO {
    const users = new Set(cohort.userIds);
    const retained: number[] = [cohort.size];

    for (let p = 1; p <= periods; p++) {
      const periodEnd = new Date(
        cohort.startDate.getTime() + p * cohort.period.days * 24 * 60 * 60 * 1000,
      );
      const active = new Set<string>();
      for (const r of returns) {
        if (
          users.has(r.userId) &&
          r.returnedAt >= cohort.startDate &&
          r.returnedAt <= periodEnd
        ) {
          active.add(r.userId);
        }
      }
      retained.push(active.size);
    }

    return CohortAnalysisVO.create({
      cohortId: cohort.id,
      initialSize: cohort.size,
      retainedSizes: retained,
    });
  }

  /**
   * Advanced analysis — rolling retention, WoW, power users.
   */
  analyzeAdvanced(
    cohort: CohortEntity,
    returns: readonly UserReturnRecord[],
    periods: number,
    powerUserMinReturns = 3,
  ): AdvancedCohortResult {
    const analysis = this.analyze(cohort, returns, periods);
    const users = new Set(cohort.userIds);

    // Count returns per user
    const returnsByUser = new Map<string, number>();
    for (const r of returns) {
      if (!users.has(r.userId)) continue;
      returnsByUser.set(r.userId, (returnsByUser.get(r.userId) ?? 0) + 1);
    }

    // Power users = returned >= threshold
    const powerUsers: string[] = [];
    for (const [userId, count] of returnsByUser.entries()) {
      if (count >= powerUserMinReturns) powerUsers.push(userId);
    }

    // Rolling retention (cumulative active)
    const rollingRetention: number[] = [];
    const activeEver = new Set<string>();
    for (let p = 0; p <= periods; p++) {
      const periodEnd = new Date(
        cohort.startDate.getTime() + (p + 1) * cohort.period.days * 24 * 60 * 60 * 1000,
      );
      for (const r of returns) {
        if (
          users.has(r.userId) &&
          r.returnedAt >= cohort.startDate &&
          r.returnedAt <= periodEnd
        ) {
          activeEver.add(r.userId);
        }
      }
      const rate = cohort.size === 0 ? 0 : (activeEver.size / cohort.size) * 100;
      rollingRetention.push(rate);
    }

    // WoW change in retention
    const weekOverWeek: number[] = [0];
    const rates = analysis.retentionRates;
    for (let i = 1; i < rates.length; i++) {
      const prev = rates[i - 1]!;
      const curr = rates[i]!;
      weekOverWeek.push(prev === 0 ? 0 : ((curr - prev) / prev) * 100);
    }

    return { analysis, rollingRetention, weekOverWeek, powerUsers };
  }
}
