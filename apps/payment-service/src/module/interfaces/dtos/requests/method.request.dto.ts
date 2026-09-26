import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class AddMethodRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  method!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  gateway?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  cardToken?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(4)
  cardLast4?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  cardBrand?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cardExpiry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  walletAddress?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class UpdateMethodRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  cardExpiry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  cardToken?: string;
}

export class SetDefaultMethodRequestDto {
  @ApiProperty()
  @IsUUID()
  methodId!: string;
}
