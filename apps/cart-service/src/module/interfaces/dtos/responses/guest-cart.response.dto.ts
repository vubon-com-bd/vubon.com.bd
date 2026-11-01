/**
 * Guest Cart HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Full (admin) ───────────────────────────
export class GuestCartHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly token!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
  @ApiProperty() readonly expiresAt!: string;
}

// ─── Public ─────────────────────────────────
export class GuestCartPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly token!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly expiresAt!: string;
}

// ─── Initiate ───────────────────────────────
export class GuestCartInitiateHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly guestCartId!: string;
  @ApiProperty() readonly token!: string;
  @ApiProperty() readonly expiresAt!: string;
}

// ─── Merge Plan Item ────────────────────────
export class MergePlanItemHttpResponseDTO {
  @ApiProperty() readonly productId!: string;
  @ApiPropertyOptional() readonly variantId?: string;
  @ApiProperty() readonly sourceItemId!: string;
  @ApiPropertyOptional() readonly targetItemId?: string;
  @ApiProperty() readonly resolvedQuantity!: number;
  @ApiProperty() readonly isConflict!: boolean;
}

// ─── Merge Response ─────────────────────────
export class MergeHttpResponseDTO {
  @ApiProperty() readonly mergerId!: string;
  @ApiProperty() readonly sourceCartId!: string;
  @ApiProperty() readonly targetCartId!: string;
  @ApiProperty() readonly strategy!: string;
  @ApiProperty() readonly itemsMerged!: number;
  @ApiProperty() readonly conflicts!: number;
  @ApiProperty({ type: [MergePlanItemHttpResponseDTO] })
  readonly mergedItems!: readonly MergePlanItemHttpResponseDTO[];
  @ApiProperty() readonly mergedAt!: string;
}

// ─── Merge Summary ──────────────────────────
export class MergeSummaryHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly mergerId!: string;
  @ApiProperty() readonly itemsMerged!: number;
  @ApiProperty() readonly conflicts!: number;
  @ApiProperty() readonly mergedAt!: string;
}
