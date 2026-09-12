import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants/src/admin/admin-activity.constants';

const adminAuditActionValues = Object.values(ADMIN_ACTIVITY) as [string, ...string[]];

/**
 * Safe audit value shapes — no arbitrary objects (avoids leaking secrets).
 * Replace sensitive values with '[REDACTED]' upstream.
 */
const auditValue = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.literal('[REDACTED]'),
]);

export const AdminAuditSchema = BaseSchema.extend({
  auditId: z.string().uuid(),
  adminId: z.string().uuid(),
  action: z.enum(adminAuditActionValues),
  resource: z.string(),
  resourceId: z.string(),
  changes: z.array(
    z.object({
      field: z.string(),
      from: auditValue,
      to: auditValue,
    })
  ),
  /** @internal filled by server from request */
  ipAddress: z.string(),
  userAgent: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
