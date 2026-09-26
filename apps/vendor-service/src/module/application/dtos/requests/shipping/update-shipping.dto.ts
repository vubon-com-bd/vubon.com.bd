export class UpdateShippingRequestDto {
  vendorId!: string;
  freeShippingThreshold?: number;
  defaultShippingCost!: number;
  shipsInternationally?: boolean;
}
