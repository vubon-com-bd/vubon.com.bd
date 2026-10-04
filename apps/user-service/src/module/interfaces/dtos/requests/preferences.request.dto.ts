/**
 * Preferences Request DTOs
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdatePreferencesRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() newsletter?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() promotions?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() orderUpdates?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() productRecommendations?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() securityAlerts?: boolean;
}
