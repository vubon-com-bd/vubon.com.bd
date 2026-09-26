import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscriptionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  plan!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  currentPeriodFrom!: string;

  @ApiProperty()
  currentPeriodTo!: string;

  @ApiPropertyOptional()
  cancelledAt?: string;

  @ApiProperty()
  createdAt!: string;
}
