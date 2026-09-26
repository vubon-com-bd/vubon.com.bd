/**
 * AuthResponseDTO — Swagger-decorated login response
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthSessionResponseShapeDTO {
  @ApiProperty() sessionId!: string;
  @ApiProperty() userId!: string;
  @ApiProperty() ipAddress!: string;
  @ApiProperty() userAgent!: string;
  @ApiPropertyOptional() deviceId?: string;
  @ApiProperty() createdAt!: string;
  @ApiProperty() expiresAt!: string;
  @ApiPropertyOptional() revokedAt?: string;
  @ApiProperty() isActive!: boolean;
}

export class AuthUserResponseShapeDTO {
  @ApiProperty() id!: string;
  @ApiProperty() email!: string;
  @ApiPropertyOptional() phone?: string;
  @ApiProperty() name!: string;
  @ApiProperty() status!: string;
  @ApiProperty() type!: string;
  @ApiProperty({ type: [String] }) roles!: string[];
  @ApiProperty() emailVerified!: boolean;
  @ApiProperty() phoneVerified!: boolean;
  @ApiProperty() mfaEnabled!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class AuthResponseDTO {
  @ApiProperty() success!: boolean;
  @ApiProperty({ type: AuthUserResponseShapeDTO }) user!: AuthUserResponseShapeDTO;
  @ApiProperty({ type: AuthSessionResponseShapeDTO }) session!: AuthSessionResponseShapeDTO;
  @ApiProperty() accessToken!: string;
  @ApiProperty() refreshToken!: string;
  @ApiProperty({ example: 'Bearer' }) tokenType!: 'Bearer';
  @ApiProperty({ example: 900 }) expiresAt!: number;
  @ApiPropertyOptional() requiresMfa?: boolean;
  @ApiPropertyOptional() requiresVerification?: boolean;
  @ApiPropertyOptional() challengeId?: string;
}
