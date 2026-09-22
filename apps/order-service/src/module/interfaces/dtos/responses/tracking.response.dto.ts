import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TrackingResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  trackingNumber?: string | null;

  @ApiPropertyOptional()
  carrier?: string | null;

  @ApiProperty({ type: 'array', items: { type: 'object' } })
  events!: ReadonlyArray<Record<string, unknown>>;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
