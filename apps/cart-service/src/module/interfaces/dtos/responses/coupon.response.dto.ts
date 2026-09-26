import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CouponResponseDto {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  valid!: boolean;

  @ApiPropertyOptional()
  discountType?: 'percentage' | 'fixed';

  @ApiPropertyOptional()
  discount?: number;

  @ApiPropertyOptional()
  reason?: string;
}
