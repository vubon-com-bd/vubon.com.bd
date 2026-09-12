import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { OrderSchema } from '../business/checkout/order.schema';
import { ComplaintSeveritySchema } from './complaint-severity.schema';
import { COMPLAINT } from '@vubon/shared-constants/src/support/complaint.constants';

const complaintTypeKeys = Object.keys(COMPLAINT.COMPLAINT_TYPES) as [string, ...string[]];
const complaintStatusKeys = Object.keys(COMPLAINT.STATUS) as [string, ...string[]];

export const ComplaintSchema = BaseSchema.extend({
  complaintId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  orderId: z.string().uuid().optional(),
  order: OrderSchema.optional(),
  type: z.enum(complaintTypeKeys),
  severity: ComplaintSeveritySchema,
  subject: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  status: z.enum(complaintStatusKeys),
  images: z.array(z.string().url()),
  assignedTo: z.string().uuid().optional(),
  assignedToUser: UserSchema.optional(),
  resolvedAt: z.date().optional(),
  rejectedAt: z.date().optional(),
  rejectedReason: z.string().optional(),
  escalatedAt: z.date().optional(),
  resolution: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});
