import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';

export const AdminAuditSchema = BaseSchema.extend({
  auditId: z.string().uuid(),
  adminId: z.string().uuid(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  changes: z.array(
    z.object({
      field: z.string(),
      from: z.unknown(),
      to: z.unknown(),
    })
  ),
  ipAddress: z.string(),
  userAgent: z.string(),
  timestamp: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
