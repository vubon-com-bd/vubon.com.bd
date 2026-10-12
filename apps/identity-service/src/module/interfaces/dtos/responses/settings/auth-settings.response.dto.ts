/**
 * Auth Settings Response DTO
 * @module identity-service/interfaces/dtos/responses/settings
 */
import { ApiProperty } from '@nestjs/swagger';

export class AuthSettingsHttpResponseDTO {
  @ApiProperty() readonly twoFactorRequired!: boolean;
  @ApiProperty() readonly sessionTimeoutSeconds!: number;
  @ApiProperty() readonly passwordExpiryDays!: number;
  @ApiProperty() readonly passwordHistoryCount!: number;
  @ApiProperty() readonly loginAlertsEnabled!: boolean;
  @ApiProperty() readonly maxLoginAttempts!: number;
  @ApiProperty() readonly lockoutDurationSeconds!: number;
  @ApiProperty({ type: [String] }) readonly allowedIpRanges!: readonly string[];
  @ApiProperty() readonly mfaRequired!: boolean;
}
