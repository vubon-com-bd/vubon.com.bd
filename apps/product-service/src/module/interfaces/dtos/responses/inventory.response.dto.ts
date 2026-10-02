/**
 * Inventory Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InventoryResponseDTO {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly productId!: string;

  @ApiPropertyOptional()
  readonly variantId?: string;

  @ApiProperty()
  readonly sku!: string;

  @ApiProperty()
  readonly quantity!: number;

  @ApiProperty()
  readonly reserved!: number;

  @ApiProperty()
  readonly available!: number;

  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly lowStockThreshold!: number;

  @ApiProperty()
  readonly trackQuantity!: boolean;

  @ApiProperty()
  readonly allowBackorder!: boolean;

  @ApiPropertyOptional()
  readonly locationId?: string;

  @ApiPropertyOptional()
  readonly lastRestockedAt?: string;

  @ApiProperty()
  readonly updatedAt!: string;
}
