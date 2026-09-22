import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubscriptionRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty({ example: 'pro' })
  plan!: string;

  @ApiPropertyOptional()
  autoRenew?: boolean;
}

export class UpgradeSubscriptionRequestDto {
  @ApiProperty()
  subscriptionId!: string;

  @ApiProperty()
  plan!: string;
}

export class DowngradeSubscriptionRequestDto {
  @ApiProperty()
  subscriptionId!: string;

  @ApiProperty()
  plan!: string;
}

export class CancelSubscriptionRequestDto {
  @ApiProperty()
  subscriptionId!: string;

  @ApiPropertyOptional()
  reason?: string;
}
