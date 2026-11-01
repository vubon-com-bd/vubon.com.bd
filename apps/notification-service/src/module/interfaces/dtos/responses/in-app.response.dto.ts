/**
 * In-App HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InAppActionResponseHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly label!: string;
  @ApiPropertyOptional() readonly url?: string;
  @ApiPropertyOptional() readonly action?: string;
}

export class InAppHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly title!: string;
  @ApiProperty() readonly body!: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiPropertyOptional() readonly iconUrl?: string;
  @ApiPropertyOptional({ type: [InAppActionResponseHttpDTO] })
  readonly actions?: readonly InAppActionResponseHttpDTO[];
  @ApiPropertyOptional() readonly readAt?: string;
  @ApiPropertyOptional() readonly dismissedAt?: string;
  @ApiPropertyOptional() readonly clickedAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
}

export class InAppInboxHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly unreadCount!: number;
  @ApiProperty() readonly totalCount!: number;
  @ApiProperty({ type: [InAppHttpResponseDTO] })
  readonly notifications!: readonly InAppHttpResponseDTO[];
}
