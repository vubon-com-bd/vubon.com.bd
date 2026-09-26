import { Injectable } from '@nestjs/common';
import { AffiliateEntity } from '../../domain/entities/affiliate.entity';
import type { AffiliateResponseDTO } from '../dtos/responses/affiliate-response.dto';

@Injectable()
export class AffiliateMapper {
  toDTO(entity: AffiliateEntity): AffiliateResponseDTO {
    return {
      id: entity.id.value,
      type: 'standard',
      status: entity.status.value,
      name: entity.code.value,
      email: '',
      referralCode: entity.code.value,
      currency: 'BDT',
      joinedAt: entity.createdAt,
      commission: {
        type: 'percentage',
        updatedAt: entity.updatedAt,
        rate: 0,
        balance: 0,
        lifetimeEarned: 0,
        lifetimePaid: 0,
        pending: 0,
        paid: 0,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as AffiliateResponseDTO;
  }
}
