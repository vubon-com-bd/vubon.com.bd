/**
 * Courier HTTP Response DTOs — 5 shapes
 * @module logistics-service/interfaces/dtos/responses/courier
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────
export class CourierHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiPropertyOptional() readonly website?: string;
  @ApiPropertyOptional() readonly contactPhone?: string;
  @ApiPropertyOptional() readonly contactEmail?: string;
  @ApiPropertyOptional() readonly trackingUrlTemplate?: string;
  @ApiProperty() readonly apiEnabled!: boolean;
  @ApiPropertyOptional({ type: [String] }) readonly coverageZones?: readonly string[];
  @ApiProperty() readonly supportsCOD!: boolean;
  @ApiProperty() readonly supportsInsurance!: boolean;
  @ApiProperty() readonly supportsInternational!: boolean;
  @ApiProperty() readonly averageDeliveryDays!: number;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiPropertyOptional() readonly activatedAt?: string;
  @ApiPropertyOptional() readonly deactivatedAt?: string;
  @ApiPropertyOptional() readonly suspendedAt?: string;
  @ApiPropertyOptional() readonly terminatedAt?: string;
  @ApiPropertyOptional() readonly suspendReason?: string;
  @ApiPropertyOptional() readonly terminateReason?: string;
  @ApiPropertyOptional() readonly deactivateReason?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Public (no sensitive) ──────────────
export class CourierPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly logoUrl?: string;
  @ApiProperty() readonly supportsCOD!: boolean;
  @ApiProperty() readonly supportsInsurance!: boolean;
  @ApiProperty() readonly supportsInternational!: boolean;
  @ApiProperty() readonly averageDeliveryDays!: number;
}

// ─── Summary (list item) ────────────────
export class CourierSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly displayName!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly apiEnabled!: boolean;
  @ApiProperty() readonly isDefault!: boolean;
  @ApiProperty() readonly priority!: number;
  @ApiProperty() readonly averageDeliveryDays!: number;
}

// ─── List (paginated) ───────────────────
export class CourierListHttpResponseDTO {
  @ApiProperty({ type: [CourierSummaryHttpResponseDTO] })
  readonly items!: readonly CourierSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly page!: number;
  @ApiProperty() readonly limit!: number;
  @ApiProperty() readonly totalPages!: number;
}

// ─── Stats ──────────────────────────────
export class CourierStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
  @ApiProperty() readonly suspendedCount!: number;
  @ApiProperty() readonly defaultCount!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byStatus!: Readonly<Record<string, number>>;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byType!: Readonly<Record<string, number>>;
}

// ─── Initiate (POST response) ───────────
export class CourierInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly courierId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
}
