import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CompletionIdVO } from '../value-objects/primitives/completion-id.vo';
import { CompletionTextVO } from '../value-objects/primitives/completion-text.vo';
import { PromptIdVO } from '../value-objects/primitives/prompt-id.vo';

export interface CompletionEntityProps {
  readonly promptId: PromptIdVO;
  readonly text: CompletionTextVO;
  readonly tokensUsed: number;
  readonly model: string;
  readonly finishReason: string;
}

export class CompletionEntity extends BaseEntity<CompletionIdVO> {
  private readonly _promptId: PromptIdVO;
  private readonly _text: CompletionTextVO;
  private readonly _tokensUsed: number;
  private readonly _model: string;
  private readonly _finishReason: string;

  private constructor(
    id: CompletionIdVO,
    props: CompletionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._promptId = props.promptId;
    this._text = props.text;
    this._tokensUsed = props.tokensUsed;
    this._model = props.model;
    this._finishReason = props.finishReason;
  }

  static create(props: CompletionEntityProps): CompletionEntity {
    if (props.tokensUsed < 0) {
      throw new Error('Completion: tokensUsed cannot be negative');
    }
    const now = new Date().toISOString();
    const id = CompletionIdVO.create(crypto.randomUUID());
    return new CompletionEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CompletionIdVO,
    props: CompletionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CompletionEntity {
    return new CompletionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  isComplete(): boolean {
    return this._finishReason === 'stop';
  }

  getWordCount(): number {
    return this._text.wordCount;
  }

  get promptId(): PromptIdVO { return this._promptId; }
  get text(): CompletionTextVO { return this._text; }
  get tokensUsed(): number { return this._tokensUsed; }
  get model(): string { return this._model; }
  get finishReason(): string { return this._finishReason; }
}
