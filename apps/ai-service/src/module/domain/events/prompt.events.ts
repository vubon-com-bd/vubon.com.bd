import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AiPrompt';

export class PromptExecutedEvent extends BaseDomainEvent<
  'ai.prompt.executed',
  { promptId: string; model: string; tokenCount: number }
> {
  constructor(aggregateId: string, promptId: string, model: string, tokenCount: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.prompt.executed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { promptId, model, tokenCount },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CompletionGeneratedEvent extends BaseDomainEvent<
  'ai.completion.generated',
  { completionId: string; promptId: string; tokensUsed: number }
> {
  constructor(aggregateId: string, completionId: string, promptId: string, tokensUsed: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'ai.completion.generated',
      aggregateId,
      aggregateType: 'AiCompletion',
      payload: { completionId, promptId, tokensUsed },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
