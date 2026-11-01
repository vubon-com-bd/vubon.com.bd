/**
 * Saved For Later HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

// ─── Save For Later ─────────────────────────
export class SaveForLaterHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly itemId!: string;

  @ApiPropertyOptional({ example: 'Save this for later' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly note?: string;
}

// ─── Move To Cart ───────────────────────────
export class MoveToCartHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly cartId!: string;

  @ApiPropertyOptional({ example: 1, minimum: 1, maximum: 999 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(999)
  readonly quantity?: number;
}

// ─── Remove Saved ───────────────────────────
export class RemoveSavedHttpDTO {
  @ApiPropertyOptional({ example: 'No longer interested' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  readonly reason?: string;
}

// ─── List Saved Query ───────────────────────
export class ListSavedHttpQueryDTO {
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
}
