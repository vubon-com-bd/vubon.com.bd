import { SetMetadata } from '@nestjs/common';
import { SHIPMENT_STATUS_KEY } from '../guards/shipment-status.guard';

export const RequireShipmentStatus = (status: string): MethodDecorator =>
  SetMetadata(SHIPMENT_STATUS_KEY, status);
