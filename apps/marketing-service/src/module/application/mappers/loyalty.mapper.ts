import { Injectable } from '@nestjs/common';
import { LoyaltyEntity } from '../../domain/entities/loyalty.entity';
import type { LoyaltyResponseDTO } from '../dtos/responses/loyalty-response.dto';

@Injectable()
export class LoyaltyMapper {
  toDTO(entity: LoyaltyEntity): LoyaltyResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      status: entity.status.value,
      tier: entity.tier.value,
      points: {
        userId: entity.userId.value,
        balance: entity.points.value,
        lifetimeEarned: entity.points.value,
        lifetimeRedeemed: 0,
        lifetimeExpired: 0,
        updatedAt: entity.updatedAt,
      },
      isEnrolled: true,
      enrolledAt: entity.createdAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as LoyaltyResponseDTO;
  }
}
