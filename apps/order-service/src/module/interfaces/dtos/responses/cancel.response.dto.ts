import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CancelResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  reason!: string;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  approvedAt?: string | null;

  @ApiPropertyOptional()
  rejectedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
