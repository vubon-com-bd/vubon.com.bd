/**
 * VendorVerification Query Handlers
 * @module vendor-service/modules/vendor-verification/queries
 */
import { GetVerificationHandler } from '../../../application/queries/verification/get-verification.handler.js';

export const VENDOR_VERIFICATION_QUERY_HANDLERS = [GetVerificationHandler] as const;

export { GetVerificationHandler };
