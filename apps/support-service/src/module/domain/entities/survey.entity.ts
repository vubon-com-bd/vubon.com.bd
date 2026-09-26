/**
 * SurveyEntity — Survey aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<SurveyIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../value-objects/primitives/survey-type.vo';
import { SurveyStatusVO } from '../value-objects/primitives/survey-status.vo';
import { SurveyQuestionVO } from '../value-objects/primitives/survey-question.vo';

export interface CreateSurveyInput {
  readonly id: SurveyIdVO;
  readonly type: SurveyTypeVO;
  readonly title: string;
  readonly questions: readonly SurveyQuestionVO[];
  readonly now: string;
}

export interface SurveySnapshot {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly title: string;
  readonly questions: readonly string[];
  readonly responseCount: number;
  readonly publishedAt?: string;
  readonly closedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const TITLE_MIN = 3;
const TITLE_MAX = 200;
const MAX_QUESTIONS = 50;

export class SurveyEntity extends AggregateRoot<SurveyIdVO> {
  private readonly _type: SurveyTypeVO;
  private _status: SurveyStatusVO;
  private _title: string;
  private _questions: readonly SurveyQuestionVO[];
  private _responseCount: number;
  private _publishedAt?: string;
  private _closedAt?: string;

  private constructor(
    id: SurveyIdVO,
    type: SurveyTypeVO,
    status: SurveyStatusVO,
    title: string,
    questions: readonly SurveyQuestionVO[],
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._status = status;
    this._title = title;
    this._questions = Object.freeze([...questions]);
    this._responseCount = 0;
  }

  static create(input: CreateSurveyInput): SurveyEntity {
    if (!input.id) {
      throw new ValidationError('Survey id required', 'survey');
    }
    const title = input.title?.trim();
    if (!title || title.length < TITLE_MIN || title.length > TITLE_MAX) {
      throw new ValidationError('Invalid survey title', 'survey');
    }
    if (!Array.isArray(input.questions) || input.questions.length === 0) {
      throw new ValidationError(
        'Survey requires at least one question',
        'survey',
      );
    }
    if (input.questions.length > MAX_QUESTIONS) {
      throw new ValidationError(
        `Survey supports max ${MAX_QUESTIONS} questions`,
        'survey',
      );
    }
    const now = input.now;
    return new SurveyEntity(
      input.id,
      input.type,
      SurveyStatusVO.create('draft'),
      title,
      input.questions,
      now,
      now,
    );
  }

  static rehydrate(snapshot: SurveySnapshot): SurveyEntity {
    const survey = new SurveyEntity(
      SurveyIdVO.create(snapshot.id),
      SurveyTypeVO.create(snapshot.type),
      SurveyStatusVO.create(snapshot.status),
      snapshot.title,
      snapshot.questions.map((q) => SurveyQuestionVO.create(q)),
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    survey._responseCount = snapshot.responseCount;
    survey._publishedAt = snapshot.publishedAt;
    survey._closedAt = snapshot.closedAt;
    return survey;
  }

  get type(): SurveyTypeVO {
    return this._type;
  }

  get status(): SurveyStatusVO {
    return this._status;
  }

  get title(): string {
    return this._title;
  }

  get questions(): readonly SurveyQuestionVO[] {
    return this._questions;
  }

  get questionCount(): number {
    return this._questions.length;
  }

  get responseCount(): number {
    return this._responseCount;
  }

  get isAcceptingResponses(): boolean {
    return this._status.isAcceptingResponses();
  }

  get isClosed(): boolean {
    return this._status.isClosed();
  }

  get isSatisfaction(): boolean {
    return this._type.isSatisfactionSurvey();
  }

  publish(now: string): void {
    if (this.isAcceptingResponses) {
      throw new BusinessRuleError(
        'Survey already published',
        'survey.already.published',
      );
    }
    if (this._questions.length === 0) {
      throw new BusinessRuleError(
        'Cannot publish survey without questions',
        'survey.no.questions',
      );
    }
    this._status = SurveyStatusVO.create('active');
    this._publishedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  close(now: string): void {
    if (this.isClosed) {
      throw new BusinessRuleError('Survey already closed', 'survey.already.closed');
    }
    this._status = SurveyStatusVO.create('closed');
    this._closedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  addQuestion(question: SurveyQuestionVO, now: string): void {
    if (this.isAcceptingResponses) {
      throw new BusinessRuleError(
        'Cannot add question to an active survey',
        'survey.active.add_question',
      );
    }
    if (this._questions.length >= MAX_QUESTIONS) {
      throw new BusinessRuleError(
        `Survey supports max ${MAX_QUESTIONS} questions`,
        'survey.questions.limit',
      );
    }
    this._questions = Object.freeze([...this._questions, question]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordResponse(): void {
    if (!this.isAcceptingResponses) {
      throw new BusinessRuleError(
        'Survey is not accepting responses',
        'survey.not.accepting',
      );
    }
    this._responseCount += 1;
  }

  toSnapshot(): SurveySnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      status: this._status.value,
      title: this._title,
      questions: this._questions.map((q) => q.value),
      responseCount: this._responseCount,
      publishedAt: this._publishedAt,
      closedAt: this._closedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
