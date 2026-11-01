/**
 * Add Address HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const ADDRESS_TYPES = ['home', 'office', 'billing', 'shipping', 'other'] as const;

export class AddAddressHttpDTO {
  @ApiProperty({ enum: ADDRESS_TYPES, example: 'home' })
  @IsEnum(ADDRESS_TYPES)
  type!: (typeof ADDRESS_TYPES)[number];

  @ApiPropertyOptional({ example: 'Home' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  label?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @Matches(/^(\+880|880|0)1[3-9]\d{8}$/)
  phone!: string;

  @ApiProperty({ example: 'House 12, Road 5, Dhanmondi' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  addressLine1!: string;

  @ApiPropertyOptional({ example: 'Apt 4B' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  addressLine2?: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city!: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  state!: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  division!: string;

  @ApiProperty({ example: 'Dhaka' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  district!: string;

  @ApiPropertyOptional({ example: 'Dhanmondi' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  upazila?: string;

  @ApiProperty({ example: '1205' })
  @IsString()
  @Matches(/^\d{4}$/)
  postalCode!: string;

  @ApiProperty({ example: 'BD', default: 'BD' })
  @IsString()
  @MaxLength(2)
  country!: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDefaultShipping?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isDefaultBilling?: boolean;
}
