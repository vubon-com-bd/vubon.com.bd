import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { CampaignSchemaType } from '@vubon/shared-schemas/marketing';

/**
 * Campaign response DTO — aligned with CampaignSchema (Zod-inferred).
 */
export type CampaignResponseDto = CampaignSchemaType;

export class CampaignPublicResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  type!: string;
}

export class CampaignPerformanceResponseDto {
  @ApiProperty()
  campaignId!: string;

  @ApiProperty()
  roi!: number;

  @ApiProperty()
  roas!: number;
}
