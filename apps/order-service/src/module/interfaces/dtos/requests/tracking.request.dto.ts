import { ApiProperty } from '@nestjs/swagger';

export class AddTrackingRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  trackingNumber!: string;

  @ApiProperty()
  carrier!: string;
}

export class UpdateTrackingRequestDto {
  @ApiProperty()
  trackingId!: string;

  @ApiProperty()
  status!: string;
}

export class RemoveTrackingRequestDto {
  @ApiProperty()
  trackingId!: string;
}
