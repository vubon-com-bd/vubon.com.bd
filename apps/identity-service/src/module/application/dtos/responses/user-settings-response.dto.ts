/**
 * User Settings Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserSettingsResponseDTO {
  readonly userId: string;
  readonly language: string;
  readonly timezone: string;
  readonly currency: string;
  readonly dateFormat: string;
  readonly timeFormat: string;
  readonly theme: string;
  readonly notificationsEnabled: boolean;
  readonly marketingEmails: boolean;
  readonly securityAlerts: boolean;
  readonly loginAlerts: boolean;
  readonly twoFactorRequired: boolean;
  readonly sessionTimeout: number;
  readonly updatedAt: string;
}
