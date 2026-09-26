import { ApiProperty } from '@nestjs/swagger';
import type { LoyaltySchemaType } from '@vubon/shared-schemas/marketing';

export type LoyaltyResponseDto = LoyaltySchemaType;

export class LoyaltyTierResponseDto {
  @ApiProperty()
  tier!: string;

  @ApiProperty()
  minPoints!: number;
}

export class LoyaltyRewardResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  pointsCost!: number;
}
