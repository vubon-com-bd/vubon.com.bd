import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefundResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  paymentId!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional()
  processedAt?: string;

  @ApiProperty()
  createdAt!: string;
}
