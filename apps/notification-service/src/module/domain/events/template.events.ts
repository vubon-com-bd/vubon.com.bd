/* istanbul ignore file -- pure event declarations */
/**
 * Template Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const TEMPLATE_EVENT_TYPE = {
  CREATED: 'template.created',
  UPDATED: 'template.updated',
  ACTIVATED: 'template.activated',
  ARCHIVED: 'template.archived',
  RENDERED: 'template.rendered',
} as const;

export interface TemplateCreatedPayload {
  readonly templateId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly format: string;
  readonly createdAt: string;
}

export interface TemplateUpdatedPayload {
  readonly templateId: string;
  readonly changedFields: readonly string[];
  readonly version: number;
  readonly updatedAt: string;
}

export interface TemplateActivatedPayload {
  readonly templateId: string;
  readonly previousStatus: string;
  readonly activatedAt: string;
}

export interface TemplateArchivedPayload {
  readonly templateId: string;
  readonly reason?: string;
  readonly archivedAt: string;
}

export interface TemplateRenderedPayload {
  readonly templateId: string;
  readonly locale: string;
  readonly missingVariables: readonly string[];
  readonly renderedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.TEMPLATE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class TemplateCreatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.CREATED,
  TemplateCreatedPayload
> {
  constructor(p: EventParams<TemplateCreatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.CREATED, p));
  }
}

export class TemplateUpdatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.UPDATED,
  TemplateUpdatedPayload
> {
  constructor(p: EventParams<TemplateUpdatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.UPDATED, p));
  }
}

export class TemplateActivatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.ACTIVATED,
  TemplateActivatedPayload
> {
  constructor(p: EventParams<TemplateActivatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.ACTIVATED, p));
  }
}

export class TemplateArchivedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.ARCHIVED,
  TemplateArchivedPayload
> {
  constructor(p: EventParams<TemplateArchivedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.ARCHIVED, p));
  }
}

export class TemplateRenderedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.RENDERED,
  TemplateRenderedPayload
> {
  constructor(p: EventParams<TemplateRenderedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.RENDERED, p));
  }
}
