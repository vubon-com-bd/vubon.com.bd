/**
 * @VendorActive() — marks route requiring vendor in 'active' state
 * @module vendor-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const VENDOR_ACTIVE_META_KEY = 'vendor_active';

export const VendorActive = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_ACTIVE_META_KEY, true);
