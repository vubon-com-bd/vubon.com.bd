/**
 * Email HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EmailFailureHttpDTO {
  @ApiProperty() readonly email!: string;
  @ApiProperty() readonly error!: string;
}

export class EmailSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiPropertyOptional() readonly messageId?: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly providerMessageId?: string;
  @ApiPropertyOptional() readonly error?: string;
}

export class BulkEmailSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiProperty() readonly totalRequested!: number;
  @ApiProperty() readonly successCount!: number;
  @ApiProperty() readonly failureCount!: number;
  @ApiProperty({ type: [EmailFailureHttpDTO] })
  readonly failures!: readonly EmailFailureHttpDTO[];
}
