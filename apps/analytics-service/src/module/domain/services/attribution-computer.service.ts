import { AttributionEntity } from '../entities/attribution.entity';
import { AttributionModelVO } from '../value-objects/primitives/attribution-model.vo';

export class AttributionComputerService {
  /**
   * Compute multi-touch attribution for a conversion.
   */
  compute(input: {
    conversionId: string;
    model: string;
    touchpoints: readonly string[];
    conversionValue: number;
  }): AttributionEntity {
    const model = AttributionModelVO.create(input.model);
    return AttributionEntity.create({
      model,
      conversionId: input.conversionId,
      touchpoints: input.touchpoints,
      conversionValue: input.conversionValue,
    });
  }
}
