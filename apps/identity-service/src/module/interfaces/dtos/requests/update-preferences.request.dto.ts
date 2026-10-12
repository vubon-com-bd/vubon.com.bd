import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePreferencesHttpDTO {
  @ApiPropertyOptional() @IsOptional() @IsBoolean() newsletter?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() promotions?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() orderUpdates?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() productRecommendations?: boolean;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() securityAlerts?: boolean;
}
