import { ModelEntity } from '../entities/model.entity';
import { ModelTypeVO } from '../value-objects/primitives/model-type.vo';

export class ModelSelectionService {
  /**
   * Pick best model from candidates based on type + production readiness.
   */
  selectBest(
    candidates: readonly ModelEntity[],
    type: ModelTypeVO,
  ): ModelEntity | null {
    const eligible = candidates.filter(
      (m) => m.type.value === type.value && m.canDeploy(),
    );

    if (eligible.length === 0) return null;

    return eligible.reduce((best, current) => {
      const bestAcc = best.metrics?.accuracy ?? 0;
      const currAcc = current.metrics?.accuracy ?? 0;
      if (currAcc > bestAcc) return current;
      if (currAcc === bestAcc) {
        const bestLatency = best.metrics?.latencyMs ?? Infinity;
        const currLatency = current.metrics?.latencyMs ?? Infinity;
        return currLatency < bestLatency ? current : best;
      }
      return best;
    });
  }

  selectByType(
    candidates: readonly ModelEntity[],
    type: ModelTypeVO,
  ): readonly ModelEntity[] {
    return candidates.filter((m) => m.type.value === type.value);
  }
}
