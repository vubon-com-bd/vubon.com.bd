import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';
import { PromptTemplateVO_ } from '../value-objects/composites/prompt-template.vo';

export interface PromptTemplateEntityProps {
  readonly promptId: PromptIdVO;
  readonly template: PromptTemplateVO_;
}

export class PromptTemplateEntity extends BaseEntity<PromptIdVO> {
  private readonly _promptId: PromptIdVO;
  private readonly _template: PromptTemplateVO_;

  private constructor(
    id: PromptIdVO,
    props: PromptTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._promptId = props.promptId;
    this._template = props.template;
  }

  static create(props: PromptTemplateEntityProps): PromptTemplateEntity {
    const now = new Date().toISOString();
    return new PromptTemplateEntity(props.promptId, props, now, now, null);
  }

  static reconstitute(
    id: PromptIdVO,
    props: PromptTemplateEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PromptTemplateEntity {
    return new PromptTemplateEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  hasVariable(v: string): boolean {
    return this._template.hasVariable(v);
  }

  get promptId(): PromptIdVO { return this._promptId; }
  get template(): PromptTemplateVO_ { return this._template; }
}
