import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';
import { PromptTokenCountVO } from '../value-objects/primitives/prompt-token-count.vo';
import { PromptTemplateVO_ } from '../value-objects/composites/prompt-template.vo';

export interface PromptEntityProps {
  readonly type: string;
  readonly text: string;
  readonly role: string;
  readonly template: PromptTemplateVO_ | null;
  readonly tokenCount: PromptTokenCountVO;
}

export class PromptEntity extends AggregateRoot<PromptIdVO> {
  private readonly _type: string;
  private readonly _text: string;
  private readonly _role: string;
  private readonly _template: PromptTemplateVO_ | null;
  private readonly _tokenCount: PromptTokenCountVO;

  private constructor(
    id: PromptIdVO,
    props: PromptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._text = props.text;
    this._role = props.role;
    this._template = props.template;
    this._tokenCount = props.tokenCount;
  }

  static create(props: PromptEntityProps): PromptEntity {
    if (props.text.trim().length === 0) {
      throw new Error('Prompt: text cannot be empty');
    }
    const now = new Date().toISOString();
    const id = PromptIdVO.create(crypto.randomUUID());
    return new PromptEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PromptIdVO,
    props: PromptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PromptEntity {
    return new PromptEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isFromTemplate(): boolean {
    return this._template !== null;
  }

  get type(): string { return this._type; }
  get text(): string { return this._text; }
  get role(): string { return this._role; }
  get template(): PromptTemplateVO_ | null { return this._template; }
  get tokenCount(): PromptTokenCountVO { return this._tokenCount; }
}
