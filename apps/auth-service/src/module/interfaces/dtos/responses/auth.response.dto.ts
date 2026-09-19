import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { LoginResponseDTO } from '../../../application/dtos/responses/login-response.dto';
import type { RegisterResponseDTO } from '../../../application/dtos/responses/register-response.dto';

export class AuthLoginResponseDTO implements LoginResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty()
  user!: LoginResponseDTO['user'];

  @ApiProperty()
  session!: LoginResponseDTO['session'];

  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  expiresAt!: number;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';

  @ApiPropertyOptional()
  requiresMfa?: boolean;

  @ApiPropertyOptional()
  requiresVerification?: boolean;

  @ApiPropertyOptional()
  challengeId?: string;
}

export class AuthRegisterResponseDTO implements RegisterResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty()
  user!: RegisterResponseDTO['user'];

  @ApiProperty()
  requiresVerification!: boolean;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional()
  session?: RegisterResponseDTO['session'];

  @ApiPropertyOptional()
  accessToken?: string;

  @ApiPropertyOptional()
  refreshToken?: string;

  @ApiPropertyOptional()
  expiresAt?: number;

  @ApiPropertyOptional({ example: 'email' })
  verificationChannel?: 'email' | 'phone' | 'both';
}

export class AuthRefreshTokenResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  expiresAt!: number;

  @ApiProperty({ example: 'Bearer' })
  tokenType!: 'Bearer';

  @ApiProperty()
  refreshedAt!: string;
}
