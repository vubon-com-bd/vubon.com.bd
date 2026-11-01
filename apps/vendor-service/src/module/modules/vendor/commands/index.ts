/**
 * Vendor Command Handlers Barrel
 * @module vendor-service/modules/vendor/commands
 */
import { RegisterVendorHandler } from '../../../application/commands/vendor/register-vendor.handler.js';
import { UpdateVendorHandler } from '../../../application/commands/vendor/update-vendor.handler.js';
import { DeleteVendorHandler } from '../../../application/commands/vendor/delete-vendor.handler.js';
import { UpdateProfileHandler } from '../../../application/commands/vendor/update-profile.handler.js';
import { UpdateBusinessHandler } from '../../../application/commands/vendor/update-business.handler.js';

export const VENDOR_COMMAND_HANDLERS = [
  RegisterVendorHandler,
  UpdateVendorHandler,
  DeleteVendorHandler,
  UpdateProfileHandler,
  UpdateBusinessHandler,
] as const;

export {
  RegisterVendorHandler,
  UpdateVendorHandler,
  DeleteVendorHandler,
  UpdateProfileHandler,
  UpdateBusinessHandler,
};
