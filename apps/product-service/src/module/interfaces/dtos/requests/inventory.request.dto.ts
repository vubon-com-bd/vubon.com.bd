import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInventoryHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty({ example: 100 })
  quantity!: number;
}

export class AdjustInventoryHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty({ example: 10 })
  delta!: number;

  @ApiPropertyOptional()
  reason?: string;
}

export class ReserveInventoryHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  orderId!: string;
}

export class ReleaseInventoryHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  orderId!: string;
}
