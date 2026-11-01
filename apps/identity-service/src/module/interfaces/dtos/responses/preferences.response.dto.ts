import { ApiProperty } from '@nestjs/swagger';

export class PreferencesHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly newsletter!: boolean;
  @ApiProperty() readonly promotions!: boolean;
  @ApiProperty() readonly orderUpdates!: boolean;
  @ApiProperty() readonly productRecommendations!: boolean;
  @ApiProperty() readonly securityAlerts!: boolean;
  @ApiProperty() readonly updatedAt!: string;
}
