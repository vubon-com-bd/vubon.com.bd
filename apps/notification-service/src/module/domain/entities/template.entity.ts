/**
 * TemplateEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 *
 * State machine:
 *   draft → active → inactive → archived
 *   active/inactive → deprecated → archived
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { TemplateVO } from '@domain/composites/template.vo.js';
import type { TemplateVariablesVO } from '@domain/composites/template-variable.vo.js';
import type { TemplateRenderVO } from '@domain/composites/template-render.vo.js';
import type { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

import {
  TemplateCreatedEvent,
  TemplateUpdatedEvent,
  TemplateActivatedEvent,
  TemplateArchivedEvent,
  TemplateRenderedEvent,
} from '@domain/events/template.events.js';

export interface TemplateEntityProps {
  readonly vo: TemplateVO;
  readonly renderedHistory: readonly TemplateRenderVO[];
}

export class TemplateEntity extends AggregateRoot<string> {
  private _vo: TemplateVO;
  private _renderedHistory: readonly TemplateRenderVO[];

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TemplateEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._renderedHistory = props.renderedHistory;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.version < 1) {
      throw new ValidationError('Template version must be >= 1', 'version');
    }
    if (this._vo.requiresSubject() && !this._vo.hasSubject()) {
      throw new ValidationError(
        `Template type "${this._vo.type.value}" requires subject`,
        'subject',
      );
    }
  }

  get vo(): TemplateVO { return this._vo; }
  get templateId(): TemplateIdVO { return this._vo.id; }
  get status(): TemplateVO['status'] { return this._vo.status; }
  /** Template's own semantic version (from VO) — distinct from aggregate `version` (event count) */
  get templateVersion(): number { return this._vo.version; }
  get renderedHistory(): readonly TemplateRenderVO[] { return this._renderedHistory; }

  isDraft(): boolean { return this._vo.isDraft(); }
  isActive(): boolean { return this._vo.isActive(); }
  isInactive(): boolean { return this._vo.isInactive(); }
  isArchived(): boolean { return this._vo.isArchived(); }
  isDeprecated(): boolean { return this._vo.isDeprecated(); }
  isUsable(): boolean { return this._vo.isUsable(); }
  canBeDeleted(): boolean { return this._vo.canBeDeleted(); }

  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    if (this._vo.requiresSubject() && !this._vo.hasSubject()) {
      throw new BusinessRuleError(
        'Cannot activate template without subject',
        'TEMPLATE_MISSING_SUBJECT',
        { templateId: this.id },
      );
    }
    const from = this._vo.status;
    this._vo = this._vo.withStatus('active');
    this.emitActivated(from, now);
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    this._vo = this._vo.withStatus('inactive');
    this.touch(now);
    this.incrementVersion();
  }

  deprecate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('deprecated');
    this._vo = this._vo.withStatus('deprecated');
    this.touch(now);
    this.incrementVersion();
  }

  archive(
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('archived');
    this._vo = this._vo.withStatus('archived');
    this.addDomainEvent(
      new TemplateArchivedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, reason, archivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateBody(body: TemplateVO['body'], now: string = new Date().toISOString()): void {
    if (this.isArchived()) {
      throw new BusinessRuleError(
        'Cannot update archived template',
        'TEMPLATE_ARCHIVED',
        { templateId: this.id },
      );
    }
    this._vo = this._vo.withVersion(this._vo.version + 1);
    this._vo = { ...this._vo, body } as unknown as TemplateVO;
    this.emitUpdate(['body'], now);
    this.touch(now);
    this.incrementVersion();
  }

  recordRender(render: TemplateRenderVO, now: string = new Date().toISOString()): void {
    this._renderedHistory = Object.freeze([...this._renderedHistory, render]);
    this.addDomainEvent(
      new TemplateRenderedEvent({
        aggregateId: this.id,
        payload: {
          templateId: this.id,
          locale: render.locale,
          missingVariables: render.missingVariables,
          renderedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._vo.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid template status transition: "${this._vo.status}" → "${target}"`,
        'INVALID_TEMPLATE_STATUS_TRANSITION',
        { from: this._vo.status, to: target, templateId: this.id },
      );
    }
  }

  private emitActivated(from: string, now: string): void {
    this.addDomainEvent(
      new TemplateActivatedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, previousStatus: from, activatedAt: now },
        version: this.version + 1,
      }),
    );
  }

  private emitUpdate(changedFields: readonly string[], now: string): void {
    this.addDomainEvent(
      new TemplateUpdatedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, changedFields, version: this._vo.version, updatedAt: now },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: TemplateIdVO;
    vo: TemplateVO;
    now: string;
  }): TemplateEntity {
    if (!params.vo.isDraft()) {
      throw new ValidationError('New template must be in draft status', 'status');
    }

    const entity = new TemplateEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo, renderedHistory: [] },
      null,
    );

    entity.addDomainEvent(
      new TemplateCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          templateId: params.id.value,
          name: params.vo.name.value,
          slug: params.vo.slug,
          type: params.vo.type.value,
          format: params.vo.format.value,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: TemplateEntityProps;
    version?: number;
  }): TemplateEntity {
    const entity = new TemplateEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
