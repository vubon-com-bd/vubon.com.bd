import { SetMetadata } from '@nestjs/common';

export const TRACK_DELIVERY_KEY = 'trackDelivery';

export const TrackDelivery = (): MethodDecorator =>
  SetMetadata(TRACK_DELIVERY_KEY, true);
