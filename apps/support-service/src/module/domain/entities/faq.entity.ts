/**
 * FaqEntity — FAQ entry aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<FaqIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { FaqIdVO } from '../value-objects/primitives/faq-id.vo';
import { FaqQuestionVO } from '../value-objects/primitives/faq-question.vo';
import { FaqAnswerVO } from '../value-objects/primitives/faq-answer.vo';
import { FaqStatusVO } from '../value-objects/primitives/faq-status.vo';
import { TicketCategoryIdVO } from '../value-objects/primitives/ticket-category-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CreateFaqInput {
  readonly id: FaqIdVO;
  readonly question: FaqQuestionVO;
  readonly answer: FaqAnswerVO;
  readonly categoryId: TicketCategoryIdVO;
  readonly authorId: UserIdVO;
  readonly now: string;
}

export interface FaqSnapshot {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly status: string;
  readonly categoryId: string;
  readonly authorId: string;
  readonly viewCount: number;
  readonly helpfulCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class FaqEntity extends AggregateRoot<FaqIdVO> {
  private _question: FaqQuestionVO;
  private _answer: FaqAnswerVO;
  private _status: FaqStatusVO;
  private readonly _categoryId: TicketCategoryIdVO;
  private readonly _authorId: UserIdVO;
  private _viewCount: number;
  private _helpfulCount: number;

  private constructor(
    id: FaqIdVO,
    question: FaqQuestionVO,
    answer: FaqAnswerVO,
    status: FaqStatusVO,
    categoryId: TicketCategoryIdVO,
    authorId: UserIdVO,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._question = question;
    this._answer = answer;
    this._status = status;
    this._categoryId = categoryId;
    this._authorId = authorId;
    this._viewCount = 0;
    this._helpfulCount = 0;
  }

  static create(input: CreateFaqInput): FaqEntity {
    if (!input.id || !input.question || !input.answer) {
      throw new ValidationError(
        'Faq requires id, question, answer',
        'faq',
      );
    }
    const now = input.now;
    return new FaqEntity(
      input.id,
      input.question,
      input.answer,
      FaqStatusVO.draft(),
      input.categoryId,
      input.authorId,
      now,
      now,
    );
  }

  static rehydrate(snapshot: FaqSnapshot): FaqEntity {
    const faq = new FaqEntity(
      FaqIdVO.create(snapshot.id),
      FaqQuestionVO.create(snapshot.question),
      FaqAnswerVO.create(snapshot.answer),
      FaqStatusVO.create(snapshot.status),
      TicketCategoryIdVO.create(snapshot.categoryId),
      UserIdVO.create(snapshot.authorId),
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    faq._viewCount = snapshot.viewCount;
    faq._helpfulCount = snapshot.helpfulCount;
    return faq;
  }

  get question(): FaqQuestionVO {
    return this._question;
  }

  get answer(): FaqAnswerVO {
    return this._answer;
  }

  get status(): FaqStatusVO {
    return this._status;
  }

  get categoryId(): TicketCategoryIdVO {
    return this._categoryId;
  }

  get viewCount(): number {
    return this._viewCount;
  }

  get helpfulCount(): number {
    return this._helpfulCount;
  }

  get isPublished(): boolean {
    return this._status.isPubliclyVisible();
  }

  updateContent(
    question: FaqQuestionVO,
    answer: FaqAnswerVO,
    now: string,
  ): void {
    if (this.isPublished) {
      throw new BusinessRuleError(
        'Published FAQs must be unpublished before edit',
        'faq.published.edit',
      );
    }
    this._question = question;
    this._answer = answer;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  publish(now: string): void {
    if (this.isPublished) {
      throw new BusinessRuleError('FAQ already published', 'faq.already.published');
    }
    this._status = FaqStatusVO.published();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  unpublish(now: string): void {
    if (!this.isPublished) {
      throw new BusinessRuleError('FAQ is not published', 'faq.not.published');
    }
    this._status = FaqStatusVO.draft();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordView(): void {
    this._viewCount += 1;
  }

  recordHelpful(): void {
    if (this._helpfulCount >= this._viewCount) {
      throw new BusinessRuleError(
        'Helpful count cannot exceed view count',
        'faq.helpful.exceeds.views',
      );
    }
    this._helpfulCount += 1;
  }

  toSnapshot(): FaqSnapshot {
    return {
      id: this.id.value,
      question: this._question.value,
      answer: this._answer.value,
      status: this._status.value,
      categoryId: this._categoryId.value,
      authorId: this._authorId.value,
      viewCount: this._viewCount,
      helpfulCount: this._helpfulCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
