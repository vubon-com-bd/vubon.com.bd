/**
 * Cart HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';

const CART_TYPE_VALUES = ['guest', 'user', 'wishlist', 'saved', 'subscription'];
const CART_STATUS_VALUES = [
  'active',
  'inactive',
  'abandoned',
  'converted',
  'expired',
  'merged',
  'cleared',
];

// ─── Create Cart ────────────────────────────
export class CreateCartHttpDTO {
  @ApiPropertyOptional({ enum: CART_TYPE_VALUES, default: 'user' })
  @IsOptional()
  @IsEnum(CART_TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  @IsOptional()
  @IsString()
  @Length(3, 3)
  readonly currency?: string;

  @ApiPropertyOptional({ example: 'sess_abc123' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  readonly sessionId?: string;

  @ApiPropertyOptional({ example: 'gift wrap' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

// ─── Update Cart ────────────────────────────
export class UpdateCartHttpDTO {
  @ApiPropertyOptional({ example: 'Updated notes' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly notes?: string;
}

// ─── Clear Cart ─────────────────────────────
export class ClearCartHttpDTO {
  @ApiPropertyOptional({ example: 'User requested clear' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly reason?: string;
}

// ─── Delete Cart ────────────────────────────
export class DeleteCartHttpDTO {
  @ApiPropertyOptional({ default: false })
  @IsOptional()
  readonly hardDelete?: boolean;

  @ApiPropertyOptional({ example: 'Duplicate cart' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly reason?: string;
}

// ─── Recover Cart ───────────────────────────
export class RecoverCartHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly abandonedCartId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly orderId?: string;

  @ApiPropertyOptional({ example: 10, minimum: 0, maximum: 100 })
  @IsOptional()
  @Min(0)
  @Max(100)
  readonly recoveryDiscountPercent?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  readonly sendNotification?: boolean;
}

// ─── List Query ─────────────────────────────
export class ListCartsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ example: 'user' })
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  readonly currency?: string;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z' })
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59.999Z' })
  @IsOptional()
  @IsString()
  readonly toDate?: string;

  @ApiPropertyOptional({ example: 'laptop' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly search?: string;

  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ example: 'desc', enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: string;
}

// ─── Idempotency Key Header ─────────────────
export class IdempotencyKeyHttpDTO {
  @ApiPropertyOptional({ example: 'idem-key-abc-123456' })
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(128)
  readonly idempotencyKey?: string;

  @ApiPropertyOptional({ example: { source: 'web' } })
  @IsOptional()
  @IsObject()
  readonly metadata?: Readonly<Record<string, unknown>>;
}
