import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserCreateRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'StrongP@ss123' })
  password!: string;

  @ApiProperty({ example: true })
  acceptTerms!: true;

  @ApiProperty({ example: true })
  sendVerificationEmail!: boolean;

  @ApiProperty({ example: 'customer' })
  type!: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  role?: string;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  username?: string;
}

export class UserUpdateRequestDTO {
  @ApiPropertyOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  isMfaEnabled?: boolean;

  @ApiPropertyOptional()
  username?: string;

  @ApiPropertyOptional()
  phoneVerified?: boolean;
}

export class UserDeleteRequestDTO {
  @ApiProperty()
  userId!: string;
}

export class UserGetRequestDTO {
  @ApiProperty()
  userId!: string;
}
