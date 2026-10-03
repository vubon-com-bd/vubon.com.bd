export interface ReturnResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly status: string;
  readonly reason: string;
  readonly itemIds: readonly string[];
  readonly images: readonly string[];
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly restockFee?: number;
  readonly netRefund: number;
  readonly currency: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly refundedAt?: string;
  readonly closedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReturnListResponseDTO {
  readonly items: readonly ReturnResponseDTO[];
  readonly total: number;
}
