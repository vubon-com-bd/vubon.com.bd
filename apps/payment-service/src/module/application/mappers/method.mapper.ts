import { Injectable } from '@nestjs/common';
import { PaymentMethodEntity } from '../../domain/entities/payment-method.entity';
import type { MethodResponseDTO } from '../dtos/responses/method-response.dto';

@Injectable()
export class MethodMapper {
  toResponse(entity: PaymentMethodEntity): MethodResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value,
      provider: entity.provider?.value ?? null,
      cardLast4: entity.cardLast4,
      cardBrand: entity.cardBrand,
      isDefault: entity.isDefault,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}
