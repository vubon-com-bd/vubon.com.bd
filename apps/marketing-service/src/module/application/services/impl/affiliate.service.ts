import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AffiliateServiceInterface } from '../interfaces/affiliate.service.interface';
import type { AffiliateRepository } from '../../../domain/repositories/affiliate.repository.interface';
import { AffiliateEntity } from '../../../domain/entities/affiliate.entity';
import { AffiliateIdVO } from '../../../domain/value-objects/primitives/affiliate-id.vo';
import { AffiliateCodeVO } from '../../../domain/value-objects/primitives/affiliate-code.vo';
import { AffiliateStatusVO } from '../../../domain/value-objects/primitives/affiliate-status.vo';
import { AffiliateCommissionVO } from '../../../domain/value-objects/primitives/affiliate-commission.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { AffiliateNotFoundAppError } from '../../errors/affiliate.errors';
import type { RegisterAffiliateRequestDTO } from '../../dtos/requests/affiliate/register-affiliate.dto';
import type { ApproveAffiliateRequestDTO } from '../../dtos/requests/affiliate/approve-affiliate.dto';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';
import { AffiliateMapper } from '../../mappers/affiliate.mapper';

@Injectable()
export class AffiliateService
  extends BaseService<AffiliateEntity, string>
  implements AffiliateServiceInterface
{
  readonly name = 'AffiliateService';

  constructor(
    private readonly repo: AffiliateRepository,
    private readonly eventBus: EventBus,
    private readonly mapper: AffiliateMapper,
  ) {
    super();
  }

  async register(input: RegisterAffiliateRequestDTO): Promise<AffiliateResponseDTO> {
    const code = `AFF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const entity = AffiliateEntity.create({
      userId: UserIdVO.create(input.userId),
      code: AffiliateCodeVO.create(code),
      status: AffiliateStatusVO.create('pending'),
      commission: AffiliateCommissionVO.create(String(input.commissionRate ?? 10)),
      approvedAt: null,
    });
    await this.repo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.mapper.toDTO(entity);
  }

  async approve(input: ApproveAffiliateRequestDTO): Promise<AffiliateResponseDTO> {
    const entity = await this.repo.findById(AffiliateIdVO.create(input.affiliateId));
    if (!entity) throw new AffiliateNotFoundAppError(input.affiliateId);
    const approved = entity.approve();
    await this.repo.save(approved);
    const events = approved.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.mapper.toDTO(approved);
  }

  async findByCode(code: string): Promise<AffiliateResponseDTO | null> {
    const entity = await this.repo.findByCode(AffiliateCodeVO.create(code));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
