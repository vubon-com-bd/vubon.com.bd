import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_VERIFICATION } from '@vubon/shared-constants/src/business/vendor/vendor-verification.constants';

const vendorVerificationLevelKeys = Object.keys(VENDOR_VERIFICATION.VERIFICATION_LEVELS) as [
  string,
  ...string[],
];
const vendorVerificationStatusKeys = Object.keys(VENDOR_VERIFICATION.STATUS) as [
  string,
  ...string[],
];

export const VendorVerificationSchema = BaseSchema.extend({
  verificationId: z.string().uuid(),
  vendorId: z.string().uuid(),
  level: z.enum(vendorVerificationLevelKeys),
  status: z.enum(vendorVerificationStatusKeys),
  documents: z.array(z.string().uuid()),
  verifiedBy: z.string().uuid(),
  verifiedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
