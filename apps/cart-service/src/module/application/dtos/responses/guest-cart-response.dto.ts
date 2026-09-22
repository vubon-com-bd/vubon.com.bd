export interface GuestCartResponseDTO {
  readonly guestCartId: string;
  readonly cartId: string;
  readonly token: string;
  readonly status: string;
  readonly itemCount: number;
  readonly expiresAt: string;
}
