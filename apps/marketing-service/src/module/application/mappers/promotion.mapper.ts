import { Injectable } from '@nestjs/common';
import { PromotionEntity } from '../../domain/entities/promotion.entity';
import type { PromotionResponseDTO } from '../dtos/responses/promotion-response.dto';

@Injectable()
export class PromotionMapper {
  toDTO(entity: PromotionEntity): PromotionResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      code: entity.code.value,
      status: entity.status.value,
      type: entity.type.value,
      createdBy: 'system',
      isActive: entity.status.value === 'active',
      startAt: entity.startDate?.toISOString() ?? entity.createdAt,
      endAt: entity.endDate?.toISOString() ?? entity.createdAt,
      discountType: 'fixed' as never,
      discountValue: 0,
      currentUses: entity.usage.value,
      maxUses: entity.maxUsage ?? 0,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as PromotionResponseDTO;
  }
}
