/**
 * VendorVerification Command Handlers — intentionally empty
 * @module vendor-service/modules/vendor-verification/commands
 *
 * Verification handlers belong to VendorModule/vendor-verification handlers are separate.
 * Keeping here since they are verification-specific, not vendor-shared.
 */
import { SubmitVerificationHandler } from '../../../application/commands/verification/submit-verification.handler.js';
import { ReverifyHandler } from '../../../application/commands/verification/reverify.handler.js';

export const VENDOR_VERIFICATION_COMMAND_HANDLERS = [
  SubmitVerificationHandler,
  ReverifyHandler,
] as const;

export { SubmitVerificationHandler, ReverifyHandler };
