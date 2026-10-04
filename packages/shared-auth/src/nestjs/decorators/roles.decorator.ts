import { SetMetadata } from '@nestjs/common';
import type { Role } from '../../common/role/role.types';

export const ROLES_KEY = 'roles';

/** Require one or more roles for a route. */
export const Roles = (...roles: readonly Role[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
