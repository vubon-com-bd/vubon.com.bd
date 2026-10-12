import { ApiProperty } from '@nestjs/swagger';

export class UserSettingsHttpResponseDTO {
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly language!: string;
  @ApiProperty() readonly timezone!: string;
  @ApiProperty() readonly currency!: string;
  @ApiProperty() readonly dateFormat!: string;
  @ApiProperty() readonly timeFormat!: string;
  @ApiProperty() readonly theme!: string;
  @ApiProperty() readonly notificationsEnabled!: boolean;
  @ApiProperty() readonly marketingEmails!: boolean;
  @ApiProperty() readonly securityAlerts!: boolean;
  @ApiProperty() readonly loginAlerts!: boolean;
  @ApiProperty() readonly twoFactorRequired!: boolean;
  @ApiProperty() readonly sessionTimeout!: number;
  @ApiProperty() readonly updatedAt!: string;
}
