import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { SsoLoginResponseDTO } from '../../../application/dtos/responses/sso-login-response.dto';

export class SsoLoginResponseDTO_ implements SsoLoginResponseDTO {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  isNewUser!: boolean;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  sessionId?: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  attributes?: Record<string, string>;
}
