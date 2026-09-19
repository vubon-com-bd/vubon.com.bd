/**
 * Complaint Types
 * @module shared-types/support
 */

import type {
  COMPLAINT_TYPE,
  COMPLAINT_STATUS,
  COMPLAINT_SEVERITY,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type ComplaintTypeValue = (typeof COMPLAINT_TYPE)[keyof typeof COMPLAINT_TYPE];

export type ComplaintStatusValue = (typeof COMPLAINT_STATUS)[keyof typeof COMPLAINT_STATUS];

export type ComplaintSeverityValue = (typeof COMPLAINT_SEVERITY)[keyof typeof COMPLAINT_SEVERITY];

export interface Complaint extends BaseEntity<string> {
  readonly complaintNumber: string;
  readonly subject: string;
  readonly description: string;
  readonly type: ComplaintTypeValue;
  readonly status: ComplaintStatusValue;
  readonly severity: ComplaintSeverityValue;
  readonly userId?: UserId;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
  readonly assignedTo?: UserId;
  readonly resolution?: string;
  readonly acknowledgedAt?: string;
  readonly resolvedAt?: string;
  readonly closedAt?: string;
  readonly reopenedAt?: string;
  readonly slaBreachedAt?: string;
}

export interface ComplaintPublic {
  readonly id: string;
  readonly complaintNumber: string;
  readonly subject: string;
  readonly status: ComplaintStatusValue;
  readonly severity: ComplaintSeverityValue;
  readonly createdAt: string;
  readonly resolvedAt?: string;
}

export interface ComplaintCreateInput {
  readonly subject: string;
  readonly description: string;
  readonly type: ComplaintTypeValue;
  readonly severity: ComplaintSeverityValue;
  readonly orderId?: string;
  readonly productId?: string;
  readonly attachments?: readonly string[];
}
