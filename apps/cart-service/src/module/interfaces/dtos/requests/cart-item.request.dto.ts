/**
 * Cart Item HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddItemHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly productId!: string;

  @ApiPropertyOptional() readonly variantId?: string;
  @ApiPropertyOptional() readonly vendorId?: string;

  @ApiProperty({ example: 'WBH-00001' })
  readonly sku!: string;

  @ApiProperty({ example: 'Wireless Bluetooth Headphones' })
  readonly name!: string;

  @ApiPropertyOptional() readonly imageUrl?: string;

  @ApiProperty({ example: 2499.99 })
  readonly unitPrice!: number;

  @ApiPropertyOptional({ example: 3499.99 })
  readonly compareAtPrice?: number;

  @ApiProperty({ example: 1, minimum: 1, maximum: 999 })
  readonly quantity!: number;

  @ApiProperty({ example: 'BDT', minLength: 3, maxLength: 3 })
  readonly currency!: string;

  @ApiPropertyOptional() readonly attributes?: Readonly<Record<string, string>>;
}

export class UpdateItemHttpDTO {
  @ApiPropertyOptional({ minimum: 1 }) readonly quantity?: number;
  @ApiPropertyOptional() readonly unitPrice?: number;
  @ApiPropertyOptional() readonly discountAmount?: number;
  @ApiPropertyOptional() readonly attributes?: Readonly<Record<string, string>>;
}

export class RemoveItemHttpDTO {
  @ApiPropertyOptional() readonly removedBy?: string;
}

export class UpdateQuantityHttpDTO {
  @ApiProperty({ example: 2, minimum: 1, maximum: 999 })
  readonly quantity!: number;

  @ApiPropertyOptional() readonly reason?: string;
}

export class SelectItemHttpDTO {
  @ApiProperty({ example: true })
  readonly selected!: boolean;
}

export class MoveToSavedHttpDTO {
  @ApiPropertyOptional({ example: 'gift idea for later' })
  readonly notes?: string;
}
