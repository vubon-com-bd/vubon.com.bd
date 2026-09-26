import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';

const AGGREGATE_TYPE = 'Template';

export class TemplateCreatedEvent extends BaseDomainEvent<
  'template.created',
  { templateId: string; name: string }
> {
  constructor(
    aggregateId: string,
    templateId: TemplateIdVO,
    name: string,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'template.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { templateId: templateId.value, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TemplateUpdatedEvent extends BaseDomainEvent<
  'template.updated',
  { templateId: string }
> {
  constructor(
    aggregateId: string,
    templateId: TemplateIdVO,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'template.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { templateId: templateId.value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
