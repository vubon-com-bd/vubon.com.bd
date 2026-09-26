import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InventoryHttpResponseDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  reserved!: number;

  @ApiProperty()
  available!: number;

  @ApiProperty()
  status!: string;
}
