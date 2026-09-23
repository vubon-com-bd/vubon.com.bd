import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ReferralServiceInterface } from '../interfaces/referral.service.interface';
import type { ReferralRepository } from '../../../domain/repositories/referral.repository.interface';
import { ReferralEntity } from '../../../domain/entities/referral.entity';
import { ReferralIdVO } from '../../../domain/value-objects/primitives/referral-id.vo';
import { ReferralCodeVO } from '../../../domain/value-objects/primitives/referral-code.vo';
import { ReferralStatusVO } from '../../../domain/value-objects/primitives/referral-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { LeadNotFoundAppError } from '../../errors/lead.errors';
import type { CreateReferralRequestDTO } from '../../dtos/requests/referral/create-referral.dto';
import type { TrackReferralRequestDTO } from '../../dtos/requests/referral/track-referral.dto';
import type { ReferralResponseDTO } from '../../dtos/responses/referral-response.dto';

@Injectable()
export class ReferralService
  extends BaseService<ReferralEntity, string>
  implements ReferralServiceInterface
{
  readonly name = 'ReferralService';

  constructor(
    private readonly repo: ReferralRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateReferralRequestDTO): Promise<ReferralResponseDTO> {
    const code = input.code ?? `REF-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const entity = ReferralEntity.create({
      referrerId: UserIdVO.create(input.referrerId),
      refereeId: null,
      code: ReferralCodeVO.create(code),
      status: ReferralStatusVO.create('pending'),
      convertedAt: null,
    });
    await this.repo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.toDTO(entity);
  }

  async track(input: TrackReferralRequestDTO): Promise<void> {
    const entity = await this.repo.findByCode(ReferralCodeVO.create(input.code));
    if (!entity) throw new LeadNotFoundAppError(input.code);
    if (input.refereeId) {
      const converted = entity.convert(UserIdVO.create(input.refereeId));
      await this.repo.save(converted);
      const events = converted.pullDomainEvents();
      for (const e of events) this.eventBus.publish(e as never);
    }
  }

  async redeem(referralId: string, userId: string): Promise<void> {
    const entity = await this.repo.findById(ReferralIdVO.create(referralId));
    if (!entity) throw new LeadNotFoundAppError(referralId);
    void userId;
  }

  private toDTO(entity: ReferralEntity): ReferralResponseDTO {
    return {
      id: entity.id.value,
      referrerId: entity.referrerId.value,
      refereeId: entity.refereeId?.value,
      code: entity.code.value,
      status: entity.status.value,
      convertedAt: entity.convertedAt?.toISOString(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as ReferralResponseDTO;
  }
}
