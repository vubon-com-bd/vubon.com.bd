/**
 * Forgot Password HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ForgotPasswordHttpDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email or phone identifier',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  identifier!: string;

  @ApiPropertyOptional({
    enum: ['email', 'sms'],
    default: 'email',
  })
  @IsOptional()
  @IsEnum(['email', 'sms'])
  channel?: 'email' | 'sms';
}
