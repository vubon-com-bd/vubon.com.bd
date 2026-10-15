/**
 * Coupon & Voucher HTTP Response DTOs
 * @module cart-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ─── Coupon Full ────────────────────────────
export class CouponHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly discountType!: string;
  @ApiProperty() readonly discountValue!: number;
  @ApiProperty() readonly appliedDiscountAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiPropertyOptional() readonly minOrderAmount?: number;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly appliedAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Coupon Public ──────────────────────────
export class CouponPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly discountType!: string;
  @ApiProperty() readonly discountValue!: number;
  @ApiProperty() readonly appliedDiscountAmount!: number;
  @ApiPropertyOptional() readonly minOrderAmount?: number;
  @ApiProperty() readonly expiresAt!: string;
}

// ─── Coupon Validation ──────────────────────
export class CouponValidationHttpResponseDTO {
  @ApiProperty() readonly valid!: boolean;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly discountAmount!: number;
  @ApiPropertyOptional() readonly reason?: string;
}

// ─── Voucher Full ───────────────────────────
export class VoucherHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly remainingAmount!: number;
  @ApiProperty() readonly appliedAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly expiresAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

// ─── Voucher Public ─────────────────────────
export class VoucherPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly remainingAmount!: number;
  @ApiProperty() readonly appliedAmount!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly expiresAt!: string;
}

// ─── Voucher Validation ─────────────────────
export class VoucherValidationHttpResponseDTO {
  @ApiProperty() readonly valid!: boolean;
  @ApiProperty() readonly code!: string;
  @ApiProperty() readonly appliedAmount!: number;
  @ApiProperty() readonly remainingAmount!: number;
  @ApiPropertyOptional() readonly reason?: string;
}
