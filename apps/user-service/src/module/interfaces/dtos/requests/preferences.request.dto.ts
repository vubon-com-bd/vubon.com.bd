import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePreferencesRequestDto {
  @ApiPropertyOptional()
  newsletter?: boolean;

  @ApiPropertyOptional()
  promotions?: boolean;

  @ApiPropertyOptional()
  orderUpdates?: boolean;

  @ApiPropertyOptional()
  productRecommendations?: boolean;

  @ApiPropertyOptional()
  securityAlerts?: boolean;
}

export class ResetPreferencesRequestDto {
  @ApiProperty()
  userId!: string;
}
