/**
 * User Module Configuration — Top-level aggregator
 * @module shared-config/user
 */
import { PROFILE_CONFIG } from './profile/profile.config.js';
import { ADDRESS_CONFIG } from './address/address.config.js';
import { CONTACT_CONFIG } from './contact/contact.config.js';
import { PREFERENCES_CONFIG } from './preferences/preferences.config.js';
import { KYC_CONFIG } from './kyc/kyc.config.js';
import { ACTIVITY_CONFIG } from './activity/activity.config.js';
import { getOptionalEnvBool, getOptionalEnvInt } from '../common/env/env.helper.js';

export const USER_CONFIG = Object.freeze({
  profile: PROFILE_CONFIG,
  address: ADDRESS_CONFIG,
  contact: CONTACT_CONFIG,
  preferences: PREFERENCES_CONFIG,
  kyc: KYC_CONFIG,
  activity: ACTIVITY_CONFIG,

  softDeleteGraceDays: getOptionalEnvInt('USER_SOFT_DELETE_GRACE_DAYS', 30),
  autoActivateOnVerify: getOptionalEnvBool('USER_AUTO_ACTIVATE', true),
  requireEmailVerification: getOptionalEnvBool('USER_REQUIRE_EMAIL_VERIFY', true),
  requirePhoneVerification: getOptionalEnvBool('USER_REQUIRE_PHONE_VERIFY', false),
});
