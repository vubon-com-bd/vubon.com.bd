export interface SavedForLaterResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly status: string;
}
