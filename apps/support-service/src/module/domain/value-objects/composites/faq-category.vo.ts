import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface FaqCategoryProps {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly sortOrder: number;
  readonly isActive: boolean;
}

export class FaqCategoryVO extends BaseVO<FaqCategoryProps> {
  private constructor(props: FaqCategoryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FaqCategoryProps): FaqCategoryVO {
    return new FaqCategoryVO(props);
  }

  get id(): string { return this.value.id; }
  get name(): string { return this.value.name; }
  get description(): string | null { return this.value.description; }
  get sortOrder(): number { return this.value.sortOrder; }
  get isActive(): boolean { return this.value.isActive; }
}
