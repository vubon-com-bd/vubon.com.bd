/**
 * VerificationRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VerifyEmailRequestDTO {
  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ pattern: '^\\d{4,8}$' })
  code!: string;
}

export class ResendVerificationRequestDTO {
  @ApiProperty({ minLength: 3, maxLength: 255 })
  identifier!: string;

  @ApiPropertyOptional({ enum: ['email', 'phone'], default: 'email' })
  channel?: 'email' | 'phone';
}
