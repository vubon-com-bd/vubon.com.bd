/**
 * VendorApproval Command Handlers Barrel
 * @module vendor-service/modules/vendor-approval/commands
 */
import { ApproveVendorHandler } from '../../../application/commands/approval/approve-vendor.handler.js';
import { RejectVendorHandler } from '../../../application/commands/approval/reject-vendor.handler.js';
import { RequestInfoHandler } from '../../../application/commands/approval/request-info.handler.js';

export const VENDOR_APPROVAL_COMMAND_HANDLERS = [
  ApproveVendorHandler,
  RejectVendorHandler,
  RequestInfoHandler,
] as const;

export { ApproveVendorHandler, RejectVendorHandler, RequestInfoHandler };
