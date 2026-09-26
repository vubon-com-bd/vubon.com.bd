/**
 * UserSettingsResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface UserSettingsResponseDTO {
  readonly userId: string;
  readonly twoFactorEnabled: boolean;
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingEmails: boolean;
  readonly language: string;
  readonly timezone: string;
  readonly updatedAt: string;
}
