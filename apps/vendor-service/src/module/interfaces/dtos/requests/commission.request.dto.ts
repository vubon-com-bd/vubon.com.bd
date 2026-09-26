import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommissionRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty({ example: 10 })
  rate!: number;

  @ApiProperty({ example: 'percentage' })
  type!: string;
}

export class CalculateCommissionRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  orderAmount!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;
}
