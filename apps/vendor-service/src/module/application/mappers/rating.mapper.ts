/**
 * RatingMapper
 * @module vendor-service/application/mappers
 */
import type { VendorRatingEntity } from '../../domain/entities/vendor-rating.entity.js';
import type { RatingSummaryDTO } from '../services/interfaces/vendor-rating.service.interface.js';

export class RatingMapper {
  static toSummary(entity: VendorRatingEntity): RatingSummaryDTO {
    return {
      vendorId: entity.vendorId.value,
      overall: entity.overall.rating,
      productQuality: entity.productQuality.rating,
      shippingSpeed: entity.shippingSpeed.rating,
      customerService: entity.customerService.rating,
      communication: entity.communication.rating,
      valueForMoney: entity.valueForMoney.rating,
      packaging: entity.packaging.rating,
      totalReviews: entity.totalReviews,
      recentReviews: entity.recentReviews,
      distribution: entity.distribution,
      positivePercent: entity.positivePercent,
      negativePercent: entity.negativePercent,
    };
  }
}
