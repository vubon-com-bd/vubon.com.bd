import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { VerificationServiceInterface } from '../interfaces/verification.service.interface';
import type { VerificationRepository } from '../../../domain/repositories/verification.repository.interface';
import { VerificationEntity } from '../../../domain/entities/verification.entity';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo';
import type { VerificationResponseDTO } from '../../dtos/responses/verification-response.dto';

@Injectable()
export class VerificationService
  extends BaseService<VerificationEntity, string>
  implements VerificationServiceInterface
{
  readonly name = 'VerificationService';

  constructor(
    @Inject('VerificationRepository')
    private readonly verificationRepo: VerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByPaymentId(paymentId: string): Promise<VerificationResponseDTO | null> {
    const entity = await this.verificationRepo.findByPaymentId(PaymentIdVO.create(paymentId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: VerificationEntity): VerificationResponseDTO {
    return {
      id: entity.id.value,
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      method: entity.method.value,
      verifiedAt: entity.verifiedAt?.toISOString(),
    };
  }
}
