/**
 * Packaging HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PackagingHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly material!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly lengthCm!: number;
  @ApiProperty() readonly widthCm!: number;
  @ApiProperty() readonly heightCm!: number;
  @ApiProperty() readonly maxWeightKg!: number;
  @ApiPropertyOptional() readonly volumeM3?: number;
  @ApiPropertyOptional() readonly cost?: number;
  @ApiPropertyOptional() readonly currency?: string;
  @ApiPropertyOptional() readonly imageUrl?: string;
  @ApiProperty() readonly isFragile!: boolean;
  @ApiProperty() readonly isTemperatureControlled!: boolean;
  @ApiProperty() readonly isRecyclable!: boolean;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly discontinuedAt?: string;
  @ApiPropertyOptional() readonly deactivateReason?: string;
  @ApiPropertyOptional() readonly discontinueReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class PackagingSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly material!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly maxWeightKg!: number;
  @ApiPropertyOptional() readonly cost?: number;
  @ApiProperty() readonly stock!: number;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

export class PackagingListHttpResponseDTO {
  @ApiProperty({ type: [PackagingSummaryHttpResponseDTO] })
  readonly items!: readonly PackagingSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class PackagingStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalStock!: number;
  @ApiProperty() readonly outOfStockCount!: number;
  @ApiProperty() readonly lowStockCount!: number;
}

export class PackagingInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly packagingId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
