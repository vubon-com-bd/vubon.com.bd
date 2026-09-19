import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthLoginRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  identifier!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  password!: string;

  @ApiPropertyOptional({ example: false })
  rememberMe?: boolean;

  @ApiPropertyOptional()
  deviceId?: string;

  @ApiPropertyOptional()
  mfaCode?: string;
}

export class AuthRegisterRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  password!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  confirmPassword!: string;

  @ApiProperty({ example: true })
  acceptTerms!: true;

  @ApiPropertyOptional({ example: false })
  acceptMarketing?: boolean;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  deviceId?: string;
}

export class AuthRefreshTokenRequestDTO {
  @ApiProperty()
  refreshToken!: string;
}

export class AuthForgotPasswordRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;
}

export class AuthResetPasswordRequestDTO {
  @ApiProperty()
  token!: string;

  @ApiProperty()
  newPassword!: string;

  @ApiProperty()
  confirmPassword!: string;
}

export class AuthVerifyEmailRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  code!: string;
}

export class AuthResendVerificationRequestDTO {
  @ApiProperty()
  email!: string;
}
