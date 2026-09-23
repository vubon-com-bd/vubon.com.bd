import { ApiProperty } from '@nestjs/swagger';

export class AnalyticsResponseDto {
  @ApiProperty()
  metric!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  granularity!: string;

  @ApiProperty()
  recordedAt!: string;
}

export class MarketingOverviewResponseDto {
  @ApiProperty()
  totalCampaigns!: number;

  @ApiProperty()
  totalLeads!: number;

  @ApiProperty()
  totalRevenue!: number;
}
