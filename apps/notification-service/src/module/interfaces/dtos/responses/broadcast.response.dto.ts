/**
 * Broadcast HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BroadcastHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly target!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty({ isArray: true })
  readonly channels!: readonly string[];
  @ApiPropertyOptional() readonly templateId?: string;
  @ApiProperty() readonly recipientCount!: number;
  @ApiProperty() readonly sentCount!: number;
  @ApiProperty() readonly failedCount!: number;
  @ApiPropertyOptional() readonly scheduledAt?: string;
  @ApiPropertyOptional() readonly startedAt?: string;
  @ApiPropertyOptional() readonly completedAt?: string;
  @ApiProperty() readonly createdBy!: string;
  @ApiPropertyOptional() readonly approvedBy?: string;
  @ApiProperty() readonly createdAt!: string;
}

export class BroadcastSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly recipientCount!: number;
  @ApiProperty() readonly sentCount!: number;
  @ApiProperty() readonly failedCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class BroadcastListHttpResponseDTO {
  @ApiProperty({ type: [BroadcastSummaryHttpResponseDTO] })
  readonly items!: readonly BroadcastSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class BroadcastResultHttpResponseDTO {
  @ApiProperty() readonly broadcastId!: string;
  @ApiProperty() readonly recipientCount!: number;
  @ApiProperty() readonly sentCount!: number;
  @ApiProperty() readonly deliveredCount!: number;
  @ApiProperty() readonly failedCount!: number;
  @ApiProperty() readonly openCount!: number;
  @ApiProperty() readonly clickCount!: number;
  @ApiProperty() readonly unsubscribedCount!: number;
  @ApiProperty() readonly deliveryRate!: number;
  @ApiProperty() readonly openRate!: number;
  @ApiProperty() readonly clickRate!: number;
  @ApiProperty() readonly unsubscribeRate!: number;
  @ApiProperty() readonly durationMs!: number;
  @ApiProperty() readonly throughputPerSecond!: number;
}
