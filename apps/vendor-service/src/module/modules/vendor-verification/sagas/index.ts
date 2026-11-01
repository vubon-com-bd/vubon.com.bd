/**
 * VendorVerification Sagas Barrel
 * @module vendor-service/modules/vendor-verification/sagas
 */
import { VendorVerificationSaga } from '../../../application/sagas/vendor-verification.saga.js';

export const VENDOR_VERIFICATION_SAGAS = [VendorVerificationSaga] as const;

export { VendorVerificationSaga };
