/**
 * User Preferences Configuration
 * @module shared-config/user/preferences
 */
import {
  USER_PREFERENCE,
  USER_PREFERENCE_CHANNEL,
} from '@vubon/shared-constants/user';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '../../common/env/env.helper.js';

export const PREFERENCES_CONFIG = Object.freeze({
  allowedPreferences: Object.freeze(Object.values(USER_PREFERENCE)),
  allowedChannels: Object.freeze(Object.values(USER_PREFERENCE_CHANNEL)),

  defaultNewsletter: getOptionalEnvBool('PREF_DEFAULT_NEWSLETTER', false),
  defaultPromotions: getOptionalEnvBool('PREF_DEFAULT_PROMOTIONS', false),
  defaultOrderUpdates: getOptionalEnvBool('PREF_DEFAULT_ORDER_UPDATES', true),
  defaultProductRecommendations: getOptionalEnvBool(
    'PREF_DEFAULT_RECOMMENDATIONS',
    true,
  ),
  defaultSecurityAlerts: getOptionalEnvBool('PREF_DEFAULT_SECURITY_ALERTS', true),

  maxChannelsPerPreference: getOptionalEnvInt('PREF_MAX_CHANNELS', 5),
  allowBulkUpdate: getOptionalEnvBool('PREF_ALLOW_BULK', true),
  resetOnDeactivate: getOptionalEnvBool('PREF_RESET_ON_DEACTIVATE', false),
  notifyOnChange: getOptionalEnvBool('PREF_NOTIFY_CHANGE', false),
});
