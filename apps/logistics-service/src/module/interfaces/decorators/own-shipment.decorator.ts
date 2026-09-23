import { SetMetadata } from '@nestjs/common';

export const OWN_SHIPMENT_KEY = 'ownShipment';
export const OwnShipment = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_SHIPMENT_KEY, true);
