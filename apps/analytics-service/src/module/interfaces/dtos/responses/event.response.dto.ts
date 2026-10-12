/**
 * Event Response DTOs (HTTP layer)
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { EventResponseData } from '../../../application/dtos/responses/event-response.dto.js';

export class EventResponseDto implements EventResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 'page_view' })
  name!: string;

  @ApiProperty({ example: 'organic' })
  source!: string;

  @ApiPropertyOptional()
  sessionId?: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiProperty({ example: 5 })
  payloadKeys!: number;

  @ApiProperty({ example: '2026-01-15T10:30:00Z' })
  occurredAt!: string;

  @ApiProperty({ example: 'processed' })
  status!: string;

  @ApiPropertyOptional({ nullable: true })
  processedAt?: string | null;
}
