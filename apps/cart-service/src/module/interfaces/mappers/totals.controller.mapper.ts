/**
 * TotalsControllerMapper
 * @module cart-service/interfaces/mappers
 */
import type { SetShippingMethodHttpDTO } from '../dtos/requests/shipping.request.dto.js';
import type {
  CartTotalsHttpResponseDTO,
  ShippingCalculationHttpResponseDTO,
} from '../dtos/responses/cart-totals.response.dto.js';

import type { SetShippingMethodRequestDTO } from '../../application/dtos/requests/shipping/index.js';
import type { CartTotalsResponseDTO } from '../../application/dtos/responses/cart-totals-response.dto.js';
import type { ShippingCalculationResponseDTO } from '../../application/services/interfaces/cart-shipping.service.interface.js';

export class TotalsControllerMapper {
  // ═══ HTTP → App ═══

  static toSetShippingAppDto(cartId: string, dto: SetShippingMethodHttpDTO): SetShippingMethodRequestDTO {
    return {
      cartId,
      method: dto.method as never,
      addressId: dto.addressId,
      cost: dto.cost,
      freeAbove: dto.freeAbove,
      estimatedDays: dto.estimatedDays,
    };
  }

  // ═══ App → HTTP ═══

  static toTotalsHttp(app: CartTotalsResponseDTO): CartTotalsHttpResponseDTO {
    return {
      subtotal: app.subtotal,
      discount: app.discount,
      taxableBase: app.taxableBase,
      tax: app.tax,
      shipping: app.shipping,
      total: app.total,
      currency: app.currency,
      itemCount: app.itemCount,
    };
  }

  static toShippingCalculationHttp(app: ShippingCalculationResponseDTO): ShippingCalculationHttpResponseDTO {
    return {
      cartId: app.cartId,
      method: app.method,
      cost: app.cost,
      currency: app.currency,
      isFree: app.isFree,
      estimatedDays: app.estimatedDays ?? 0,
    };
  }
}
