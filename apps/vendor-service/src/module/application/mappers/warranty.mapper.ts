/**
 * WarrantyMapper
 * @module vendor-service/application/mappers
 */
import type { VendorWarrantyEntity } from '../../domain/entities/vendor-warranty.entity.js';
import type { WarrantyDTO } from '../services/interfaces/vendor-warranty.service.interface.js';

export class WarrantyMapper {
  static toResponse(entity: VendorWarrantyEntity): WarrantyDTO {
    return {
      vendorId: entity.vendorId.value,
      type: entity.type.value,
      periodDays: entity.periodDays,
      periodLabel: entity.periodLabel,
      requireProof: entity.requireProof,
      coverShipping: entity.coverShipping,
      autoRegister: entity.autoRegister,
      excludedCategories: entity.excludedCategories,
      terms: entity.terms,
    };
  }
}
