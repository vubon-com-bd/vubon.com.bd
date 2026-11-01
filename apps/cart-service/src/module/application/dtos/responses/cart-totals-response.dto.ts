/**
 * Cart Totals Response DTO
 * @module cart-service/application/dtos/responses
 */
export interface CartTotalsResponseDTO {
  readonly subtotal: number;
  readonly discount: number;
  readonly taxableBase: number;
  readonly tax: number;
  readonly shipping: number;
  readonly total: number;
  readonly currency: string;
  readonly itemCount: number;
}
