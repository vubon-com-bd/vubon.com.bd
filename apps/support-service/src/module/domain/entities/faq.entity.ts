import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FaqIdVO } from '../value-objects/primitives/faq-id.vo';
import { FaqQuestionVO } from '../value-objects/primitives/faq-question.vo';
import { FaqAnswerVO } from '../value-objects/primitives/faq-answer.vo';
import { FaqStatusVO } from '../value-objects/primitives/faq-status.vo';

export interface FaqEntityProps {
  readonly question: FaqQuestionVO;
  readonly answer: FaqAnswerVO;
  readonly status: FaqStatusVO;
  readonly categoryId: string | null;
  readonly keywords: ReadonlyArray<string>;
  readonly viewCount: number;
}

export class FaqEntity extends AggregateRoot<FaqIdVO> {
  private readonly _question: FaqQuestionVO;
  private readonly _answer: FaqAnswerVO;
  private readonly _status: FaqStatusVO;
  private readonly _categoryId: string | null;
  private readonly _keywords: ReadonlyArray<string>;
  private readonly _viewCount: number;

  private constructor(
    id: FaqIdVO,
    props: FaqEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._question = props.question;
    this._answer = props.answer;
    this._status = props.status;
    this._categoryId = props.categoryId;
    this._keywords = Object.freeze([...props.keywords]);
    this._viewCount = props.viewCount;
  }

  static create(props: FaqEntityProps): FaqEntity {
    const now = new Date().toISOString();
    const id = FaqIdVO.create(crypto.randomUUID());
    return new FaqEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: FaqIdVO,
    props: FaqEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FaqEntity {
    return new FaqEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  publish(): FaqEntity {
    return new FaqEntity(
      this.id,
      { ...this._toProps(), status: FaqStatusVO.create('published') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  incrementView(): FaqEntity {
    return new FaqEntity(
      this.id,
      { ...this._toProps(), viewCount: this._viewCount + 1 },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get question(): FaqQuestionVO { return this._question; }
  get answer(): FaqAnswerVO { return this._answer; }
  get status(): FaqStatusVO { return this._status; }
  get categoryId(): string | null { return this._categoryId; }
  get keywords(): ReadonlyArray<string> { return this._keywords; }
  get viewCount(): number { return this._viewCount; }

  private _toProps(): FaqEntityProps {
    return {
      question: this._question,
      answer: this._answer,
      status: this._status,
      categoryId: this._categoryId,
      keywords: this._keywords,
      viewCount: this._viewCount,
    };
  }
}
