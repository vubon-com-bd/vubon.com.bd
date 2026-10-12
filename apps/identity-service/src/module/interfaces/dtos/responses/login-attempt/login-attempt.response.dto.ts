/**
 * Login Attempt Response DTO
 * @module identity-service/interfaces/dtos/responses/login-attempt
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginAttemptHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly identifier!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly ipAddress?: string;
  @ApiPropertyOptional() readonly userAgent?: string;
  @ApiPropertyOptional() readonly failureReason?: string;
  @ApiProperty() readonly attemptedAt!: string;
}
