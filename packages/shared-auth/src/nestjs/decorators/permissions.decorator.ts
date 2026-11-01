import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';
export const PERMISSIONS_MODE_KEY = 'permissionsMode';

/** Require one or more permissions. Default mode = 'all'. */
export const Permissions = (...permissions: readonly string[]): MethodDecorator & ClassDecorator =>
  SetMetadata(PERMISSIONS_KEY, permissions);

/** Set the match mode for @Permissions (any vs all). */
export const PermissionsMode = (mode: 'any' | 'all'): MethodDecorator & ClassDecorator =>
  SetMetadata(PERMISSIONS_MODE_KEY, mode);
