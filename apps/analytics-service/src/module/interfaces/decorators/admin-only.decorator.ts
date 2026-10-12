/**
 * Admin Only Decorator
 * @module analytics-service/interfaces/decorators
 *
 * Marks a route as admin-only (checked by AdminOnlyGuard).
 */
import { SetMetadata } from '@nestjs/common';

export const ADMIN_ONLY_META_KEY = 'analytics_admin_only';

/**
 * @AdminOnly() — restrict route to admin-tier roles
 */
export const AdminOnly = (): MethodDecorator & ClassDecorator =>
  SetMetadata(ADMIN_ONLY_META_KEY, true);
