export interface PackagingActionRequestDTO {
  readonly packagingId: string;
}
export interface DeactivatePackagingRequestDTO {
  readonly packagingId: string;
  readonly reason?: string;
}
export interface DiscontinuePackagingRequestDTO {
  readonly packagingId: string;
  readonly reason?: string;
}
export interface AddStockRequestDTO {
  readonly packagingId: string;
  readonly quantity: number;
}
export interface ConsumeStockRequestDTO {
  readonly packagingId: string;
  readonly quantity: number;
}
export interface UpdateSizeRequestDTO {
  readonly packagingId: string;
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
  readonly maxWeightKg: number;
}
