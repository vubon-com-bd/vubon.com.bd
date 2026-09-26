import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface DashboardCreationContext {
  readonly existingDashboards: number;
  readonly ownerId: string;
}

export class CanCreateDashboardSpecification extends Specification<DashboardCreationContext> {
  constructor(private readonly maxDashboards = 10) {
    super();
  }

  isSatisfiedBy(candidate: DashboardCreationContext): boolean {
    if (candidate.existingDashboards >= this.maxDashboards) return false;
    if (!candidate.ownerId) return false;
    return true;
  }
}
