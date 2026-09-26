/**
 * RecoveryCodeRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateRecoveryCodesRequestDTO {
  @ApiProperty({ minLength: 1, maxLength: 128 })
  password!: string;

  @ApiPropertyOptional({ default: 10, minimum: 6, maximum: 20 })
  count?: number;
}

export class RecoverAccountRequestDTO {
  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: 'ABCD-1234', pattern: '^[A-Z0-9]{4}-[A-Z0-9]{4}$' })
  recoveryCode!: string;

  @ApiProperty({ minLength: 8, maxLength: 128 })
  newPassword!: string;

  @ApiProperty({ minLength: 1 })
  confirmPassword!: string;
}
