import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export enum CartTypeDto {
  GUEST = 'guest',
  USER = 'user',
  WISHLIST = 'wishlist',
  SAVED = 'saved',
  SUBSCRIPTION = 'subscription',
}

export class CreateCartRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiProperty({ enum: CartTypeDto })
  @IsEnum(CartTypeDto)
  type!: CartTypeDto;
}

export class UpdateCartRequestDto {
  @ApiPropertyOptional({ enum: CartTypeDto })
  @IsOptional()
  @IsEnum(CartTypeDto)
  type?: CartTypeDto;
}

export class RecoverCartRequestDto {
  @ApiProperty()
  @IsUUID()
  abandonedCartId!: string;
}

export class ClearCartRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  keepSaved?: boolean;
}
