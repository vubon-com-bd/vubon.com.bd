import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';

export interface TemplateVariableEntityProps {
  readonly templateId: TemplateIdVO;
  readonly name: string;
  readonly required: boolean;
  readonly defaultValue: string | null;
}

export class TemplateVariableEntity extends BaseEntity<string> {
  private readonly _templateId: TemplateIdVO;
  private readonly _name: string;
  private readonly _required: boolean;
  private readonly _defaultValue: string | null;

  private constructor(
    id: string,
    props: TemplateVariableEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._templateId = props.templateId;
    this._name = props.name;
    this._required = props.required;
    this._defaultValue = props.defaultValue;
  }

  static create(props: TemplateVariableEntityProps): TemplateVariableEntity {
    const now = new Date().toISOString();
    return new TemplateVariableEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: TemplateVariableEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): TemplateVariableEntity {
    return new TemplateVariableEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get templateId(): TemplateIdVO { return this._templateId; }
  get name(): string { return this._name; }
  get required(): boolean { return this._required; }
  get defaultValue(): string | null { return this._defaultValue; }
}
