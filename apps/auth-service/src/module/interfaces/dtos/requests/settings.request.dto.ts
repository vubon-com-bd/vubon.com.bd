/**
 * SettingsRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsRequestDTO {
  @ApiPropertyOptional()
  emailNotifications?: boolean;

  @ApiPropertyOptional()
  smsNotifications?: boolean;

  @ApiPropertyOptional()
  pushNotifications?: boolean;

  @ApiPropertyOptional()
  marketingEmails?: boolean;

  @ApiPropertyOptional()
  twoFactorEnabled?: boolean;

  @ApiPropertyOptional()
  language?: string;

  @ApiPropertyOptional()
  timezone?: string;
}
