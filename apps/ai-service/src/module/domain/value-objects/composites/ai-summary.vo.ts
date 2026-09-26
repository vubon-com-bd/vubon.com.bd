import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface AiSummaryProps {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly summary: string;
  readonly keywords: readonly string[];
  readonly language: string;
  readonly generatedAt: Date;
}

export class AiSummaryVO extends BaseVO<AiSummaryProps> {
  static create(props: AiSummaryProps): AiSummaryVO {
    if (props.summary.trim().length === 0) {
      throw new Error('AiSummary: summary cannot be empty');
    }
    return new AiSummaryVO(props);
  }

  private constructor(props: AiSummaryProps) {
    super(
      Object.freeze({
        ...props,
        keywords: Object.freeze([...props.keywords]),
      }),
    );
  }

  get sourceId(): string { return this.value.sourceId; }
  get sourceType(): string { return this.value.sourceType; }
  get summary(): string { return this.value.summary; }
  get keywords(): readonly string[] { return this.value.keywords; }
  get language(): string { return this.value.language; }
  get generatedAt(): Date { return this.value.generatedAt; }

  hasKeyword(keyword: string): boolean {
    return this.value.keywords.includes(keyword);
  }
}
