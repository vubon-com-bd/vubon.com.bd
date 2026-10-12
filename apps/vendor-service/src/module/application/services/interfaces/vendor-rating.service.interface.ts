/**
 * IVendorRatingService
 * @module vendor-service/application/services/interfaces
 */
import type { VendorRatingResponseDto } from '../../dtos/responses/vendor-rating-response.dto.js';

export const VENDOR_RATING_SERVICE = Symbol('VENDOR_RATING_SERVICE');

export interface IVendorRatingService {
  recordReview(vendorId: string, starRating: number, actorId?: string): Promise<VendorRatingResponseDto>;
  removeReview(vendorId: string, starRating: number, actorId?: string): Promise<VendorRatingResponseDto>;
  recalculate(vendorId: string, actorId?: string): Promise<VendorRatingResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorRatingResponseDto>;
  initializeForVendor(vendorId: string, actorId?: string): Promise<VendorRatingResponseDto>;
}
