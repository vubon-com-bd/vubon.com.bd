/**
 * Roles Decorator
 * @module shared-kernel/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { ROLE } from '@vubon/shared-constants/common';

export type RoleValue = (typeof ROLE)[keyof typeof ROLE];

export const ROLES_META_KEY = 'required_roles';

export const Roles = (...roles: readonly RoleValue[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_META_KEY, roles);
