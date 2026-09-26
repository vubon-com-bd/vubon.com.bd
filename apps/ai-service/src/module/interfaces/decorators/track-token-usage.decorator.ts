import { SetMetadata } from '@nestjs/common';

export const TRACK_TOKEN_USAGE_KEY = 'track_token_usage';
export const TrackTokenUsage = (): MethodDecorator =>
  SetMetadata(TRACK_TOKEN_USAGE_KEY, true);
