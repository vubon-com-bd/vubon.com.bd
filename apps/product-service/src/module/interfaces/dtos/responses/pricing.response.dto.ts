import { ApiProperty } from '@nestjs/swagger';

export class PricingHttpResponseDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  currency!: string;
}
