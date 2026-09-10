import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_ACTIVITY } from '@vubon/shared-constants/src/business/vendor/vendor-activity.constants';

const vendorActivityTypeKeys = Object.keys(VENDOR_ACTIVITY.TYPES) as [string, ...string[]];
const vendorActivitySeverityKeys = Object.keys(VENDOR_ACTIVITY.ACTIVITY_SEVERITY) as [
  string,
  ...string[],
];

export const VendorActivitySchema = BaseSchema.extend({
  activityId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorActivityTypeKeys),
  severity: z.enum(vendorActivitySeverityKeys),
  description: z.string(),
  data: z.record(z.unknown()),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  performedBy: z.string().uuid(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
