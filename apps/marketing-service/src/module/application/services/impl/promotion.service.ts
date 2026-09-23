import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PromotionServiceInterface } from '../interfaces/promotion.service.interface';
import type { PromotionRepository } from '../../../domain/repositories/promotion.repository.interface';
import { PromotionEntity } from '../../../domain/entities/promotion.entity';
import { PromotionNameVO } from '../../../domain/value-objects/primitives/promotion-name.vo';
import { PromotionCodeVO } from '../../../domain/value-objects/primitives/promotion-code.vo';
import { PromotionStatusVO } from '../../../domain/value-objects/primitives/promotion-status.vo';
import { PromotionTypeVO } from '../../../domain/value-objects/primitives/promotion-type.vo';
import { PromotionUsageVO } from '../../../domain/value-objects/primitives/promotion-usage.vo';
import { PromotionNotFoundAppError } from '../../errors/promotion.errors';
import type { CreatePromotionRequestDTO } from '../../dtos/requests/promotion/create-promotion.dto';
import type { ApplyPromotionRequestDTO } from '../../dtos/requests/promotion/apply-promotion.dto';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';
import { PromotionMapper } from '../../mappers/promotion.mapper';

@Injectable()
export class PromotionService
  extends BaseService<PromotionEntity, string>
  implements PromotionServiceInterface
{
  readonly name = 'PromotionService';

  constructor(
    private readonly repo: PromotionRepository,
    private readonly eventBus: EventBus,
    private readonly mapper: PromotionMapper,
  ) {
    super();
  }

  async create(input: CreatePromotionRequestDTO): Promise<PromotionResponseDTO> {
    const generatedCode = `PROMO-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    const entity = PromotionEntity.create({
      name: PromotionNameVO.create(input.name),
      code: PromotionCodeVO.create(generatedCode),
      status: PromotionStatusVO.create('active'),
      type: PromotionTypeVO.create(input.type),
      usage: PromotionUsageVO.create(0),
      maxUsage: input.maxUses ?? null,
      startDate: input.startAt ? new Date(input.startAt) : null,
      endDate: input.endAt ? new Date(input.endAt) : null,
    });
    await this.repo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return this.mapper.toDTO(entity);
  }

  async apply(input: ApplyPromotionRequestDTO): Promise<number> {
    const entity = await this.repo.findByCode(PromotionCodeVO.create(input.code));
    if (!entity) throw new PromotionNotFoundAppError(input.code);
    return input.orderAmount;
  }

  async validate(input: ApplyPromotionRequestDTO): Promise<boolean> {
    const entity = await this.repo.findByCode(PromotionCodeVO.create(input.code));
    if (!entity) return false;
    return entity.status.value === 'active';
  }

  async findByCode(code: string): Promise<PromotionResponseDTO | null> {
    const entity = await this.repo.findByCode(PromotionCodeVO.create(code));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
