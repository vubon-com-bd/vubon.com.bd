/**
 * Push HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PushSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiPropertyOptional() readonly messageId?: string;
  @ApiProperty() readonly successCount!: number;
  @ApiProperty() readonly failureCount!: number;
  @ApiPropertyOptional({ isArray: true })
  readonly invalidTokens?: readonly string[];
  @ApiPropertyOptional() readonly error?: string;
}

export class BulkPushSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiProperty() readonly totalTokens!: number;
  @ApiProperty() readonly successCount!: number;
  @ApiProperty() readonly failureCount!: number;
  @ApiProperty({ isArray: true })
  readonly invalidTokens!: readonly string[];
}
