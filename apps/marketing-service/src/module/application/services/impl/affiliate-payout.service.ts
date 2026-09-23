import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AffiliatePayoutServiceInterface } from '../interfaces/affiliate-payout.service.interface';
import type { AffiliatePayoutRepository } from '../../../domain/repositories/affiliate-payout.repository.interface';
import { AffiliatePayoutEntity } from '../../../domain/entities/affiliate-payout.entity';
import { AffiliatePayoutIdVO } from '../../../domain/value-objects/primitives/affiliate-payout-id.vo';
import { AffiliatePayoutAmountVO } from '../../../domain/value-objects/primitives/affiliate-payout-amount.vo';
import { AffiliatePayoutStatusVO } from '../../../domain/value-objects/primitives/affiliate-payout-status.vo';
import { AffiliateIdVO } from '../../../domain/value-objects/primitives/affiliate-id.vo';
import { AffiliatePayoutAppError } from '../../errors/affiliate.errors';
import type { RequestPayoutRequestDTO } from '../../dtos/requests/affiliate/request-payout.dto';
import type { AffiliatePayoutResponseDTO } from '../../dtos/responses/affiliate-payout-response.dto';

@Injectable()
export class AffiliatePayoutService
  extends BaseService<AffiliatePayoutEntity, string>
  implements AffiliatePayoutServiceInterface
{
  readonly name = 'AffiliatePayoutService';

  constructor(
    private readonly repo: AffiliatePayoutRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async request(input: RequestPayoutRequestDTO): Promise<AffiliatePayoutResponseDTO> {
    const entity = AffiliatePayoutEntity.create({
      affiliateId: AffiliateIdVO.create(input.affiliateId),
      amount: AffiliatePayoutAmountVO.create(input.amount),
      status: AffiliatePayoutStatusVO.create('pending'),
      processedAt: null,
    });
    await this.repo.save(entity);
    return this.toDTO(entity);
  }

  async process(payoutId: string): Promise<AffiliatePayoutResponseDTO> {
    const entity = await this.repo.findById(AffiliatePayoutIdVO.create(payoutId));
    if (!entity) throw new AffiliatePayoutAppError('payout not found');
    const processed = entity.process();
    await this.repo.save(processed);
    const events = processed.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(processed);
  }

  private toDTO(entity: AffiliatePayoutEntity): AffiliatePayoutResponseDTO {
    const now = new Date().toISOString();
    return {
      id: entity.id.value,
      affiliateId: entity.affiliateId.value,
      method: 'bank_transfer',
      currency: entity.amount.currency,
      amount: entity.amount.amount,
      status: entity.status.value as unknown as AffiliatePayoutResponseDTO['status'],
      periodStart: entity.createdAt,
      periodEnd: now,
      processedAt: entity.processedAt?.toISOString(),
      paidAt: entity.processedAt?.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as unknown as AffiliatePayoutResponseDTO;
  }
}
