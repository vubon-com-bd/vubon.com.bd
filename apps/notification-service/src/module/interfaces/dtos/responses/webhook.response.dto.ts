/**
 * Webhook HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WebhookHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() url!: string;
  @ApiProperty() method!: string;
  @ApiProperty() status!: string;
  @ApiProperty({ isArray: true, type: String })
  events!: readonly string[];
  @ApiProperty() hasSecret!: boolean;
  @ApiPropertyOptional() description?: string;
  @ApiProperty() failureCount!: number;
  @ApiPropertyOptional() lastSuccessAt?: string;
  @ApiPropertyOptional() lastFailureAt?: string;
  @ApiProperty() createdBy!: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class WebhookTestHttpResponseDTO {
  @ApiProperty() webhookId!: string;
  @ApiProperty() success!: boolean;
  @ApiPropertyOptional() responseStatus?: number;
  @ApiPropertyOptional() durationMs?: number;
  @ApiPropertyOptional() error?: string;
}
