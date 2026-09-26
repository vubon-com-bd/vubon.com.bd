import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface AccessContext {
  readonly userId: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

export class CanAccessAnalyticsSpecification extends Specification<AccessContext> {
  isSatisfiedBy(candidate: AccessContext): boolean {
    if (candidate.permissions.includes('analytics.read')) return true;
    return candidate.roles.some((r) =>
      ['admin', 'analyst', 'owner'].includes(r),
    );
  }
}
