/**
 * RejectRefundRequestDTO
 * @module payment-service/application/dtos/requests/refund
 */
export interface RejectRefundRequestDTO {
  readonly refundId: string;
  readonly reason: string;
}

export interface RejectRefundContextDTO {
  readonly request: RejectRefundRequestDTO;
  readonly rejectedBy: string;
}
