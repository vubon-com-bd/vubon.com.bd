/**
 * Payment Method HTTP Response DTOs
 * @module payment-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MethodHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly type!: string;
  @ApiPropertyOptional() readonly gateway?: string;
  @ApiProperty() readonly label!: string;
  @ApiPropertyOptional() readonly last4?: string;
  @ApiPropertyOptional() readonly brand?: string;
  @ApiPropertyOptional() readonly expiryMonth?: number;
  @ApiPropertyOptional() readonly expiryYear?: number;
  @ApiPropertyOptional() readonly holderName?: string;
  @ApiPropertyOptional() readonly walletAddress?: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class MethodSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly method!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly label!: string;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly isDefault!: boolean;
}

export class MethodListHttpResponseDTO {
  @ApiProperty({ type: [MethodSummaryHttpResponseDTO] })
  readonly items!: readonly MethodSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}
