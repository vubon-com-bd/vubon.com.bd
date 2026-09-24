import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { TemplateIdVO } from '../value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../value-objects/primitives/template-type.vo';
import { TemplateContentVO } from '../value-objects/primitives/template-content.vo';

export interface SupportTemplateEntityProps {
  readonly name: string;
  readonly type: TemplateTypeVO;
  readonly content: TemplateContentVO;
  readonly variables: ReadonlyArray<string>;
  readonly isActive: boolean;
}

export class SupportTemplateEntity extends AggregateRoot<TemplateIdVO> {
  private readonly _name: string;
  private readonly _type: TemplateTypeVO;
  private readonly _content: TemplateContentVO;
  private readonly _variables: ReadonlyArray<string>;
  private readonly _isActive: boolean;

  private constructor(
    id: TemplateIdVO,
    props: SupportTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._content = props.content;
    this._variables = Object.freeze([...props.variables]);
    this._isActive = props.isActive;
  }

  static create(props: SupportTemplateEntityProps): SupportTemplateEntity {
    const now = new Date().toISOString();
    const id = TemplateIdVO.create(crypto.randomUUID());
    return new SupportTemplateEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: TemplateIdVO,
    props: SupportTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SupportTemplateEntity {
    return new SupportTemplateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): TemplateTypeVO { return this._type; }
  get content(): TemplateContentVO { return this._content; }
  get variables(): ReadonlyArray<string> { return this._variables; }
  get isActive(): boolean { return this._isActive; }
}
