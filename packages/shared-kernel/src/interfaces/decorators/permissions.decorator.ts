/**
 * Permissions Decorator
 * @module shared-kernel/interfaces/decorators
 *
 * Note: accept any string-based permission value (service-agnostic).
 * Service-specific permission constants (e.g., LOGISTICS_PERMISSION)
 * are validated by the guard at runtime.
 */
import { SetMetadata } from '@nestjs/common';

export type PermissionValue = string;

export const PERMISSIONS_META_KEY = 'required_permissions';

export const Permissions = (
  ...permissions: readonly PermissionValue[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(PERMISSIONS_META_KEY, permissions);
