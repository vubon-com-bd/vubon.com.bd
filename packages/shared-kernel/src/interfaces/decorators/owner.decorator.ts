/**
 * Owner Decorator
 * @module shared-kernel/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWNER_META_KEY = 'owner_param';

export const Owner = (paramName = 'id'): MethodDecorator & ClassDecorator =>
  SetMetadata(OWNER_META_KEY, paramName);
