/**
 * LiveChatResponseDTO
 * @module support-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LiveChatResponseDTO {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() userId?: string;
  @ApiPropertyOptional() agentId?: string;
  @ApiPropertyOptional() visitorId?: string;
  @ApiProperty() status!: string;
  @ApiProperty() trigger!: string;
  @ApiPropertyOptional() subject?: string;
  @ApiProperty() messageCount!: number;
  @ApiProperty() startedAt!: string;
  @ApiPropertyOptional() endedAt?: string;
  @ApiPropertyOptional() durationSeconds?: number;
  @ApiPropertyOptional() transferredTo?: string;
  @ApiPropertyOptional() rating?: number;
  @ApiPropertyOptional() ratingComment?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
