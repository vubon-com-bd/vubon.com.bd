/**
 * FaqVO — FAQ entry composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FaqIdVO } from '../primitives/faq-id.vo';
import { FaqQuestionVO } from '../primitives/faq-question.vo';
import { FaqAnswerVO } from '../primitives/faq-answer.vo';
import { FaqStatusVO } from '../primitives/faq-status.vo';

export interface FaqVOProps {
  readonly id: FaqIdVO;
  readonly question: FaqQuestionVO;
  readonly answer: FaqAnswerVO;
  readonly status: FaqStatusVO;
  readonly categoryId?: string;
}

export class FaqVO extends BaseVO<Readonly<FaqVOProps>> {
  private constructor(props: FaqVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FaqVOProps): FaqVO {
    if (!props.id || !props.question || !props.answer) {
      throw new ValidationError(
        'FaqVO requires id, question, answer',
        'faq',
      );
    }
    return new FaqVO(props);
  }

  get id(): FaqIdVO {
    return this.value.id;
  }

  get question(): FaqQuestionVO {
    return this.value.question;
  }

  get answer(): FaqAnswerVO {
    return this.value.answer;
  }

  get isPublished(): boolean {
    return this.value.status.isPubliclyVisible();
  }

  get hasCategory(): boolean {
    return this.value.categoryId !== undefined;
  }
}
