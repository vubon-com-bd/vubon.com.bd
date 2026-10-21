/**
 * ApproveRefundRequestDTO
 * @module payment-service/application/dtos/requests/refund
 */
export interface ApproveRefundRequestDTO {
  readonly refundId: string;
  readonly approvedAmount?: number;
  readonly note?: string;
  readonly idempotencyKey?: string;
}

export interface ApproveRefundContextDTO {
  readonly request: ApproveRefundRequestDTO;
  readonly approvedBy: string;
}
