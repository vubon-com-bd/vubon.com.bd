export type ComplaintStatus = 'open' | 'investigating' | 'resolved' | 'rejected';
export type ComplaintType =
  | 'order_issue'
  | 'payment_issue'
  | 'delivery_issue'
  | 'product_quality'
  | 'staff_behavior'
  | 'other';

export interface Complaint {
  readonly id: string;
  readonly userId: string;
  readonly type: ComplaintType;
  readonly subject: string;
  readonly description: string;
  readonly status: ComplaintStatus;
  readonly orderId?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateComplaintRequest {
  readonly type: ComplaintType;
  readonly subject: string;
  readonly description: string;
  readonly orderId?: string;
  readonly attachments?: readonly string[];
}

export interface ComplaintListResponse {
  readonly complaints: readonly Complaint[];
  readonly total: number;
}
