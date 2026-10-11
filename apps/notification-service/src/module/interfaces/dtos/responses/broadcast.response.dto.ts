/**
 * Broadcast HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BroadcastHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() type!: string;
  @ApiProperty() status!: string;
  @ApiProperty() target!: string;
  @ApiProperty() templateId!: string;
  @ApiPropertyOptional() estimatedRecipients?: number;
  @ApiPropertyOptional() totalRecipients?: number;
  @ApiProperty() processed!: number;
  @ApiProperty() succeeded!: number;
  @ApiProperty() failed!: number;
  @ApiProperty() progressPercent!: number;
  @ApiPropertyOptional() scheduledAt?: string;
  @ApiPropertyOptional() startedAt?: string;
  @ApiPropertyOptional() completedAt?: string;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class BroadcastStatsHttpResponseDTO {
  @ApiProperty() broadcastId!: string;
  @ApiProperty() totalRecipients!: number;
  @ApiProperty() processed!: number;
  @ApiProperty() succeeded!: number;
  @ApiProperty() failed!: number;
  @ApiProperty() progressPercent!: number;
  @ApiProperty() deliveryRate!: number;
  @ApiProperty() failureRate!: number;
}
