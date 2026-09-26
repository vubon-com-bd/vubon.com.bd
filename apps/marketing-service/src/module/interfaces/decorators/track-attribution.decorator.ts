import { SetMetadata } from '@nestjs/common';

export const TRACK_ATTRIBUTION_KEY = 'trackAttribution';
export const TrackAttribution = (): MethodDecorator & ClassDecorator =>
  SetMetadata(TRACK_ATTRIBUTION_KEY, true);
