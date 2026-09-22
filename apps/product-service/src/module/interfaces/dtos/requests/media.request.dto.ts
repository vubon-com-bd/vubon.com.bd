import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddMediaHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty({ example: 'image' })
  mediaType!: string;
}

export class ReorderMediaHttpDto {
  @ApiProperty()
  order!: number;
}
