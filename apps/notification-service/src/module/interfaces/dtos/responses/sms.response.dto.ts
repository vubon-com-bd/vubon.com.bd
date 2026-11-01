/**
 * SMS HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SmsFailureHttpDTO {
  @ApiProperty() readonly phone!: string;
  @ApiProperty() readonly error!: string;
}

export class SmsSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiPropertyOptional() readonly messageId?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly segments!: number;
  @ApiPropertyOptional() readonly providerMessageId?: string;
  @ApiPropertyOptional() readonly error?: string;
}

export class BulkSmsSendHttpResponseDTO {
  @ApiProperty() readonly success!: boolean;
  @ApiProperty() readonly totalRequested!: number;
  @ApiProperty() readonly successCount!: number;
  @ApiProperty() readonly failureCount!: number;
  @ApiProperty() readonly totalSegments!: number;
  @ApiProperty({ type: [SmsFailureHttpDTO] })
  readonly failures!: readonly SmsFailureHttpDTO[];
}
