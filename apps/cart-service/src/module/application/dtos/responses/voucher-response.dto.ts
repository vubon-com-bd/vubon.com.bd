export interface VoucherResponseDTO {
  readonly code: string;
  readonly value: number;
  readonly status: string;
  readonly type: string;
  readonly appliedAt: string;
}
