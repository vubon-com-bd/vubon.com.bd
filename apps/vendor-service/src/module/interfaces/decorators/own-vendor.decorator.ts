/**
 * @OwnVendor() — marks route requiring vendor ownership check
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_VENDOR_META_KEY = 'vendor_own_vendor';

export const OwnVendor = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_VENDOR_META_KEY, true);
