export interface CancelResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly reason: string;
  readonly status: string;
  readonly requestedBy: string;
  readonly approvedBy?: string;
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly currency: string;
  readonly restockInventory: boolean;
  readonly requestedAt: string;
  readonly processedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CancelListResponseDTO {
  readonly items: readonly CancelResponseDTO[];
  readonly total: number;
}
