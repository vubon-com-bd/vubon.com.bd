/**
 * Vendor Sagas Barrel
 * @module vendor-service/modules/vendor/sagas
 */
import { VendorOnboardingSaga } from '../../../application/sagas/vendor-onboarding.saga.js';

export const VENDOR_SAGAS = [VendorOnboardingSaga] as const;

export { VendorOnboardingSaga };
