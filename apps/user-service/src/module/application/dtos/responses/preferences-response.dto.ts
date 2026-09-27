/**
 * PreferencesResponseDTO
 */
export interface PreferencesResponseDTO {
  readonly userId: string;
  readonly newsletter: boolean;
  readonly promotions: boolean;
  readonly orderUpdates: boolean;
  readonly productRecommendations: boolean;
  readonly securityAlerts: boolean;
  readonly channels: readonly {
    readonly channel: string;
    readonly enabled: boolean;
  }[];
  readonly updatedAt: string;
}
