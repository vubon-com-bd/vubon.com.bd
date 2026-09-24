import { FunnelEntity } from '../entities/funnel.entity';
import { FunnelStepVO } from '../value-objects/primitives/funnel-step.vo';

export interface FunnelStepInput {
  readonly step: string;
}

export class FunnelBuilderService {
  build(name: string, steps: readonly FunnelStepInput[]): FunnelEntity {
    if (steps.length < 2) {
      throw new Error('Funnel requires at least 2 steps');
    }
    const stepVOs = steps.map((s) => FunnelStepVO.create(s.step));
    return FunnelEntity.create({ name, steps: stepVOs });
  }
}
