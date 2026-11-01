/**
 * Subscription HTTP Request DTOs
 * @module vendor-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export const PLAN_VALUES = ['free', 'basic', 'standard', 'premium', 'enterprise'] as const;
export const CYCLE_VALUES = ['monthly', 'quarterly', 'half_yearly', 'yearly', 'lifetime'] as const;

export class CreateSubscriptionHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly vendorId!: string;

  @ApiProperty({ enum: PLAN_VALUES })
  @IsEnum(PLAN_VALUES)
  readonly plan!: string;

  @ApiProperty({ enum: CYCLE_VALUES })
  @IsEnum(CYCLE_VALUES)
  readonly cycle!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly startTrial?: boolean;
}

export class UpgradeSubscriptionHttpDTO {
  @ApiProperty({ enum: PLAN_VALUES })
  @IsEnum(PLAN_VALUES)
  readonly plan!: string;
}

export class DowngradeSubscriptionHttpDTO {
  @ApiProperty({ enum: PLAN_VALUES })
  @IsEnum(PLAN_VALUES)
  readonly plan!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class CancelSubscriptionHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  readonly reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly cancelAtPeriodEnd?: boolean;
}
