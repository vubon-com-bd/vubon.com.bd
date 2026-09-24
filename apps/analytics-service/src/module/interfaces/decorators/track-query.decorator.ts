import { SetMetadata } from '@nestjs/common';

export const TRACK_QUERY_KEY = 'trackQuery';
export const TrackQuery = (name?: string): MethodDecorator =>
  SetMetadata(TRACK_QUERY_KEY, name ?? true);
