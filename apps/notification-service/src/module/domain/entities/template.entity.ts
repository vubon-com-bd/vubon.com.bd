/**
 * TemplateEntity — notification template lifecycle
 * @module notification-service/domain/entities
 *
 * NOTE: `_templateVersion` is template-specific versioning (1, 2, 3 ...),
 * distinct from `AggregateRoot.version` which tracks domain-event versions.
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';

import { TemplateIdVO } from '../value-objects/primitives/template-id.vo.js';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../value-objects/primitives/template-category.vo.js';
import { TemplateNameVO } from '../value-objects/primitives/template-name.vo.js';
import { TemplateLocaleVO } from '../value-objects/primitives/template-locale.vo.js';
import { TemplateVariableVO } from '../value-objects/composites/template-variable.vo.js';

import {
  TemplateCreatedEvent,
  TemplateUpdatedEvent,
  TemplateActivatedEvent,
  TemplateDeactivatedEvent,
  TemplateDeprecatedEvent,
  TemplateArchivedEvent,
  TemplateVersionCreatedEvent,
} from '../events/template.events.js';

export interface TemplateEntityProps {
  readonly name: TemplateNameVO;
  readonly slug: string;
  readonly type: TemplateTypeVO;
  readonly status: TemplateStatusVO;
  readonly category: TemplateCategoryVO;
  readonly locale: TemplateLocaleVO;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly variables: readonly TemplateVariableVO[];
  readonly templateVersion: number;
  readonly parentId?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
}

export class TemplateEntity extends AggregateRoot<string> {
  private _name: TemplateNameVO;
  private _status: TemplateStatusVO;
  private _category: TemplateCategoryVO;
  private _subject?: string;
  private _body: string;
  private _bodyHtml?: string;
  private _variables: readonly TemplateVariableVO[];
  private _templateVersion: number;
  private _updatedBy?: string;

  private readonly _type: TemplateTypeVO;
  private readonly _slug: string;
  private readonly _locale: TemplateLocaleVO;
  private readonly _parentId?: string;
  private readonly _createdBy: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TemplateEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._type = props.type;
    this._status = props.status;
    this._category = props.category;
    this._locale = props.locale;
    this._subject = props.subject;
    this._body = props.body;
    this._bodyHtml = props.bodyHtml;
    this._variables = props.variables;
    this._templateVersion = props.templateVersion;
    this._parentId = props.parentId;
    this._createdBy = props.createdBy;
    this._updatedBy = props.updatedBy;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._body || this._body.length === 0) {
      throw new ValidationError('Template body is required', 'body');
    }
    if (this._body.length > NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH) {
      throw new ValidationError(
        `Template body exceeds ${NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH} chars`,
        'body',
      );
    }
    if (this._type.isEmail()) {
      if (!this._subject || this._subject.length === 0) {
        throw new ValidationError('Email template requires a subject', 'subject');
      }
    }
    if (this._variables.length > NOTIFICATION_TEMPLATE.MAX_VARIABLES) {
      throw new ValidationError(
        `Too many variables (max ${NOTIFICATION_TEMPLATE.MAX_VARIABLES})`,
        'variables',
      );
    }
    if (this._templateVersion < 1) {
      throw new ValidationError('Template version must be >= 1', 'templateVersion');
    }
  }

  // ═══ Getters ═══
  get name(): TemplateNameVO { return this._name; }
  get slug(): string { return this._slug; }
  get type(): TemplateTypeVO { return this._type; }
  get status(): TemplateStatusVO { return this._status; }
  get category(): TemplateCategoryVO { return this._category; }
  get locale(): TemplateLocaleVO { return this._locale; }
  get subject(): string | undefined { return this._subject; }
  get body(): string { return this._body; }
  get bodyHtml(): string | undefined { return this._bodyHtml; }
  get variables(): readonly TemplateVariableVO[] { return this._variables; }
  /** Template-specific version (1, 2, 3 ...) — distinct from aggregate event `version`. */
  get templateVersion(): number { return this._templateVersion; }
  get parentId(): string | undefined { return this._parentId; }
  get createdBy(): string { return this._createdBy; }
  get updatedBy(): string | undefined { return this._updatedBy; }

  get toIdVO(): TemplateIdVO { return TemplateIdVO.reconstitute(this.id); }

  // ═══ Predicates ═══
  isActive(): boolean { return this._status.isActive(); }
  isDraft(): boolean { return this._status.isDraft(); }
  isDeprecated(): boolean { return this._status.isDeprecated(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isUsable(): boolean { return this._status.isUsable(); }

  hasVariable(name: string): boolean {
    return this._variables.some((v) => v.name.value === name);
  }

  requiredVariables(): readonly TemplateVariableVO[] {
    return this._variables.filter((v) => v.required);
  }

  // ═══ Business Methods ═══
  update(
    changes: {
      name?: TemplateNameVO;
      category?: TemplateCategoryVO;
      subject?: string;
      body?: string;
      bodyHtml?: string;
      variables?: readonly TemplateVariableVO[];
    },
    updatedBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update template "${this.id}" in status "${this._status.value}"`,
        'TEMPLATE_CANNOT_BE_UPDATED',
        { templateId: this.id, status: this._status.value },
      );
    }
    const changedFields: string[] = [];
    if (changes.name) { this._name = changes.name; changedFields.push('name'); }
    if (changes.category) { this._category = changes.category; changedFields.push('category'); }
    if (changes.subject !== undefined) { this._subject = changes.subject; changedFields.push('subject'); }
    if (changes.body !== undefined) { this._body = changes.body; changedFields.push('body'); }
    if (changes.bodyHtml !== undefined) { this._bodyHtml = changes.bodyHtml; changedFields.push('bodyHtml'); }
    if (changes.variables) { this._variables = changes.variables; changedFields.push('variables'); }
    this._updatedBy = updatedBy;
    this.assertInvariants();
    this.addDomainEvent(
      new TemplateUpdatedEvent({
        aggregateId: this.id,
        payload: {
          templateId: this.id,
          name: this._name.value,
          updatedBy,
          changedFields,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  activate(activatedBy: string, now: string = new Date().toISOString()): void {
    if (!this._status.isDraft() && !this._status.isInactive()) {
      throw new BusinessRuleError(
        `Cannot activate template "${this.id}" from status "${this._status.value}"`,
        'TEMPLATE_CANNOT_BE_ACTIVATED',
        { templateId: this.id, status: this._status.value },
      );
    }
    this._status = TemplateStatusVO.active();
    this._updatedBy = activatedBy;
    this.addDomainEvent(
      new TemplateActivatedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, activatedBy, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(deactivatedBy: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this._status.isActive()) {
      throw new BusinessRuleError(
        `Cannot deactivate template "${this.id}" from status "${this._status.value}"`,
        'TEMPLATE_CANNOT_BE_DEACTIVATED',
        { templateId: this.id, status: this._status.value },
      );
    }
    this._status = TemplateStatusVO.inactive();
    this._updatedBy = deactivatedBy;
    this.addDomainEvent(
      new TemplateDeactivatedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, deactivatedBy, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deprecate(
    deprecatedBy: string,
    replacementTemplateId?: string,
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    this._status = TemplateStatusVO.deprecated();
    this._updatedBy = deprecatedBy;
    this.addDomainEvent(
      new TemplateDeprecatedEvent({
        aggregateId: this.id,
        payload: {
          templateId: this.id,
          deprecatedBy,
          replacementTemplateId,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(archivedBy: string, now: string = new Date().toISOString()): void {
    this._status = TemplateStatusVO.archived();
    this._updatedBy = archivedBy;
    this.addDomainEvent(
      new TemplateArchivedEvent({
        aggregateId: this.id,
        payload: { templateId: this.id, archivedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  createVersion(createdBy: string, now: string = new Date().toISOString()): void {
    if (this._templateVersion >= NOTIFICATION_TEMPLATE.MAX_VERSIONS) {
      throw new BusinessRuleError(
        `Template "${this.id}" reached max versions (${NOTIFICATION_TEMPLATE.MAX_VERSIONS})`,
        'TEMPLATE_MAX_VERSIONS_REACHED',
        { templateId: this.id, currentTemplateVersion: this._templateVersion },
      );
    }
    const parentVersionId = this.id;
    this._templateVersion += 1;
    this._updatedBy = createdBy;
    this.addDomainEvent(
      new TemplateVersionCreatedEvent({
        aggregateId: this.id,
        payload: {
          templateId: this.id,
          newVersion: this._templateVersion,
          parentVersionId,
          createdBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    props: Omit<TemplateEntityProps, 'status' | 'templateVersion'> & {
      templateVersion?: number;
    };
    now: string;
  }): TemplateEntity {
    const fullProps: TemplateEntityProps = {
      ...params.props,
      status: TemplateStatusVO.draft(),
      templateVersion: params.props.templateVersion ?? 1,
    };
    const entity = new TemplateEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new TemplateCreatedEvent({
        aggregateId: params.id,
        payload: {
          templateId: params.id,
          name: params.props.name.value,
          slug: params.props.slug,
          type: params.props.type.value,
          category: params.props.category.value,
          locale: params.props.locale.value,
          variableCount: params.props.variables.length,
          createdBy: params.props.createdBy,
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
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
