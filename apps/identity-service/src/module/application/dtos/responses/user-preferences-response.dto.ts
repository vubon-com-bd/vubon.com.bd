/**
 * User Preferences Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserPreferencesResponseDTO {
  readonly userId: string;
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly whatsappNotifications: boolean;
  readonly orderUpdates: boolean;
  readonly promotions: boolean;
  readonly newsletter: boolean;
  readonly productRecommendations: boolean;
  readonly priceDropAlerts: boolean;
  readonly backInStockAlerts: boolean;
  readonly updatedAt: string;
}
