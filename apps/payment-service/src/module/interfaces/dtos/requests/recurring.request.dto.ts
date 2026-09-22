import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  IsPositive,
  IsInt,
  IsEnum,
  Length,
  MaxLength,
} from 'class-validator';

export enum RecurringFrequencyDto {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMIANNUALLY = 'semiannually',
  YEARLY = 'yearly',
}

export class CreateRecurringRequestDto {
  @ApiProperty()
  @IsUUID()
  paymentId!: string;

  @ApiProperty({ enum: RecurringFrequencyDto })
  @IsEnum(RecurringFrequencyDto)
  frequency!: RecurringFrequencyDto;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount!: number;

  @ApiProperty()
  @IsString()
  @Length(3, 3)
  currency!: string;

  @ApiProperty()
  @IsString()
  nextRunAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @IsPositive()
  maxCycles?: number;

  @ApiPropertyOptional()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

export class PauseRecurringRequestDto {
  @ApiProperty()
  @IsUUID()
  recurringId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

export class CancelRecurringRequestDto {
  @ApiProperty()
  @IsUUID()
  recurringId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
