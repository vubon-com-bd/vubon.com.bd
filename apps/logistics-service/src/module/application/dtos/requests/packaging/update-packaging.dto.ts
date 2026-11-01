export interface UpdatePackagingRequestDTO {
  readonly packagingId: string;
  readonly name?: string;
  readonly cost?: number;
  readonly imageUrl?: string;
  readonly lengthCm?: number;
  readonly widthCm?: number;
  readonly heightCm?: number;
  readonly maxWeightKg?: number;
  readonly isFragile?: boolean;
  readonly isTemperatureControlled?: boolean;
  readonly isRecyclable?: boolean;
  readonly isDefault?: boolean;
}
