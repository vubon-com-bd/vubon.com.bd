export interface UpdateZoneRequestDTO {
  readonly zoneId: string;
  readonly name?: string;
  readonly shippingCost?: number;
  readonly freeAbove?: number;
  readonly minDeliveryDays?: number;
  readonly maxDeliveryDays?: number;
  readonly codEnabled?: boolean;
  readonly codCharge?: number;
  readonly codMaxAmount?: number;
  readonly postalCodes?: readonly string[];
  readonly districts?: readonly string[];
  readonly divisions?: readonly string[];
  readonly isRemote?: boolean;
}
