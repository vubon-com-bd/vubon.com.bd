import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetShippingMethodHttpDTO {
  @ApiProperty({ example: 'standard', enum: ['standard', 'express', 'same_day', 'next_day', 'economy', 'pickup'] })
  readonly method!: string;

  @ApiProperty({ example: 100 })
  readonly cost!: number;

  @ApiProperty({ example: 'BDT' })
  readonly currency!: string;

  @ApiPropertyOptional({ example: 1000 })
  readonly freeShippingThreshold?: number;

  @ApiPropertyOptional() readonly addressId?: string;
}

export class CalculateShippingHttpDTO {
  @ApiPropertyOptional() readonly method?: string;
  @ApiPropertyOptional() readonly addressId?: string;
}
