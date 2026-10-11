/**
 * Template domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { TEMPLATE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const TEMPLATE_EVENT_TYPE = {
  CREATED: 'template.created',
  UPDATED: 'template.updated',
  ACTIVATED: 'template.activated',
  DEACTIVATED: 'template.deactivated',
  DEPRECATED: 'template.deprecated',
  ARCHIVED: 'template.archived',
  VERSION_CREATED: 'template.version_created',
} as const;

export interface TemplateCreatedPayload {
  readonly templateId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly category: string;
  readonly locale: string;
  readonly variableCount: number;
  readonly createdBy: string;
}

export interface TemplateUpdatedPayload {
  readonly templateId: string;
  readonly name: string;
  readonly updatedBy: string;
  readonly changedFields: readonly string[];
}

export interface TemplateActivatedPayload {
  readonly templateId: string;
  readonly activatedBy: string;
  readonly activatedAt: string;
}

export interface TemplateDeactivatedPayload {
  readonly templateId: string;
  readonly deactivatedBy: string;
  readonly reason?: string;
}

export interface TemplateDeprecatedPayload {
  readonly templateId: string;
  readonly deprecatedBy: string;
  readonly replacementTemplateId?: string;
  readonly reason?: string;
}

export interface TemplateArchivedPayload {
  readonly templateId: string;
  readonly archivedBy: string;
}

export interface TemplateVersionCreatedPayload {
  readonly templateId: string;
  readonly newVersion: number;
  readonly parentVersionId: string;
  readonly createdBy: string;
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
    aggregateType: TEMPLATE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
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

export class TemplateDeactivatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.DEACTIVATED,
  TemplateDeactivatedPayload
> {
  constructor(p: EventParams<TemplateDeactivatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class TemplateDeprecatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.DEPRECATED,
  TemplateDeprecatedPayload
> {
  constructor(p: EventParams<TemplateDeprecatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.DEPRECATED, p));
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

export class TemplateVersionCreatedEvent extends BaseDomainEvent<
  typeof TEMPLATE_EVENT_TYPE.VERSION_CREATED,
  TemplateVersionCreatedPayload
> {
  constructor(p: EventParams<TemplateVersionCreatedPayload>) {
    super(buildParams(TEMPLATE_EVENT_TYPE.VERSION_CREATED, p));
  }
}
