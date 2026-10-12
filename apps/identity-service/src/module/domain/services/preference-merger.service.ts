/**
 * PreferenceMergerService — merges user + system defaults
 * @module identity-service/domain/services
 */
import { PREFERENCES_CONFIG } from '@vubon/shared-config/user';

export interface PreferenceData {
  readonly newsletter: boolean;
  readonly promotions: boolean;
  readonly orderUpdates: boolean;
  readonly productRecommendations: boolean;
  readonly securityAlerts: boolean;
}

export interface PreferencePatch {
  readonly newsletter?: boolean;
  readonly promotions?: boolean;
  readonly orderUpdates?: boolean;
  readonly productRecommendations?: boolean;
  readonly securityAlerts?: boolean;
}

export class PreferenceMergerService {
  static defaults(): PreferenceData {
    return {
      newsletter: PREFERENCES_CONFIG.defaultNewsletter,
      promotions: PREFERENCES_CONFIG.defaultPromotions,
      orderUpdates: PREFERENCES_CONFIG.defaultOrderUpdates,
      productRecommendations: PREFERENCES_CONFIG.defaultProductRecommendations,
      securityAlerts: PREFERENCES_CONFIG.defaultSecurityAlerts,
    };
  }

  static merge(
    current: PreferenceData,
    patch: PreferencePatch,
  ): PreferenceData {
    return {
      newsletter: patch.newsletter ?? current.newsletter,
      promotions: patch.promotions ?? current.promotions,
      orderUpdates: patch.orderUpdates ?? current.orderUpdates,
      productRecommendations:
        patch.productRecommendations ?? current.productRecommendations,
      securityAlerts: patch.securityAlerts ?? current.securityAlerts,
    };
  }

  static resetSecurityAlerts(data: PreferenceData): PreferenceData {
    return { ...data, securityAlerts: true };
  }
}
