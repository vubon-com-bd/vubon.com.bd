/**
 * FeatureMapper
 * @module vendor-service/application/mappers
 */
import type { VendorFeatureEntity } from '../../domain/entities/vendor-feature.entity.js';
import type { FeatureDTO } from '../services/interfaces/vendor-feature.service.interface.js';

export class FeatureMapper {
  static toResponse(entity: VendorFeatureEntity): FeatureDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      featureKey: entity.featureKey,
      type: entity.type.value,
      isEnabled: entity.isEnabled,
      isActive: entity.isActive(),
      limit: entity.limit,
      usedCount: entity.usedCount,
      remaining: entity.remaining,
      usagePercent: entity.usagePercent,
      expiresAt: entity.expiresAt,
      daysUntilExpiry: entity.daysUntilExpiry,
    };
  }
}
