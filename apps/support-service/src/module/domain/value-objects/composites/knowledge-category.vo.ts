/**
 * KnowledgeCategoryVO — KB category composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TicketCategoryIdVO } from '../primitives/ticket-category-id.vo';

export interface KnowledgeCategoryVOProps {
  readonly id: TicketCategoryIdVO;
  readonly name: string;
  readonly slug: string;
  readonly isActive: boolean;
  readonly sortOrder?: number;
  readonly parentId?: TicketCategoryIdVO;
}

export class KnowledgeCategoryVO extends BaseVO<Readonly<KnowledgeCategoryVOProps>> {
  private constructor(props: KnowledgeCategoryVOProps) {
    super(Object.freeze({ ...props, sortOrder: props.sortOrder ?? 0 }));
  }

  static create(props: KnowledgeCategoryVOProps): KnowledgeCategoryVO {
    if (!props.id || !props.name || !props.slug) {
      throw new ValidationError(
        'KnowledgeCategoryVO requires id, name, slug',
        'knowledgeCategory',
      );
    }
    return new KnowledgeCategoryVO(props);
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

  get isRoot(): boolean {
    return this.value.parentId === undefined;
  }

  hasParent(): boolean {
    return this.value.parentId !== undefined;
  }
}
