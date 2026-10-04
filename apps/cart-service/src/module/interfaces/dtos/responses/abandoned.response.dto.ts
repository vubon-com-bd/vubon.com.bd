import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AbandonedCartHttpDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly cartId!: string;
  @ApiPropertyOptional() readonly userId?: string;
  @ApiPropertyOptional() readonly email?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly reminderType!: string;
  @ApiProperty() readonly itemCount!: number;
  @ApiProperty() readonly cartValue!: number;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly abandonedAt!: string;
  @ApiProperty() readonly remindersSent!: number;
  @ApiPropertyOptional() readonly lastReminderAt?: string;
  @ApiPropertyOptional() readonly recoveredAt?: string;
  @ApiPropertyOptional() readonly recoveredOrderId?: string;
}

export class AbandonedStatsHttpDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly pending!: number;
  @ApiProperty() readonly reminded!: number;
  @ApiProperty() readonly recovered!: number;
  @ApiProperty() readonly lost!: number;
  @ApiProperty() readonly recoveryRate!: number;
  @ApiProperty() readonly averageCartValue!: number;
}
