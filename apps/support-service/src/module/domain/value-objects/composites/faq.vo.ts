import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FaqIdVO } from '../primitives/faq-id.vo';
import { FaqQuestionVO } from '../primitives/faq-question.vo';
import { FaqAnswerVO } from '../primitives/faq-answer.vo';
import { FaqStatusVO } from '../primitives/faq-status.vo';

export interface FaqProps {
  readonly id: FaqIdVO;
  readonly question: FaqQuestionVO;
  readonly answer: FaqAnswerVO;
  readonly status: FaqStatusVO;
  readonly categoryId: string | null;
}

export class FaqVO extends BaseVO<FaqProps> {
  private constructor(props: FaqProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FaqProps): FaqVO {
    return new FaqVO(props);
  }

  get id(): FaqIdVO { return this.value.id; }
  get question(): FaqQuestionVO { return this.value.question; }
  get answer(): FaqAnswerVO { return this.value.answer; }
  get status(): FaqStatusVO { return this.value.status; }
  get categoryId(): string | null { return this.value.categoryId; }
}
