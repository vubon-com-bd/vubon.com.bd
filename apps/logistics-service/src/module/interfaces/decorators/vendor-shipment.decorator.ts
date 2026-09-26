import { SetMetadata } from '@nestjs/common';

export const VENDOR_SHIPMENT_KEY = 'vendorShipment';
export const VendorShipment = (): MethodDecorator & ClassDecorator =>
  SetMetadata(VENDOR_SHIPMENT_KEY, true);
