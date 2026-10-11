/**
 * Preference HTTP Response DTOs
 * @module notification-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PreferenceHttpResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() channelPreferences!: Readonly<Record<string, boolean>>;
  @ApiProperty() categoryPreferences!: Readonly<Record<string, boolean>>;
  @ApiProperty() quietHoursEnabled!: boolean;
  @ApiPropertyOptional() quietHoursStart?: number;
  @ApiPropertyOptional() quietHoursEnd?: number;
  @ApiProperty() timezone!: string;
  @ApiPropertyOptional() locale?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}
