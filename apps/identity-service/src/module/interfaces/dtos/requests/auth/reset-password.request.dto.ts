/**
 * Reset Password HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordHttpDTO {
  @ApiProperty({
    example: 'abc123def456...',
    description: 'Reset token from email',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  token!: string;

  @ApiProperty({
    example: 'NewStrongP@ss123',
    minLength: 8,
    maxLength: 128,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      'Password must contain uppercase, lowercase, number, and special character',
  })
  newPassword!: string;

  @ApiProperty({ example: 'NewStrongP@ss123' })
  @IsString()
  @MinLength(1)
  confirmPassword!: string;
}
