/**
 * User Profile Configuration
 * @module shared-config/user/profile
 *
 * Values আসে shared-constants/user থেকে।
 */
import {
  USER_PROFILE,
  USER_PROFILE_VISIBILITY,
  USER_GENDER,
} from '@vubon/shared-constants/user';
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
  getOptionalEnv,
} from '../../common/env/env.helper.js';

export const PROFILE_CONFIG = Object.freeze({
  nameMinLength: USER_PROFILE.NAME_MIN_LENGTH,
  nameMaxLength: USER_PROFILE.NAME_MAX_LENGTH,
  bioMaxLength: USER_PROFILE.BIO_MAX_LENGTH,
  websiteMaxLength: USER_PROFILE.WEBSITE_MAX_LENGTH,
  companyMaxLength: USER_PROFILE.COMPANY_MAX_LENGTH,
  designationMaxLength: USER_PROFILE.DESIGNATION_MAX_LENGTH,

  defaultVisibility: getOptionalEnv('PROFILE_DEFAULT_VISIBILITY', USER_PROFILE_VISIBILITY.PUBLIC),
  allowedGenders: Object.freeze(Object.values(USER_GENDER)),
  allowedVisibilities: Object.freeze(Object.values(USER_PROFILE_VISIBILITY)),

  allowCoverImage: getOptionalEnvBool('PROFILE_ALLOW_COVER', true),
  requireFullName: getOptionalEnvBool('PROFILE_REQUIRE_FULL_NAME', false),
  requireAvatar: getOptionalEnvBool('PROFILE_REQUIRE_AVATAR', false),
  minAgeYears: getOptionalEnvInt('PROFILE_MIN_AGE', 13),
  maxAgeYears: getOptionalEnvInt('PROFILE_MAX_AGE', 120),

  completionFields: Object.freeze([
    'firstName',
    'lastName',
    'avatarUrl',
    'bio',
    'dateOfBirth',
    'gender',
  ] as const),
});
