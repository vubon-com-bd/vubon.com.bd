import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/src/business/vendor/vendor-approval.constants';

const vendorApprovalStatusKeys = Object.keys(VENDOR_APPROVAL.STATUS) as [string, ...string[]];

export const VendorApprovalSchema = BaseSchema.extend({
  approvalId: z.string().uuid(),
  vendorId: z.string().uuid(),
  status: z.enum(vendorApprovalStatusKeys),
  reviewedBy: z.string().uuid(),
  reviewedAt: z.date().optional(),
  approvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  conditions: z.array(z.string()).optional(),
  notes: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
