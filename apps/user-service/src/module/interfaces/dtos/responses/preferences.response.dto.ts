/**
 * Preferences Response DTO
 */
import { ApiProperty } from '@nestjs/swagger';

export class ChannelPreferenceDto {
  @ApiProperty() channel!: string;
  @ApiProperty() enabled!: boolean;
}

export class PreferencesResponseDto {
  @ApiProperty() userId!: string;
  @ApiProperty() newsletter!: boolean;
  @ApiProperty() promotions!: boolean;
  @ApiProperty() orderUpdates!: boolean;
  @ApiProperty() productRecommendations!: boolean;
  @ApiProperty() securityAlerts!: boolean;
  @ApiProperty({ type: [ChannelPreferenceDto] }) channels!: readonly ChannelPreferenceDto[];
  @ApiProperty() updatedAt!: string;
}
