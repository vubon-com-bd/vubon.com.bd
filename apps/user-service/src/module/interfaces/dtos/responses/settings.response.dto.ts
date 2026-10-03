/**
 * Settings Response DTO
 */
import { ApiProperty } from '@nestjs/swagger';

export class SettingsResponseDto {
  @ApiProperty() userId!: string;
  @ApiProperty() theme!: string;
  @ApiProperty() language!: string;
  @ApiProperty() locale!: string;
  @ApiProperty() timezone!: string;
  @ApiProperty() currency!: string;
  @ApiProperty() dateFormat!: string;
  @ApiProperty() timeFormat!: string;
  @ApiProperty() itemsPerPage!: number;
  @ApiProperty() notifications!: boolean;
  @ApiProperty() twoFactor!: boolean;
  @ApiProperty() updatedAt!: string;
}
