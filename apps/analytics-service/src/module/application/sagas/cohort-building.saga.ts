/**
 * Cohort Building Saga
 * @module analytics-service/application/sagas
 */
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface CohortBuildingContext {
  cohortId: string;
  userIds: readonly string[];
  persisted: boolean;
}

export class CohortBuildingSaga extends BaseSaga<CohortBuildingContext> {
  readonly name = 'cohort-building';

  async execute(input: {
    cohortId: string;
    fromDate: string;
    toDate: string;
  }): Promise<void> {
    this.setContext({
      cohortId: input.cohortId,
      userIds: [],
      persisted: false,
    });

    const ctx = this.getContext();
    // Step 1: Load events in range
    // Step 2: Extract unique users
    // Step 3: Persist cohort membership
    ctx.persisted = true;
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.persisted) {
      // await cohortRepo.delete(ctx.cohortId);
    }
  }
}
