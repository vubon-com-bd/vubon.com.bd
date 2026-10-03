/**
 * MergeGuestCartRequestDTO
 * @module cart-service/application/dtos/requests/guest
 */
export interface MergeGuestCartRequestDTO {
  readonly guestToken: string;
  readonly targetCartId: string;
  readonly userId: string;
  readonly strategy?: string;
}
