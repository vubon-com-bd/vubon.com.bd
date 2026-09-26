/**
 * FaqCategoryVO — FAQ category composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketCategoryIdVO } from '../primitives/ticket-category-id.vo';

export interface FaqCategoryVOProps {
  readonly id: TicketCategoryIdVO;
  readonly name: string;
  readonly slug: string;
  readonly isActive: boolean;
  readonly sortOrder?: number;
}

export class FaqCategoryVO extends BaseVO<Readonly<FaqCategoryVOProps>> {
  private constructor(props: FaqCategoryVOProps) {
    super(
      Object.freeze({
        ...props,
        sortOrder: props.sortOrder ?? 0,
      }),
    );
  }

  static create(props: FaqCategoryVOProps): FaqCategoryVO {
    if (!props.id || !props.name || !props.slug) {
      throw new ValidationError(
        'FaqCategoryVO requires id, name, slug',
        'faqCategory',
      );
    }
    return new FaqCategoryVO(props);
  }

  get id(): TicketCategoryIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get slug(): string {
    return this.value.slug;
  }

  get isActive(): boolean {
    return this.value.isActive;
  }

  get sortOrder(): number {
    return this.value.sortOrder ?? 0;
  }
}
