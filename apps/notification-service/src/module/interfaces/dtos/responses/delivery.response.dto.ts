/**
 * Delivery HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeliveryHttpResponseDTO {
  @ApiProperty() notificationId!: string;
  @ApiProperty() status!: string;
  @ApiProperty() attemptCount!: number;
  @ApiPropertyOptional() lastAttemptAt?: string;
  @ApiPropertyOptional() deliveredAt?: string;
  @ApiPropertyOptional() sentAt?: string;
  @ApiPropertyOptional() failureReason?: string;
}

export class DeliveryRetryHttpResponseDTO {
  @ApiProperty() notificationId!: string;
  @ApiProperty() scheduled!: boolean;
  @ApiProperty() attempt!: number;
  @ApiPropertyOptional() nextAttemptAt?: string;
  @ApiPropertyOptional() delayMs?: number;
  @ApiPropertyOptional() reason?: string;
}
