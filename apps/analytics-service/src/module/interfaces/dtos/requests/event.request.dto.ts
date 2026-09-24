import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ANALYTICS_SOURCE,
  ANALYTICS_TYPE,
} from '@vubon/shared-constants/platform/analytics';

export class TrackEventRequestDTO {
  @ApiProperty({ example: 'user.login' })
  name!: string;

  @ApiProperty({ example: 'web', enum: Object.values(ANALYTICS_SOURCE) })
  source!: string;

  @ApiPropertyOptional({ enum: Object.values(ANALYTICS_TYPE) })
  type?: string;

  @ApiPropertyOptional({ example: 'user-123' })
  userId?: string;

  @ApiPropertyOptional({ example: 'session-456' })
  sessionId?: string;

  @ApiPropertyOptional({ example: '2026-09-24T12:00:00Z' })
  occurredAt?: string;

  @ApiPropertyOptional({
    example: { page: '/home', duration: 120 },
    description: 'Event payload (max 64KB, max 50 keys)',
  })
  payload?: Record<string, unknown>;
}

export class BatchTrackEventRequestDTO {
  @ApiProperty({ type: [TrackEventRequestDTO] })
  events!: TrackEventRequestDTO[];
}
