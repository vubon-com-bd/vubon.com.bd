import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  Max,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class AddItemRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  vendorId?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(999)
  quantity!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class UpdateItemRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsUUID()
  itemId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

export class UpdateQuantityRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsUUID()
  itemId!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(999)
  quantity!: number;
}

export class SelectItemRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsUUID()
  itemId!: string;

  @ApiProperty()
  @IsBoolean()
  selected!: boolean;
}

export class RemoveItemRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsUUID()
  itemId!: string;
}
