import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { Order } from '../business/checkout/order.types';
import { COMPLAINT } from '@vubon/shared-constants/src/support/complaint.constants';
import { ComplaintSeverity } from './complaint-severity.types';

export interface Complaint extends BaseEntity {
  complaintId: string;
  userId: string;
  user: User;
  orderId?: string;
  order?: Order;
  type: keyof typeof COMPLAINT.COMPLAINT_TYPES | string;
  severity: ComplaintSeverity;
  subject: string;
  description: string;
  status: keyof typeof COMPLAINT.STATUS | string;
  images: string[];
  assignedTo?: string;
  assignedToUser?: User;
  resolvedAt?: Date;
  rejectedAt?: Date;
  rejectedReason?: string;
  escalatedAt?: Date;
  resolution?: string;
  metadata: Record<string, unknown>;
}
