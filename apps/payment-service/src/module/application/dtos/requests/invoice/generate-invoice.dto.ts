/**
 * GenerateInvoiceRequestDTO
 * @module payment-service/application/dtos/requests/invoice
 *
 * Two modes:
 * 1. Legacy: pass explicit taxAmount
 * 2. BD Tax: pass vatRate/sdRate/etc — auto-calculated
 */
export interface GenerateInvoiceRequestDTO {
  readonly orderId?: string;
  readonly userId: string;
  readonly subtotal: number;
  readonly taxAmount?: number;   // legacy explicit tax
  readonly currency: string;
  readonly dueAt?: string;
  readonly notes?: string;
  readonly idempotencyKey?: string;

  // ─── Bangladesh Tax Options ───
  readonly vatRate?: number;       // 0.15 = 15% default
  readonly sdRate?: number;        // Supplementary Duty
  readonly aitRate?: number;       // Advance Income Tax
  readonly vdsRate?: number;       // VAT Deduction at Source
  readonly includeAit?: boolean;   // Whether to deduct AIT from vendor
  readonly includeVds?: boolean;   // Whether to deduct VDS
  readonly useBdTax?: boolean;     // Use BD tax calculation
}

export interface GenerateInvoiceContextDTO {
  readonly request: GenerateInvoiceRequestDTO;
  readonly actorId?: string;
}
