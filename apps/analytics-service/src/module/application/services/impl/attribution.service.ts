/**
 * Attribution Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { AttributionEntity } from '../../../domain/entities/attribution.entity.js';
import { AttributionEntity as AttributionEntityClass } from '../../../domain/entities/attribution.entity.js';
import type { AttributionRepository } from '../../../domain/repositories/attribution.repository.interface.js';
import type { TrafficSourceRepository } from '../../../domain/repositories/traffic-source.repository.interface.js';
import { AttributionComputerService } from '../../../domain/services/attribution-computer.service.js';
import { TrafficSourceVO } from '../../../domain/value-objects/composites/traffic-source.vo.js';
import type { IAttributionService } from '../interfaces/attribution.service.interface.js';
import type { AttributionResponseData } from '../../dtos/responses/attribution-response.dto.js';

export class AttributionService extends BaseService<AttributionEntity, string> implements IAttributionService {
  readonly name = 'AttributionService';
  private readonly computer = new AttributionComputerService();

  constructor(
    private readonly repository: AttributionRepository,
    private readonly trafficRepo: TrafficSourceRepository
  ) {
    super();
  }

  async compute(input: {
    conversionId: string;
    conversionValue: number;
    touchpointIds: readonly string[];
    model: string;
  }): Promise<AttributionResponseData> {
    if (input.touchpointIds.length === 0) {
      throw new ApplicationNotFoundError('Touchpoints', input.conversionId);
    }

    const touchpoints: { source: TrafficSourceVO; timestamp: number }[] = [];
    for (let i = 0; i < input.touchpointIds.length; i++) {
      const entity = await this.trafficRepo.findById(input.touchpointIds[i]);
      if (entity) {
        touchpoints.push({ source: entity.trafficSource, timestamp: Date.now() - (input.touchpointIds.length - i) * 1000 });
      }
    }

    const attribution = this.computer.compute({
      conversionId: input.conversionId,
      conversionValue: input.conversionValue,
      touchpoints,
      model: input.model,
    });

    const now = new Date().toISOString();
    const entity = AttributionEntityClass.create({
      id: `attr_${input.conversionId}`,
      attribution,
      now,
    });
    await this.repository.save(entity);

    return this.toResponse(entity);
  }

  async findByConversionId(conversionId: string): Promise<AttributionResponseData | null> {
    const entity = await this.repository.findByConversionId(conversionId);
    return entity ? this.toResponse(entity) : null;
  }

  async findHighValue(minValue: number, limit: number): Promise<readonly AttributionResponseData[]> {
    const entities = await this.repository.findHighValue(minValue, limit);
    return entities.map((e) => this.toResponse(e));
  }

  private toResponse(entity: AttributionEntity): AttributionResponseData {
    const attr = entity.attribution;
    const credit = attr.creditByChannel();

    const touchpoints = attr.touchpoints.map((tp, i) => ({
      channel: tp.source.channel(),
      weight: tp.weight,
      creditedRevenue: attr.creditedRevenue(i),
      timestamp: tp.timestamp,
    }));

    return {
      conversionId: attr.conversionId,
      model: attr.model,
      conversionValue: attr.conversionValue,
      touchpointCount: attr.touchpointCount(),
      touchpoints,
      creditByChannel: credit,
    };
  }
}
