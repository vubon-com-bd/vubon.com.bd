export interface OrderListResponseDTO {
  readonly items: readonly OrderSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface OrderSummaryResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: string;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}
