import { ApiProperty } from '@nestjs/swagger';

export class CommissionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  rate!: number;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  orderAmount!: number;

  @ApiProperty()
  commissionAmount!: number;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  isSettled!: boolean;

  @ApiProperty()
  calculatedAt!: string;
}
