import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsEnum,
  IsNumber,
  Min,
  Length,
} from 'class-validator';

export enum ShippingMethodDto {
  STANDARD = 'standard',
  EXPRESS = 'express',
  OVERNIGHT = 'overnight',
  SAME_DAY = 'same_day',
  PICKUP = 'pickup',
  INTERNATIONAL = 'international',
}

export class SetShippingMethodRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty({ enum: ShippingMethodDto })
  @IsEnum(ShippingMethodDto)
  method!: ShippingMethodDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  addressId?: string;
}

export class CalculateShippingRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  addressId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 60)
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  subtotal?: number;
}
