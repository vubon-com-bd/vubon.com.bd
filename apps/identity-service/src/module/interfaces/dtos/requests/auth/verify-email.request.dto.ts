/**
 * Verify Email HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyEmailHttpDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiProperty({ example: 'abc123def456...' })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  token!: string;
}

export class ResendVerificationHttpDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @ApiPropertyOptional({
    enum: ['email', 'phone'],
    default: 'email',
  })
  @IsOptional()
  @IsString()
  channel?: string;
}
