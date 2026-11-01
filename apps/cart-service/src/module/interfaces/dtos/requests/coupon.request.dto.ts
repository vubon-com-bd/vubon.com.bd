/**
 * Coupon HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

// ─── Apply Coupon ───────────────────────────
export class ApplyCouponHttpDTO {
  @ApiProperty({ example: 'SAVE10', minLength: 4, maxLength: 32 })
  @IsString()
  @Length(4, 32)
  readonly code!: string;
}

// ─── Remove Coupon ──────────────────────────
export class RemoveCouponHttpDTO {
  @ApiProperty({ example: 'SAVE10', minLength: 4, maxLength: 32 })
  @IsString()
  @Length(4, 32)
  readonly code!: string;
}

// ─── Validate Coupon (dry-run) ──────────────
export class ValidateCouponHttpDTO {
  @ApiProperty({ example: 'SAVE10', minLength: 4, maxLength: 32 })
  @IsString()
  @Length(4, 32)
  readonly code!: string;
}

// ─── Apply Voucher ──────────────────────────
export class ApplyVoucherHttpDTO {
  @ApiProperty({ example: 'GIFT2026ABC', minLength: 8, maxLength: 32 })
  @IsString()
  @Length(8, 32)
  readonly code!: string;
}

// ─── Remove Voucher ─────────────────────────
export class RemoveVoucherHttpDTO {
  @ApiProperty({ example: 'GIFT2026ABC', minLength: 8, maxLength: 32 })
  @IsString()
  @Length(8, 32)
  readonly code!: string;
}
