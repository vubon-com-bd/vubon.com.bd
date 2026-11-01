/**
 * TotalsMapper — Breakdown → Response DTO
 * @module cart-service/application/mappers
 */
import type { CartCalculationBreakdown } from '../../domain/services/cart-calculation.service.js';
import type { CartTotalsResponseDTO } from '../dtos/responses/cart-totals-response.dto.js';

export class TotalsMapper {
  static toResponse(breakdown: CartCalculationBreakdown): CartTotalsResponseDTO {
    return {
      subtotal: breakdown.subtotal,
      discount: breakdown.discount,
      taxableBase: breakdown.taxableBase,
      tax: breakdown.tax,
      shipping: breakdown.shipping,
      total: breakdown.total,
      currency: breakdown.currency,
      itemCount: breakdown.itemCount,
    };
  }
}
