/**
 * Subscription HTTP Request DTOs
 * @module payment-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  PAYMENT_METHOD,
} from '@vubon/shared-constants/business/payment';

const METHOD_VALUES = Object.values(PAYMENT_METHOD) as string[];
const PLAN_VALUES = ['free', 'basic', 'standard', 'premium', 'enterprise', 'custom'];
const INTERVAL_VALUES = ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'];

export class CreateSubscriptionHttpDTO {
  @ApiProperty({ enum: PLAN_VALUES, example: 'premium' })
  @IsEnum(PLAN_VALUES)
  readonly plan!: string;

  @ApiProperty({ enum: INTERVAL_VALUES, example: 'monthly' })
  @IsEnum(INTERVAL_VALUES)
  readonly interval!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Max(365)
  readonly intervalCount!: number;

  @ApiProperty({ example: 999.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly price!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiProperty({ enum: METHOD_VALUES })
  @IsEnum(METHOD_VALUES)
  readonly method!: string;

  @ApiPropertyOptional({ example: 'stripe' })
  @IsOptional()
  @IsString()
  readonly gateway?: string;

  @ApiPropertyOptional({ example: 7 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  readonly trialDays?: number;
}

export class UpgradeSubscriptionHttpDTO {
  @ApiProperty({ enum: PLAN_VALUES })
  @IsEnum(PLAN_VALUES)
  readonly newPlan!: string;

  @ApiProperty({ example: 1999.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly newPrice!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly prorate?: boolean;
}

export class DowngradeSubscriptionHttpDTO {
  @ApiProperty({ enum: PLAN_VALUES })
  @IsEnum(PLAN_VALUES)
  readonly newPlan!: string;

  @ApiProperty({ example: 499.0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  readonly newPrice!: number;

  @ApiProperty({ example: 'BDT' })
  @IsString()
  @Length(3, 3)
  readonly currency!: string;

  @ApiPropertyOptional({ enum: ['immediate', 'period_end'] })
  @IsOptional()
  @IsEnum(['immediate', 'period_end'])
  readonly effectiveAt?: 'immediate' | 'period_end';
}

export class PauseSubscriptionHttpDTO {
  @ApiPropertyOptional({ example: '2024-12-01T00:00:00Z' })
  @IsOptional()
  @IsString()
  readonly resumeAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class CancelSubscriptionHttpDTO {
  @ApiProperty({ example: 'Customer requested cancellation' })
  @IsString()
  @MinLength(3)
  readonly reason!: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  readonly cancelAtPeriodEnd!: boolean;
}

export class ListSubscriptionsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ enum: PLAN_VALUES })
  @IsOptional()
  @IsEnum(PLAN_VALUES)
  readonly plan?: string;
}
