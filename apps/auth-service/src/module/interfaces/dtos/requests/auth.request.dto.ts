/**
 * AuthRequestDTO — HTTP shape for auth login/register
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthRequestDTO {
  @ApiProperty({ example: 'user@example.com', description: 'Email or phone' })
  identifier!: string;

  @ApiProperty({ example: 'StrongP@ss123', minLength: 8, maxLength: 128 })
  password!: string;

  @ApiPropertyOptional({ example: true })
  rememberMe?: boolean;

  @ApiPropertyOptional({ example: 'device-uuid' })
  deviceId?: string;

  @ApiPropertyOptional({ example: '123456', description: 'MFA code if required' })
  mfaCode?: string;
}
