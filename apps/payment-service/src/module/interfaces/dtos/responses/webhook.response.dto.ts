/**
 * Webhook HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookEventHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly gateway!: string;
  @ApiProperty() readonly gatewayEventId!: string;
  @ApiProperty() readonly eventType!: string;
  @ApiProperty() readonly verified!: boolean;
  @ApiProperty() readonly processed!: boolean;
  @ApiProperty() readonly attempts!: number;
  @ApiPropertyOptional() readonly paymentId?: string;
  @ApiProperty() readonly receivedAt!: string;
  @ApiPropertyOptional() readonly verifiedAt?: string;
  @ApiPropertyOptional() readonly processedAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
}

export class WebhookProcessHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly webhookId!: string;
  @ApiProperty() readonly processed!: boolean;
  @ApiPropertyOptional() readonly paymentId?: string;
}

export class WebhookListHttpResponseDTO {
  @ApiProperty({ type: [WebhookEventHttpResponseDTO] })
  readonly items!: readonly WebhookEventHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
