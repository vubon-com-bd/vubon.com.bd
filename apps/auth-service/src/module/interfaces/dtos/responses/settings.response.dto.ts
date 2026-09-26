/**
 * SettingsResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class SettingsResponseDTO {
  @ApiProperty() userId!: string;
  @ApiProperty() twoFactorEnabled!: boolean;
  @ApiProperty() emailNotifications!: boolean;
  @ApiProperty() smsNotifications!: boolean;
  @ApiProperty() pushNotifications!: boolean;
  @ApiProperty() marketingEmails!: boolean;
  @ApiProperty() language!: string;
  @ApiProperty() timezone!: string;
  @ApiProperty() updatedAt!: string;
}
