/**
 * COD (Cash on Delivery) — Type Definitions
 * @module payment-service/infrastructure/gateways/cod
 *
 * COD is a no-op gateway adapter — no external API.
 * Cash is collected by delivery agent; confirmation is manual/internal.
 */

export interface CodConfirmationPayload {
  readonly paymentId: string;
  readonly collectedBy: string;
  readonly collectedAt: string;
  readonly collectedAmount: number;
  readonly currency: string;
  readonly receiptNumber?: string;
  readonly note?: string;
}
