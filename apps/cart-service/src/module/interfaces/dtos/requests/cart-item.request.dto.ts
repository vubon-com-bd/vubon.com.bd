/**
 * CartItem HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

// ─── Add Item ───────────────────────────────
export class AddItemHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly productId!: string;

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly variantId?: string;

  @ApiProperty({ example: 2, minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity!: number;

  @ApiPropertyOptional({ example: { size: 'M', color: 'blue' } })
  @IsOptional()
  @IsObject()
  readonly attributes?: Readonly<Record<string, string>>;
}

// ─── Update Item ────────────────────────────
export class UpdateItemHttpDTO {
  @ApiPropertyOptional({ example: 3, minimum: 1, maximum: 999 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity?: number;

  @ApiPropertyOptional({ example: { size: 'L' } })
  @IsOptional()
  @IsObject()
  readonly attributes?: Readonly<Record<string, string>>;

  @ApiPropertyOptional({ example: 'Gift wrap please' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly note?: string;
}

// ─── Update Quantity ────────────────────────
export class UpdateQuantityHttpDTO {
  @ApiProperty({ example: 5, minimum: 1, maximum: 999 })
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity!: number;
}

// ─── Remove Item ────────────────────────────
export class RemoveItemHttpDTO {
  @ApiPropertyOptional({ example: 'User requested removal' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly reason?: string;
}

// ─── Select Items ───────────────────────────
export class SelectItemsHttpDTO {
  @ApiProperty({
    type: [String],
    example: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  readonly itemIds!: readonly string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly selected!: boolean;
}

// ─── Move to Saved ──────────────────────────
export class MoveToSavedHttpDTO {
  @ApiPropertyOptional({ example: 'Save for later' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly note?: string;
}

// ─── List Items Query ───────────────────────
export class ListItemsHttpQueryDTO {
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

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsOptional()
  @IsUUID()
  readonly productId?: string;
}
