/**
 * Notification Detail HTTP Response DTO
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationHttpResponseDTO } from '@interfaces/dtos/responses/notification.response.dto.js';

export class RecipientSummaryHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly channel!: string;
  @ApiProperty() readonly destination!: string;
  @ApiProperty() readonly deliveryStatus!: string;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly readAt?: string;
}

export class DeliveryAttemptSummaryHttpDTO {
  @ApiProperty() readonly attemptNumber!: number;
  @ApiProperty() readonly succeeded!: boolean;
  @ApiProperty() readonly attemptedAt!: string;
  @ApiPropertyOptional() readonly providerMessageId?: string;
  @ApiPropertyOptional() readonly errorMessage?: string;
}

export class NotificationDetailHttpResponseDTO {
  @ApiProperty({ type: NotificationHttpResponseDTO })
  readonly notification!: NotificationHttpResponseDTO;

  @ApiProperty({ type: [RecipientSummaryHttpDTO] })
  readonly recipients!: readonly RecipientSummaryHttpDTO[];

  @ApiProperty({ type: [DeliveryAttemptSummaryHttpDTO] })
  readonly attempts!: readonly DeliveryAttemptSummaryHttpDTO[];
}
