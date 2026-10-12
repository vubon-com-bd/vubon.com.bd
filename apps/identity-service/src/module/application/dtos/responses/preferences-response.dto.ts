/**
 * Preferences Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface PreferencesResponseDTO {
  readonly userId: string;
  readonly newsletter: boolean;
  readonly promotions: boolean;
  readonly orderUpdates: boolean;
  readonly productRecommendations: boolean;
  readonly securityAlerts: boolean;
  readonly updatedAt: string;
}
