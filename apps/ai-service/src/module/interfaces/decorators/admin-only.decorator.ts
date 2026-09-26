import { SetMetadata } from '@nestjs/common';

export const ADMIN_ONLY_KEY = 'admin_only';
export const AdminOnly = (): MethodDecorator & ClassDecorator =>
  SetMetadata(ADMIN_ONLY_KEY, true);
