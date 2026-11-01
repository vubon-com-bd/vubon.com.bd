/**
 * VendorApproval Sagas Barrel
 * @module vendor-service/modules/vendor-approval/sagas
 */
import { VendorApprovalSaga } from '../../../application/sagas/vendor-approval.saga.js';

export const VENDOR_APPROVAL_SAGAS = [VendorApprovalSaga] as const;

export { VendorApprovalSaga };
