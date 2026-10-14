/**
 * VendorSuspension Command Handlers Barrel
 * @module vendor-service/modules/vendor-suspension/commands
 */
import { SuspendVendorHandler } from '../../../application/commands/suspension/suspend-vendor.handler.js';
import { ReinstateVendorHandler } from '../../../application/commands/suspension/reinstate-vendor.handler.js';
import { AppealSuspensionHandler } from '../../../application/commands/suspension/appeal-suspension.handler.js';

export const VENDOR_SUSPENSION_COMMAND_HANDLERS = [
  SuspendVendorHandler,
  ReinstateVendorHandler,
  AppealSuspensionHandler,
] as const;

export { SuspendVendorHandler, ReinstateVendorHandler, AppealSuspensionHandler };
