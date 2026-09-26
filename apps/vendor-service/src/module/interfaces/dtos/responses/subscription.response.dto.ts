import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  plan!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  startedAt!: string;

  @ApiProperty()
  expiresAt!: string;

  @ApiProperty()
  autoRenew!: boolean;

  @ApiProperty({ nullable: true })
  cancelledAt!: string | null;

  @ApiProperty()
  isActive!: boolean;
}
