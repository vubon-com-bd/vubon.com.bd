/**
 * Address Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { USER_ADDRESS_TYPE, USER_ADDRESS } from '@vubon/shared-constants/user';

export class AddAddressRequestDto {
  @ApiProperty({ enum: Object.values(USER_ADDRESS_TYPE) })
  @IsEnum(Object.values(USER_ADDRESS_TYPE) as string[])
  type!: string;

  @ApiProperty({ example: 'House 12, Road 5, Dhanmondi' })
  @IsString()
  @MinLength(USER_ADDRESS.LINE_MIN_LENGTH)
  @MaxLength(USER_ADDRESS.LINE_MAX_LENGTH)
  line1!: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  line2?: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString() @MaxLength(USER_ADDRESS.CITY_MAX_LENGTH)
  city!: string;

  @ApiPropertyOptional({ example: 'Dhaka' }) @IsOptional() @IsString()
  district?: string;

  @ApiPropertyOptional({ example: 'Dhaka' }) @IsOptional() @IsString()
  division?: string;

  @ApiProperty({ example: '1209' })
  @IsString() @MaxLength(4)
  postalCode!: string;

  @ApiPropertyOptional({ example: 'BD' }) @IsOptional() @IsString()
  country?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isDefaultShipping?: boolean;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isDefaultBilling?: boolean;
}

export class UpdateAddressRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  type?: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MinLength(USER_ADDRESS.LINE_MIN_LENGTH)
  line1?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  line2?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  city?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  district?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  division?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  postalCode?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isDefault?: boolean;
}
