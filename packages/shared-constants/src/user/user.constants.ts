import { USER_STATUS } from './user-status.constants.js';
import { USER_TYPE } from './user-type.constants.js';
import { USER_ROLE } from './user-role.constants.js';
import { USER_PERMISSION } from './user-permission.constants.js';
import { USER_PROFILE } from './user-profile.constants.js';
import { USER_SETTINGS } from './user-settings.constants.js';
import { USER_PREFERENCE } from './user-preferences.constants.js';
import { USER_ADDRESS } from './user-address.constants.js';
import { USER_CONTACT } from './user-contact.constants.js';
import { USER_VERIFICATION } from './user-verification.constants.js';
import { USER_KYC } from './user-kyc.constants.js';
import { USER_ACTIVITY } from './user-activity.constants.js';
import { USER_LOG } from './user-log.constants.js';

export const USER = {
  STATUS: USER_STATUS,
  TYPE: USER_TYPE,
  ROLE: USER_ROLE,
  PERMISSION: USER_PERMISSION,
  PROFILE: USER_PROFILE,
  SETTINGS: USER_SETTINGS,
  PREFERENCE: USER_PREFERENCE,
  ADDRESS: USER_ADDRESS,
  CONTACT: USER_CONTACT,
  VERIFICATION: USER_VERIFICATION,
  KYC: USER_KYC,
  ACTIVITY: USER_ACTIVITY,
  LOG: USER_LOG,
} as const;

export type UserType = typeof USER;
