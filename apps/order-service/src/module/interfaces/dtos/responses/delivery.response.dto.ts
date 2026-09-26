import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DeliveryResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  methodId?: string | null;

  @ApiPropertyOptional()
  scheduledAt?: string | null;

  @ApiPropertyOptional()
  attemptedAt?: string | null;

  @ApiPropertyOptional()
  deliveredAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
