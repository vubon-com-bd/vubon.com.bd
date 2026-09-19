import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { SocialLoginResponseDTO } from '../../../application/dtos/responses/social-login-response.dto';

export class SocialLoginResponseDTO_ implements SocialLoginResponseDTO {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  isEmailVerified!: boolean;

  @ApiProperty()
  isNewUser!: boolean;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  error?: string;

  @ApiPropertyOptional()
  accessToken?: string;

  @ApiPropertyOptional()
  refreshToken?: string;
}
