import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiModel';

export class ModelCreatedEvent extends BaseDomainEvent<
  'ai.model.created',
  { modelId: string; name: string; type: string }
> {
  constructor(aggregateId: string, modelId: string, name: string, type: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.model.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { modelId, name, type },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ModelDeployedEvent extends BaseDomainEvent<
  'ai.model.deployed',
  { modelId: string }
> {
  constructor(aggregateId: string, modelId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.model.deployed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { modelId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ModelDeprecatedEvent extends BaseDomainEvent<
  'ai.model.deprecated',
  { modelId: string }
> {
  constructor(aggregateId: string, modelId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.model.deprecated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { modelId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
