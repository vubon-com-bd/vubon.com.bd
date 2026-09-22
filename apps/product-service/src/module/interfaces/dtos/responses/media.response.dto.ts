import { ApiProperty } from '@nestjs/swagger';

export class MediaHttpResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  productId!: string;

  @ApiProperty()
  url!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  order!: number;
}
