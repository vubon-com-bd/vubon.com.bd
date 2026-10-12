/**
 * Can Access Analytics Specification
 * @module analytics-service/domain/specifications
 *
 * Analytics resource access control।
 * Business Rule:
 * - Role-based permission
 * - Owner OR public OR shared
 * - Admin override
 * - Tenant isolation
 */
import { Specification } from '@vubon/shared-kernel/domain/base';

export interface AccessRequest {
  readonly userId: string;
  readonly userRole: string;
  readonly resourceType: 'dashboard' | 'report' | 'cohort' | 'funnel' | 'attribution';
  readonly resourceId: string;
  readonly resourceOwnerId: string;
  readonly isPublic: boolean;
  readonly sharedWith?: readonly string[];
  readonly tenantId: string;
  readonly resourceTenantId: string;
  readonly requiredPermission: string;
  readonly userPermissions: readonly string[];
}

const ADMIN_ROLES: readonly string[] = ['super_admin', 'admin'];

export class CanAccessAnalyticsSpecification extends Specification<AccessRequest> {
  isSatisfiedBy(request: AccessRequest): boolean {
    // 1. Tenant isolation — always enforced (even for admins)
    if (request.tenantId !== request.resourceTenantId) {
      return false;
    }

    // 2. Owner access — always allowed
    if (request.userId === request.resourceOwnerId) {
      return true;
    }

    // 3. Public resource — read access
    if (request.isPublic) {
      return true;
    }

    // 4. Shared with user — explicit grant
    if (request.sharedWith?.includes(request.userId)) {
      return true;
    }

    // 5. Admin override — requires permission
    if (ADMIN_ROLES.includes(request.userRole)) {
      if (request.userPermissions.includes('admin:view') ||
          request.userPermissions.includes('admin:manage')) {
        return true;
      }
    }

    // 6. Required permission check
    if (request.userPermissions.includes(request.requiredPermission)) {
      return true;
    }

    return false;
  }

  explain(request: AccessRequest): string | null {
    if (request.tenantId !== request.resourceTenantId) {
      return 'Cross-tenant access denied';
    }
    if (request.userId === request.resourceOwnerId) return null;
    if (request.isPublic) return null;
    if (request.sharedWith?.includes(request.userId)) return null;
    if (ADMIN_ROLES.includes(request.userRole) &&
        (request.userPermissions.includes('admin:view') ||
         request.userPermissions.includes('admin:manage'))) {
      return null;
    }
    if (request.userPermissions.includes(request.requiredPermission)) return null;
    return `Missing permission: ${request.requiredPermission}`;
  }

  /**
   * Check for write access (stricter — no public)
   */
  canWrite(request: AccessRequest): boolean {
    if (request.tenantId !== request.resourceTenantId) return false;
    if (request.userId === request.resourceOwnerId) return true;
    if (ADMIN_ROLES.includes(request.userRole) &&
        request.userPermissions.includes('admin:manage')) {
      return true;
    }
    return false;
  }
}
