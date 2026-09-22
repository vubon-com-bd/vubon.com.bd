import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';

export class CreateSubscriptionRequestDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  plan!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  paymentMethodId?: string;

  @ApiProperty()
  @IsString()
  currentPeriodFrom!: string;

  @ApiProperty()
  @IsString()
  currentPeriodTo!: string;
}

export class UpgradeSubscriptionRequestDto {
  @ApiProperty()
  @IsUUID()
  subscriptionId!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  newPlan!: string;
}

export class CancelSubscriptionRequestDto {
  @ApiProperty()
  @IsUUID()
  subscriptionId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
