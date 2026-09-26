import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PaymentMethodServiceInterface } from '../interfaces/payment-method.service.interface';
import type { PaymentMethodRepository } from '../../../domain/repositories/payment-method.repository.interface';
import { PaymentMethodEntity } from '../../../domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '../../../domain/value-objects/primitives/payment-method-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { MethodResponseDTO } from '../../dtos/responses/method-response.dto';
import { MethodOperationFailedError } from '../../errors/method.errors';

@Injectable()
export class PaymentMethodService
  extends BaseService<PaymentMethodEntity, string>
  implements PaymentMethodServiceInterface
{
  readonly name = 'PaymentMethodService';

  constructor(
    @Inject('PaymentMethodRepository')
    private readonly methodRepo: PaymentMethodRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByUser(userId: string): Promise<readonly MethodResponseDTO[]> {
    const entities = await this.methodRepo.findByUserId(UserIdVO.create(userId));
    return entities.map((e) => this.toDTO(e));
  }

  async findDefault(userId: string): Promise<MethodResponseDTO | null> {
    const entity = await this.methodRepo.findDefault(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async add(userId: string, input: unknown): Promise<MethodResponseDTO> {
    void input;
    void userId;
    throw new MethodOperationFailedError('not yet wired');
  }

  async setDefault(userId: string, methodId: string): Promise<MethodResponseDTO> {
    const entity = await this.methodRepo.findById(PaymentMethodIdVO.create(methodId));
    if (!entity) throw new MethodOperationFailedError('method not found');
    const updated = entity.setAsDefault();
    await this.methodRepo.save(updated);
    return this.toDTO(updated);
  }

  async remove(methodId: string): Promise<void> {
    await this.methodRepo.delete(PaymentMethodIdVO.create(methodId));
  }

  private toDTO(entity: PaymentMethodEntity): MethodResponseDTO {
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
