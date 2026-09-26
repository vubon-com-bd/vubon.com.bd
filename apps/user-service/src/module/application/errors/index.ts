export {
  UserOperationFailedError,
  UserValidationFailedError,
  UserNotFoundAppError,
} from './user.errors';

export {
  ProfileOperationFailedError,
  ProfileNotFoundAppError,
} from './profile.errors';

export {
  AddressOperationFailedError,
  AddressNotFoundAppError,
  AddressLimitExceededAppError,
} from './address.errors';

export {
  ContactOperationFailedError,
  ContactNotFoundAppError,
} from './contact.errors';

export { PreferenceOperationFailedError } from './preference.errors';
export { SettingsOperationFailedError } from './settings.errors';

export {
  KycOperationFailedError,
  KycNotFoundAppError,
  KycNotAllowedAppError,
} from './kyc.errors';

export { ActivityOperationFailedError } from './activity.errors';
