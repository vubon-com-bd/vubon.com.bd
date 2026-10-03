import type { CartTotalsResponseDTO } from '../../application/dtos/responses/cart-totals-response.dto.js';
import type { CartTotalsResponseHttpDTO } from '../dtos/responses/cart-totals.response.dto.js';

export class TotalsControllerMapper {
  static toHttp(app: CartTotalsResponseDTO): CartTotalsResponseHttpDTO {
    return { ...app };
  }
}
