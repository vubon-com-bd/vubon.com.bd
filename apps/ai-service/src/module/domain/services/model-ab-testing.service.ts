import { ModelEntity } from '../entities/model.entity';

export interface AbTestSplit {
  readonly modelA: ModelEntity;
  readonly modelB: ModelEntity;
  readonly trafficPercentA: number;
  readonly trafficPercentB: number;
}

export class ModelAbTestingService {
  /**
   * Decide which model variant to use based on user bucket.
   */
  selectVariant(split: AbTestSplit, userBucket: number): ModelEntity {
    if (userBucket < 0 || userBucket > 100) {
      throw new Error('ModelAbTesting: userBucket must be in [0, 100]');
    }
    return userBucket < split.trafficPercentA ? split.modelA : split.modelB;
  }

  validateSplit(split: AbTestSplit): void {
    const total = split.trafficPercentA + split.trafficPercentB;
    if (total !== 100) {
      throw new Error(`ModelAbTesting: traffic must sum to 100, got ${total}`);
    }
    if (split.modelA.id.value === split.modelB.id.value) {
      throw new Error('ModelAbTesting: modelA and modelB must differ');
    }
  }

  pickWinner(a: ModelEntity, b: ModelEntity): ModelEntity {
    const aScore = a.metrics?.accuracy ?? 0;
    const bScore = b.metrics?.accuracy ?? 0;
    return aScore >= bScore ? a : b;
  }
}
