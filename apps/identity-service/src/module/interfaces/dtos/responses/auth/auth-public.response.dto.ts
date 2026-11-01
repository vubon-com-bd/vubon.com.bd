/**
 * Auth Public Response DTO
 * @module identity-service/interfaces/dtos/responses/auth
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthPublicHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty() readonly provider!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isEmailVerified!: boolean;
  @ApiProperty() readonly isPhoneVerified!: boolean;
  @ApiProperty() readonly isMfaEnabled!: boolean;
  @ApiPropertyOptional() readonly lastLoginAt?: string;
}
