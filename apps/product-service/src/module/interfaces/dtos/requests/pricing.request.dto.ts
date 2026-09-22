import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePriceHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty({ example: 1500 })
  amount!: number;

  @ApiPropertyOptional({ example: 'BDT' })
  currency?: string;
}

export class CreatePricingRuleHttpDto {
  @ApiProperty()
  productId!: string;

  @ApiProperty({ example: 'discount' })
  ruleType!: string;

  @ApiProperty()
  value!: string;

  @ApiPropertyOptional()
  startAt?: string;

  @ApiPropertyOptional()
  endAt?: string;
}

export class UpdatePricingRuleHttpDto {
  @ApiProperty()
  ruleId!: string;

  @ApiProperty()
  value!: string;
}
