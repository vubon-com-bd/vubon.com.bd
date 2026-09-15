import { SetMetadata } from '@nestjs/common';

export const OWNER_RESOURCE_KEY = 'ownerResource';

export interface OwnerResourceMeta {
  readonly paramName: string;
  readonly modelName: string;
  readonly ownerField: string;
}

/**
 * Declare the resource-owner rule for a route.
 * Used by a generic OwnerGuard.
 */
export const OwnerResource = (meta: OwnerResourceMeta): MethodDecorator & ClassDecorator =>
  SetMetadata(OWNER_RESOURCE_KEY, meta);
