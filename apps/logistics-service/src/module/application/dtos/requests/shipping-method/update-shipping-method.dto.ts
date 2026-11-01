export interface UpdateShippingMethodRequestDTO {
  readonly methodId: string;
  readonly displayName?: string;
  readonly baseCost?: number;
  readonly freeAbove?: number;
  readonly minDeliveryDays?: number;
  readonly maxDeliveryDays?: number;
  readonly maxWeightKg?: number;
  readonly maxDimensionsCm?: number;
  readonly codEnabled?: boolean;
  readonly trackingEnabled?: boolean;
  readonly coverageZones?: readonly string[];
  readonly couriers?: readonly string[];
  readonly isDefault?: boolean;
}
