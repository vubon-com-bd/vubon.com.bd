import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  IsPositive,
  IsArray,
  ValidateNested,
  IsEnum,
  Max,
  Length,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum SplitTypeDto {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
  FLAT = 'flat',
  TIERED = 'tiered',
}

export class SplitShareDto {
  @ApiProperty()
  @IsUUID()
  recipientId!: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Max(100)
  percentage!: number;
}

export class CreateSplitPaymentRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiProperty({ enum: SplitTypeDto })
  @IsEnum(SplitTypeDto)
  splitType!: SplitTypeDto;

  @ApiProperty({ type: [SplitShareDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => SplitShareDto)
  shares!: SplitShareDto[];

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: Record<string, unknown>;
}
