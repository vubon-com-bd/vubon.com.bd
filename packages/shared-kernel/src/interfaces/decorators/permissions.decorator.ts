/**
 * Permissions Decorator
 * @module shared-kernel/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { PERMISSION } from '@vubon/shared-constants/common';

export type PermissionValue = (typeof PERMISSION)[keyof typeof PERMISSION];

export const PERMISSIONS_META_KEY = 'required_permissions';

export const Permissions = (
  ...permissions: readonly PermissionValue[]
): MethodDecorator & ClassDecorator => SetMetadata(PERMISSIONS_META_KEY, permissions);
