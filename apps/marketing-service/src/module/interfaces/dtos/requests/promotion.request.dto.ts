import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePromotionRequestDTO {
  @ApiProperty({ example: 'Summer Coupon', minLength: 3, maxLength: 200 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name!: string;

  @ApiProperty({ example: 'SUMMER26', minLength: 3, maxLength: 32 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  code!: string;

  @ApiProperty({ example: 'coupon' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  maxUsage?: number;

  @ApiPropertyOptional({ example: '2026-06-01T00:00:00.000Z' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-06-30T23:59:59.000Z' })
  @IsOptional()
  @IsString()
  endDate?: string;
}

export class ApplyPromotionRequestDTO {
  @ApiProperty({ example: 'SUMMER26' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: 1500.5 })
  @IsNumber()
  @Min(0)
  orderAmount!: number;
}
