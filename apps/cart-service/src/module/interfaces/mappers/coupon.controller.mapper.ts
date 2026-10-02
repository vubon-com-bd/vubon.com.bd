import type { CouponResponseDTO, CouponValidationResponseDTO } from '../../application/dtos/responses/coupon-response.dto.js';
import type { CouponHttpDTO, CouponValidationHttpDTO } from '../dtos/responses/coupon.response.dto.js';

export class CouponControllerMapper {
  static toHttp(app: CouponResponseDTO): CouponHttpDTO {
    return { ...app };
  }

  static validationToHttp(app: CouponValidationResponseDTO): CouponValidationHttpDTO {
    return { ...app };
  }
}
