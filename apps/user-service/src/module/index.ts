// module/index.ts
//
// NOTE: Cross-layer barrel re-export করা হয়নি কারণ:
//  - domain/errors এবং application/errors এ একই নামের error class আছে
//    (AddressLimitExceededError, ContactLimitExceededError, ContactAlreadyVerifiedError)
//  - application/validators এবং interfaces/validators এ একই নামের validator আছে
//    (UserValidator, KycValidator, ProfileValidator, UserValidationResult ইত্যাদি)
//
// আলাদা আলাদা import করুন:
//   import { X } from '@domain/...';
//   import { X } from '@application/...';
//   import { X } from '@infrastructure/...';
//   import { X } from '@interfaces/...';
//   import { X } from '@modules/...';
export {};
