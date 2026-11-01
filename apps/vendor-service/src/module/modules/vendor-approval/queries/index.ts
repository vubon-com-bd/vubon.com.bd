/**
 * VendorApproval Query Handlers Barrel
 * @module vendor-service/modules/vendor-approval/queries
 */
import { GetApprovalStatusHandler } from '../../../application/queries/approval/get-approval-status.handler.js';

export const VENDOR_APPROVAL_QUERY_HANDLERS = [GetApprovalStatusHandler] as const;

export { GetApprovalStatusHandler };
