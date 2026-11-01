/**
 * ShippingMethod HTTP Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingMethodHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly rateType!: string;
  @ApiProperty() readonly baseCost!: number;
  @ApiPropertyOptional() readonly freeAbove?: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly minDeliveryDays!: number;
  @ApiProperty() readonly maxDeliveryDays!: number;
  @ApiPropertyOptional() readonly maxWeightKg?: number;
  @ApiPropertyOptional() readonly maxDimensionsCm?: number;
  @ApiProperty() readonly codEnabled!: boolean;
  @ApiProperty() readonly trackingEnabled!: boolean;
  @ApiPropertyOptional({ type: [String] }) readonly coverageZones?: readonly string[];
  @ApiPropertyOptional({ type: [String] }) readonly couriers?: readonly string[];
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly isActive!: boolean;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly suspendedAt?: string;
  @ApiPropertyOptional() readonly suspendReason?: string;
  @ApiPropertyOptional() readonly deactivateReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ShippingMethodSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly rateType!: string;
  @ApiProperty() readonly baseCost!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly minDeliveryDays!: number;
  @ApiProperty() readonly maxDeliveryDays!: number;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

export class ShippingMethodListHttpResponseDTO {
  @ApiProperty({ type: [ShippingMethodSummaryHttpResponseDTO] })
  readonly items!: readonly ShippingMethodSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class ShippingMethodStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly defaultCount!: number;
}

export class ShippingMethodInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly shippingMethodId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
