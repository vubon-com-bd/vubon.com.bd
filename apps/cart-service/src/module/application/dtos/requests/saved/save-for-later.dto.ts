/**
 * SaveForLaterRequestDTO
 * @module cart-service/application/dtos/requests/saved
 */
export interface SaveForLaterRequestDTO {
  readonly cartId: string;
  readonly itemId: string;
  readonly userId: string;
  readonly notes?: string;
}
