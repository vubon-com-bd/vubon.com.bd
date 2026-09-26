/**
 * SurveyResponseEntity — A single user's response to a survey
 * @module support-service/domain/entities
 *
 * Registry: extends BaseEntity<SurveyIdVO> (id reuses SurveyIdVO for response id)
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SurveyAnswerInput {
  readonly questionId: string;
  readonly value: string | number | readonly string[];
}

export interface CreateSurveyResponseInput {
  readonly id: SurveyIdVO;
  readonly surveyId: SurveyIdVO;
  readonly userId: UserIdVO;
  readonly answers: readonly SurveyAnswerInput[];
  readonly now: string;
}

export interface SurveyResponseSnapshot {
  readonly id: string;
  readonly surveyId: string;
  readonly userId: string;
  readonly answers: readonly SurveyAnswerInput[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SurveyResponseEntity extends BaseEntity<SurveyIdVO> {
  private readonly _surveyId: SurveyIdVO;
  private readonly _userId: UserIdVO;
  private readonly _answers: readonly SurveyAnswerInput[];

  private constructor(
    id: SurveyIdVO,
    surveyId: SurveyIdVO,
    userId: UserIdVO,
    answers: readonly SurveyAnswerInput[],
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._surveyId = surveyId;
    this._userId = userId;
    this._answers = Object.freeze(answers.map((a) => Object.freeze({ ...a })));
  }

  static create(input: CreateSurveyResponseInput): SurveyResponseEntity {
    if (!input.id || !input.surveyId || !input.userId) {
      throw new ValidationError(
        'SurveyResponse requires id, surveyId, userId',
        'surveyResponse',
      );
    }
    if (!Array.isArray(input.answers) || input.answers.length === 0) {
      throw new ValidationError(
        'SurveyResponse requires at least one answer',
        'surveyResponse',
      );
    }
    for (const answer of input.answers) {
      if (!answer.questionId || typeof answer.questionId !== 'string') {
        throw new ValidationError(
          'Each answer requires a questionId',
          'surveyResponse',
        );
      }
    }
    const now = input.now;
    return new SurveyResponseEntity(
      input.id,
      input.surveyId,
      input.userId,
      input.answers,
      now,
      now,
    );
  }

  static rehydrate(snapshot: SurveyResponseSnapshot): SurveyResponseEntity {
    return new SurveyResponseEntity(
      SurveyIdVO.create(snapshot.id),
      SurveyIdVO.create(snapshot.surveyId),
      UserIdVO.create(snapshot.userId),
      snapshot.answers,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
  }

  get surveyId(): SurveyIdVO {
    return this._surveyId;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get answers(): readonly SurveyAnswerInput[] {
    return this._answers;
  }

  get answerCount(): number {
    return this._answers.length;
  }

  hasAnswer(questionId: string): boolean {
    return this._answers.some((a) => a.questionId === questionId);
  }

  getAnswer(questionId: string): SurveyAnswerInput | undefined {
    return this._answers.find((a) => a.questionId === questionId);
  }

  addAnswer(questionId: string, value: string | number | readonly string[]): void {
    if (this.hasAnswer(questionId)) {
      throw new BusinessRuleError(
        `Answer for question ${questionId} already exists`,
        'surveyResponse.answer.duplicate',
      );
    }
    throw new BusinessRuleError(
      'SurveyResponse is immutable after submission',
      'surveyResponse.immutable',
    );
  }

  toSnapshot(): SurveyResponseSnapshot {
    return {
      id: this.id.value,
      surveyId: this._surveyId.value,
      userId: this._userId.value,
      answers: this._answers,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
