import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';

export interface AiSummaryEntityProps {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly summary: string;
  readonly keywords: readonly string[];
  readonly language: string;
  readonly generatedAt: Date;
}

export class AiSummaryEntity extends AggregateRoot<string> {
  private readonly _sourceId: string;
  private readonly _sourceType: string;
  private readonly _summary: string;
  private readonly _keywords: readonly string[];
  private readonly _language: string;
  private readonly _generatedAt: Date;

  private constructor(
    id: string,
    props: AiSummaryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sourceId = props.sourceId;
    this._sourceType = props.sourceType;
    this._summary = props.summary;
    this._keywords = Object.freeze([...props.keywords]);
    this._language = props.language;
    this._generatedAt = props.generatedAt;
  }

  static create(props: AiSummaryEntityProps): AiSummaryEntity {
    if (props.summary.trim().length === 0) {
      throw new Error('AiSummary: summary cannot be empty');
    }
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AiSummaryEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AiSummaryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AiSummaryEntity {
    return new AiSummaryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  hasKeyword(keyword: string): boolean {
    return this._keywords.includes(keyword);
  }

  get sourceId(): string { return this._sourceId; }
  get sourceType(): string { return this._sourceType; }
  get summary(): string { return this._summary; }
  get keywords(): readonly string[] { return this._keywords; }
  get language(): string { return this._language; }
  get generatedAt(): Date { return this._generatedAt; }
}
