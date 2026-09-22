import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  Length,
  MaxLength,
} from 'class-validator';

export class ApplyCouponRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty({ example: 'SAVE20' })
  @IsString()
  @Length(4, 32)
  code!: string;
}

export class RemoveCouponRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty()
  @IsString()
  @Length(4, 32)
  code!: string;
}

export class ValidateCouponRequestDto {
  @ApiProperty()
  @IsUUID()
  cartId!: string;

  @ApiProperty({ example: 'SAVE20' })
  @IsString()
  @Length(4, 32)
  code!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;
}
