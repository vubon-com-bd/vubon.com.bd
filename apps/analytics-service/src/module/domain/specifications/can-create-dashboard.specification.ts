/**
 * Can Create Dashboard Specification
 * @module analytics-service/domain/specifications
 *
 * Dashboard creation eligibility rules।
 * Business Rule:
 * - Max dashboards per user
 * - Name not duplicate for user
 * - Layout valid for widget count
 * - User has dashboard permission
 */
import { Specification } from '@vubon/shared-kernel/domain/base';

export interface DashboardCreationRequest {
  readonly userId: string;
  readonly name: string;
  readonly layout: string;
  readonly existingDashboardNames: readonly string[];
  readonly currentDashboardCount: number;
  readonly hasPermission: boolean;
}

export interface DashboardCreationLimits {
  readonly maxDashboardsPerUser: number;
  readonly maxNameLength: number;
}

const DEFAULT_LIMITS: DashboardCreationLimits = {
  maxDashboardsPerUser: 100,
  maxNameLength: 150,
};

export class CanCreateDashboardSpecification extends Specification<DashboardCreationRequest> {
  constructor(private readonly limits: DashboardCreationLimits = DEFAULT_LIMITS) {
    super();
  }

  isSatisfiedBy(request: DashboardCreationRequest): boolean {
    // 1. Permission check
    if (!request.hasPermission) return false;

    // 2. Dashboard count limit
    if (request.currentDashboardCount >= this.limits.maxDashboardsPerUser) {
      return false;
    }

    // 3. Name length
    const trimmedName = request.name.trim();
    if (trimmedName.length < 3 || trimmedName.length > this.limits.maxNameLength) {
      return false;
    }

    // 4. Duplicate name check (case-insensitive)
    const lowerName = trimmedName.toLowerCase();
    const isDuplicate = request.existingDashboardNames.some(
      (n) => n.toLowerCase() === lowerName
    );
    if (isDuplicate) return false;

    // 5. Layout valid
    const validLayouts = ['grid', 'masonry', 'flex', 'freeform'];
    if (!validLayouts.includes(request.layout)) return false;

    return true;
  }

  /**
   * Explain rejection reason
   */
  explain(request: DashboardCreationRequest): string | null {
    if (!request.hasPermission) return 'User lacks dashboard permission';

    if (request.currentDashboardCount >= this.limits.maxDashboardsPerUser) {
      return `Dashboard limit reached (${this.limits.maxDashboardsPerUser})`;
    }

    const trimmedName = request.name.trim();
    if (trimmedName.length < 3) return 'Name too short (min 3 chars)';
    if (trimmedName.length > this.limits.maxNameLength) {
      return `Name too long (max ${this.limits.maxNameLength} chars)`;
    }

    const lowerName = trimmedName.toLowerCase();
    const isDuplicate = request.existingDashboardNames.some(
      (n) => n.toLowerCase() === lowerName
    );
    if (isDuplicate) return 'Dashboard name already exists';

    const validLayouts = ['grid', 'masonry', 'flex', 'freeform'];
    if (!validLayouts.includes(request.layout)) {
      return `Invalid layout: ${request.layout}`;
    }

    return null;
  }
}
