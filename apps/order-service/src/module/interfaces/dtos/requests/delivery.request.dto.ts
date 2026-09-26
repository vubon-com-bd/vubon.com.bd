import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ScheduleDeliveryRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty({ example: 'standard' })
  deliveryType!: string;

  @ApiPropertyOptional()
  methodId?: string;

  @ApiPropertyOptional()
  scheduledAt?: string;
}

export class RescheduleDeliveryRequestDto {
  @ApiProperty()
  deliveryId!: string;

  @ApiProperty()
  scheduledAt!: string;
}

export class ConfirmDeliveryRequestDto {
  @ApiProperty()
  deliveryId!: string;
}

export class AddTrackingToDeliveryRequestDto {
  @ApiProperty()
  deliveryId!: string;

  @ApiProperty()
  trackingNumber!: string;

  @ApiProperty()
  carrier!: string;
}
