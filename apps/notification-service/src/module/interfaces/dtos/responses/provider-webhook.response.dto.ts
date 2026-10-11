/**
 * Provider-Webhook HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderWebhookProcessHttpResponseDTO {
  @ApiProperty() accepted!: boolean;
  @ApiProperty() provider!: string;
  @ApiProperty() processedEvents!: number;
  @ApiProperty({ isArray: true, type: String })
  updatedNotifications!: readonly string[];
  @ApiPropertyOptional({ isArray: true, type: String })
  errors?: readonly string[];
}
