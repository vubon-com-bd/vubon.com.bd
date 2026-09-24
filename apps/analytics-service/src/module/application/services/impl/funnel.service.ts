import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { FunnelEntity } from '../../../domain/entities/funnel.entity';
import { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo';
import { FunnelBuilderService } from '../../../domain/services/funnel-builder.service';
import { FunnelAnalyzerService } from '../../../domain/services/funnel-analyzer.service';
import type { FunnelRepository } from '../../../domain/repositories/funnel.repository.interface';
import type { FunnelServiceInterface } from '../interfaces/funnel.service.interface';
import type { CreateFunnelDTO, AnalyzeFunnelDTO } from '../../dtos/requests/funnel';
import {
  type FunnelResponseDTO,
  type FunnelAnalysisResponseDTO,
  toFunnelResponse,
  toFunnelAnalysisResponse,
} from '../../dtos/responses';

@Injectable()
export class FunnelService
  extends BaseService<FunnelEntity, FunnelIdVO>
  implements FunnelServiceInterface
{
  readonly name = 'FunnelService';

  constructor(
    private readonly funnelRepo: FunnelRepository,
    private readonly builder: FunnelBuilderService,
    private readonly analyzer: FunnelAnalyzerService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateFunnelDTO): Promise<FunnelResponseDTO> {
    const entity = this.builder.build(
      input.name,
      input.steps.map((s) => ({ step: s })),
    );
    await this.funnelRepo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toFunnelResponse(entity);
  }

  async analyze(input: AnalyzeFunnelDTO): Promise<FunnelAnalysisResponseDTO> {
    const funnel = await this.funnelRepo.findById(FunnelIdVO.create(input.funnelId));
    if (!funnel) throw new Error(`Funnel not found: ${input.funnelId}`);

    const analysis = this.analyzer.analyze(funnel, []);
    const marked = funnel.markAnalyzed();
    await this.funnelRepo.save(marked);
    const events = marked.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);

    return toFunnelAnalysisResponse(analysis);
  }
}
