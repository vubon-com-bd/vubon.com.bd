import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CompletionIdVO } from '../primitives/completion-id.vo';
import { CompletionTextVO } from '../primitives/completion-text.vo';
import { PromptIdVO } from '../primitives/prompt-id.vo';

export interface CompletionProps {
  readonly id: CompletionIdVO;
  readonly promptId: PromptIdVO;
  readonly text: CompletionTextVO;
  readonly tokensUsed: number;
  readonly model: string;
  readonly finishReason: string;
}

export class CompletionVO extends BaseVO<CompletionProps> {
  static create(props: CompletionProps): CompletionVO {
    if (props.tokensUsed < 0) {
      throw new Error('Completion: tokensUsed cannot be negative');
    }
    return new CompletionVO(props);
  }

  private constructor(props: CompletionProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): CompletionIdVO { return this.value.id; }
  get promptId(): PromptIdVO { return this.value.promptId; }
  get text(): CompletionTextVO { return this.value.text; }
  get tokensUsed(): number { return this.value.tokensUsed; }
  get model(): string { return this.value.model; }
  get finishReason(): string { return this.value.finishReason; }

  isComplete(): boolean {
    return this.value.finishReason === 'stop';
  }

  getWordCount(): number {
    return this.value.text.wordCount;
  }
}
