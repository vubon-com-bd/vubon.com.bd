import { ApiPropertyOptional } from '@nestjs/swagger';

export class PreferencesUpdateRequestDTO {
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
