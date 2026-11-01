/**
 * Zone HTTP Response DTOs
 * @module logistics-service/interfaces/dtos/responses/zone
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ZoneHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly pricingType!: string;
  @ApiPropertyOptional() readonly parentId?: string;
  @ApiPropertyOptional({ type: [String] }) readonly postalCodes?: readonly string[];
  @ApiPropertyOptional({ type: [String] }) readonly districts?: readonly string[];
  @ApiPropertyOptional({ type: [String] }) readonly divisions?: readonly string[];
  @ApiProperty() readonly shippingCost!: number;
  @ApiPropertyOptional() readonly freeAbove?: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly minDeliveryDays!: number;
  @ApiProperty() readonly maxDeliveryDays!: number;
  @ApiProperty() readonly codEnabled!: boolean;
  @ApiPropertyOptional() readonly codCharge?: number;
  @ApiPropertyOptional() readonly codMaxAmount?: number;
  @ApiProperty() readonly isRemote!: boolean;
  @ApiProperty() readonly isActive!: boolean;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly restrictedAt?: string;
  @ApiPropertyOptional() readonly suspendedAt?: string;
  @ApiPropertyOptional() readonly statusReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class ZoneSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly pricingType!: string;
  @ApiProperty() readonly shippingCost!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly minDeliveryDays!: number;
  @ApiProperty() readonly maxDeliveryDays!: number;
  @ApiProperty() readonly isRemote!: boolean;
  @ApiProperty() readonly isActive!: boolean;
  @ApiProperty() readonly createdAt!: string;
}

export class ZoneListHttpResponseDTO {
  @ApiProperty({ type: [ZoneSummaryHttpResponseDTO] })
  readonly items!: readonly ZoneSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

export class ZoneStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
  @ApiProperty() readonly totalActiveZones!: number;
  @ApiProperty() readonly averageDeliveryDays!: number;
}

export class ZoneInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly zoneId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
