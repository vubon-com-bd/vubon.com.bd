/**
 * Event Request DTOs (HTTP layer)
 * @module analytics-service/interfaces/dtos/requests
 *
 * Re-exports application DTO shapes for HTTP layer with Swagger metadata।
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { TrackEventDto, BatchTrackEventDto } from '../../../application/dtos/requests/event/index.js';

export class TrackEventRequestDto implements TrackEventDto {
  @ApiProperty({ description: 'Event name', example: 'page_view' })
  name!: string;

  @ApiProperty({ description: 'Event category', example: 'engagement' })
  category!: string;

  @ApiPropertyOptional({ description: 'User ID', example: 'user-uuid' })
  userId?: string;

  @ApiPropertyOptional({ description: 'Session ID', example: 'sess-uuid' })
  sessionId?: string;

  @ApiPropertyOptional({ description: 'Event properties', type: Object })
  properties?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'Event context (page, referrer, device)' })
  context?: Record<string, unknown>;

  @ApiPropertyOptional({ description: 'ISO 8601 timestamp' })
  occurredAt?: string;

  @ApiPropertyOptional({ description: 'Traffic source', example: 'organic' })
  source?: string;
}

export class BatchTrackEventRequestDto implements BatchTrackEventDto {
  @ApiProperty({ type: [TrackEventRequestDto], description: 'Events batch (max 1000)' })
  events!: TrackEventRequestDto[];
}
