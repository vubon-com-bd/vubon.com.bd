import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FulfillmentResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiPropertyOptional()
  vendorId?: string | null;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  startedAt?: string | null;

  @ApiPropertyOptional()
  packedAt?: string | null;

  @ApiPropertyOptional()
  shippedAt?: string | null;

  @ApiPropertyOptional()
  completedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
