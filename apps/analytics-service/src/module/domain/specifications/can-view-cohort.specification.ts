/**
 * Can View Cohort Specification
 * @module analytics-service/domain/specifications
 *
 * Cohort visibility + data sufficiency rules।
 * Business Rule:
 * - Minimum cohort size (privacy)
 * - Active cohort
 * - Owner/public/shared access
 * - Not expired
 */
import { Specification } from '@vubon/shared-kernel/domain/base';
import { CohortEntity } from '../entities/cohort.entity.js';

export interface CohortViewContext {
  readonly userId: string;
  readonly userRole: string;
  readonly userPermissions: readonly string[];
  readonly isPublic: boolean;
  readonly sharedWith?: readonly string[];
  readonly minCohortSize: number;
}

const ADMIN_ROLES: readonly string[] = ['super_admin', 'admin'];
const MIN_COHORT_SIZE = 10; // privacy threshold

export class CanViewCohortSpecification extends Specification<CohortEntity> {
  constructor(private readonly context: CohortViewContext) {
    super();
  }

  isSatisfiedBy(cohort: CohortEntity): boolean {
    // 1. Cohort must be active
    if (!cohort.isActive) return false;

    // 2. Data sufficiency (privacy)
    const analysis = cohort.lastAnalysis;
    if (analysis && analysis.cohortSize < Math.max(this.context.minCohortSize, MIN_COHORT_SIZE)) {
      return false;
    }

    // 3. Access control
    const hasAccess =
      cohort.isActive &&
      (this.isOwner() ||
        this.context.isPublic ||
        (this.context.sharedWith?.includes(this.context.userId) ?? false) ||
        this.isAdmin());

    if (!hasAccess) return false;

    // 4. Permission check
    if (!this.context.userPermissions.includes('analytics:cohort:view') && !this.isAdmin()) {
      return false;
    }

    return true;
  }

  explain(cohort: CohortEntity): string | null {
    if (!cohort.isActive) return 'Cohort is inactive';
    const analysis = cohort.lastAnalysis;
    if (analysis && analysis.cohortSize < Math.max(this.context.minCohortSize, MIN_COHORT_SIZE)) {
      return `Cohort size below privacy threshold (min ${MIN_COHORT_SIZE})`;
    }
    if (!this.isOwner() && !this.context.isPublic && !this.isAdmin() &&
        !(this.context.sharedWith?.includes(this.context.userId) ?? false)) {
      return 'No access to this cohort';
    }
    if (!this.context.userPermissions.includes('analytics:cohort:view') && !this.isAdmin()) {
      return 'Missing permission: analytics:cohort:view';
    }
    return null;
  }

  /**
   * Check if cohort has sufficient data for retention analysis
   */
  hasSufficientData(cohort: CohortEntity): boolean {
    const analysis = cohort.lastAnalysis;
    if (!analysis) return false;
    return analysis.cohortSize >= MIN_COHORT_SIZE && analysis.periodCount() >= 2;
  }

  private isOwner(): boolean {
    return false; // Cohort ownership is tenant-level; adapt for specific apps
  }

  private isAdmin(): boolean {
    return (
      ADMIN_ROLES.includes(this.context.userRole) &&
      this.context.userPermissions.includes('admin:view')
    );
  }
}
