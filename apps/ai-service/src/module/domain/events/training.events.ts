import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiTraining';

export class TrainingStartedEvent extends BaseDomainEvent<
  'ai.training.started',
  { trainingId: string; modelId: string }
> {
  constructor(aggregateId: string, trainingId: string, modelId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.training.started',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { trainingId, modelId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class TrainingCompletedEvent extends BaseDomainEvent<
  'ai.training.completed',
  { trainingId: string; modelId: string }
> {
  constructor(aggregateId: string, trainingId: string, modelId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.training.completed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { trainingId, modelId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class TrainingFailedEvent extends BaseDomainEvent<
  'ai.training.failed',
  { trainingId: string; modelId: string; error: string }
> {
  constructor(aggregateId: string, trainingId: string, modelId: string, error: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.training.failed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { trainingId, modelId, error },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
