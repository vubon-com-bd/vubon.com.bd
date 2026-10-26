/**
 * Digest HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DigestItemHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly notificationId!: string;
  @ApiProperty() readonly category!: string;
  @ApiProperty() readonly priority!: string;
  @ApiProperty() readonly title!: string;
  @ApiProperty() readonly summary!: string;
  @ApiPropertyOptional() readonly actionUrl?: string;
  @ApiProperty() readonly occurredAt!: string;
}

export class DigestHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly frequency!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty({ isArray: true })
  readonly categories!: readonly string[];
  @ApiProperty() readonly sendHour!: number;
  @ApiProperty() readonly timezone!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiPropertyOptional({ type: [DigestItemHttpResponseDTO] })
  readonly items?: readonly DigestItemHttpResponseDTO[];
  @ApiPropertyOptional() readonly generatedAt?: string;
  @ApiPropertyOptional() readonly sentAt?: string;
}

export class DigestSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly frequency!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly createdAt!: string;
}

export class DigestListHttpResponseDTO {
  @ApiProperty({ type: [DigestSummaryHttpResponseDTO] })
  readonly items!: readonly DigestSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
