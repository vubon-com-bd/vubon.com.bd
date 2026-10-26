/**
 * Webhook HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly url!: string;
  @ApiProperty({ isArray: true })
  readonly events!: readonly string[];
  @ApiPropertyOptional({ type: 'object', additionalProperties: true })
  readonly headers?: Readonly<Record<string, string>>;
  @ApiProperty() readonly hasSecret!: boolean;
  @ApiPropertyOptional() readonly lastTriggeredAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class WebhookSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly url!: string;
  @ApiProperty() readonly eventCount!: number;
  @ApiPropertyOptional() readonly lastTriggeredAt?: string;
}

export class WebhookListHttpResponseDTO {
  @ApiProperty({ type: [WebhookSummaryHttpResponseDTO] })
  readonly items!: readonly WebhookSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class WebhookDeliveryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly webhookId!: string;
  @ApiProperty() readonly event!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly responseStatus?: number;
  @ApiPropertyOptional() readonly durationMs?: number;
  @ApiProperty() readonly attemptCount!: number;
  @ApiPropertyOptional() readonly deliveredAt?: string;
  @ApiPropertyOptional() readonly failedAt?: string;
  @ApiPropertyOptional() readonly error?: string;
  @ApiProperty() readonly createdAt!: string;
}
