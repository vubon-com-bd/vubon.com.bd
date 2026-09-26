import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StartFulfillmentRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiPropertyOptional()
  vendorId?: string;
}

export class PackOrderRequestDto {
  @ApiProperty()
  fulfillmentId!: string;

  @ApiProperty()
  packedBy!: string;
}

export class ShipOrderRequestDto {
  @ApiProperty()
  fulfillmentId!: string;

  @ApiPropertyOptional()
  trackingNumber?: string;

  @ApiPropertyOptional()
  carrier?: string;
}

export class CompleteFulfillmentRequestDto {
  @ApiProperty()
  fulfillmentId!: string;
}

export class AllocateFulfillmentRequestDto {
  @ApiProperty()
  orderId!: string;

  @ApiPropertyOptional()
  vendorId?: string;
}
