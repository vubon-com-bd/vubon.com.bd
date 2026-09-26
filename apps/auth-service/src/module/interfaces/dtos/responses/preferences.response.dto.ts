/**
 * PreferencesResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class PreferencesResponseDTO {
  @ApiProperty() userId!: string;
  @ApiProperty({ enum: ['light', 'dark', 'system'] }) theme!: string;
  @ApiProperty() currency!: string;
  @ApiProperty() dateFormat!: string;
  @ApiProperty() reduceMotion!: boolean;
  @ApiProperty() updatedAt!: string;
}
