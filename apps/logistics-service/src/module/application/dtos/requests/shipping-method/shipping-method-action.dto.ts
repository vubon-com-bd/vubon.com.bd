export interface ShippingMethodActionRequestDTO {
  readonly methodId: string;
}
export interface DeactivateShippingMethodRequestDTO {
  readonly methodId: string;
  readonly reason?: string;
}
export interface SuspendShippingMethodRequestDTO {
  readonly methodId: string;
  readonly reason: string;
}
