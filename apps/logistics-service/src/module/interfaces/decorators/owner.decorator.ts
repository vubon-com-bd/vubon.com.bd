/**
 * @ResourceOwner() — marks route requiring owner check
 * @module logistics-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const RESOURCE_OWNER_META_KEY = 'logistics_resource_owner';

export const ResourceOwner = (): MethodDecorator & ClassDecorator =>
  SetMetadata(RESOURCE_OWNER_META_KEY, true);
