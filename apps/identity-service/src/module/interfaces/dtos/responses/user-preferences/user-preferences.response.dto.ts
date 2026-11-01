import { ApiProperty } from '@nestjs/swagger';

export class UserPreferencesHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly emailNotifications!: boolean;
  @ApiProperty() readonly smsNotifications!: boolean;
  @ApiProperty() readonly pushNotifications!: boolean;
  @ApiProperty() readonly whatsappNotifications!: boolean;
  @ApiProperty() readonly orderUpdates!: boolean;
  @ApiProperty() readonly promotions!: boolean;
  @ApiProperty() readonly newsletter!: boolean;
  @ApiProperty() readonly productRecommendations!: boolean;
  @ApiProperty() readonly priceDropAlerts!: boolean;
  @ApiProperty() readonly backInStockAlerts!: boolean;
  @ApiProperty() readonly updatedAt!: string;
}
