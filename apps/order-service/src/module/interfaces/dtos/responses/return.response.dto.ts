import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReturnResponseDto {
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

  @ApiPropertyOptional()
  completedAt?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
