import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderNumber!: string;

  @ApiProperty()
  customerId!: string;

  @ApiPropertyOptional()
  vendorId?: string | null;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  channel!: string;

  @ApiProperty()
  source!: string;

  @ApiProperty()
  subtotal!: number;

  @ApiProperty()
  discount!: number;

  @ApiProperty()
  tax!: number;

  @ApiProperty()
  shipping!: number;

  @ApiProperty()
  total!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiPropertyOptional()
  note?: string | null;

  @ApiPropertyOptional()
  paymentId?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
