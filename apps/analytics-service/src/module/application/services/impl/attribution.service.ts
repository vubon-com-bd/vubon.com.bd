import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { AttributionEntity } from '../../../domain/entities/attribution.entity';
import { AttributionComputerService } from '../../../domain/services/attribution-computer.service';
import { AttributionVO } from '../../../domain/value-objects/composites/attribution.vo';
import { AttributionModelVO } from '../../../domain/value-objects/primitives/attribution-model.vo';
import type { AttributionRepository } from '../../../domain/repositories/attribution.repository.interface';
import type { AttributionServiceInterface } from '../interfaces/attribution.service.interface';
import {
  type AttributionResponseDTO,
  toAttributionResponse,
} from '../../dtos/responses';

@Injectable()
export class AttributionService
  extends BaseService<AttributionEntity, string>
  implements AttributionServiceInterface
{
  readonly name = 'AttributionService';

  constructor(
    private readonly repo: AttributionRepository,
    private readonly computer: AttributionComputerService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async compute(input: {
    conversionId: string;
    model: string;
    touchpoints: readonly string[];
    conversionValue: number;
  }): Promise<AttributionResponseDTO> {
    const entity = this.computer.compute(input);
    await this.repo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);

    // Build VO for response
    const vo = AttributionVO.create({
      model: AttributionModelVO.create(input.model),
      touchpoints: [...input.touchpoints],
      conversionValue: input.conversionValue,
    });
    return toAttributionResponse(vo);
  }
}
