import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PromptIdVO } from '../primitives/prompt-id.vo';
import { PromptTokenCountVO } from '../primitives/prompt-token-count.vo';
import { PromptTemplateVO_ } from './prompt-template.vo';

export interface PromptProps {
  readonly id: PromptIdVO;
  readonly type: string;
  readonly text: string;
  readonly role: string;
  readonly template: PromptTemplateVO_ | null;
  readonly tokenCount: PromptTokenCountVO;
}

export class PromptVO extends BaseVO<PromptProps> {
  static create(props: PromptProps): PromptVO {
    if (props.text.trim().length === 0) {
      throw new Error('Prompt: text cannot be empty');
    }
    return new PromptVO(props);
  }

  private constructor(props: PromptProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): PromptIdVO { return this.value.id; }
  get type(): string { return this.value.type; }
  get text(): string { return this.value.text; }
  get role(): string { return this.value.role; }
  get template(): PromptTemplateVO_ | null { return this.value.template; }
  get tokenCount(): PromptTokenCountVO { return this.value.tokenCount; }

  isFromTemplate(): boolean {
    return this.value.template !== null;
  }
}
