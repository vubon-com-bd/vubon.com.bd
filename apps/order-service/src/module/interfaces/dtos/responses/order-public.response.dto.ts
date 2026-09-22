import { ApiProperty } from '@nestjs/swagger';

export class OrderPublicResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  orderNumber!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  total!: number;

  @ApiProperty({ example: 'BDT' })
  currency!: string;

  @ApiProperty()
  createdAt!: string;
}
