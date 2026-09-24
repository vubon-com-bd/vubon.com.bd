import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface KnowledgeCategoryProps {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly sortOrder: number;
  readonly isActive: boolean;
}

export class KnowledgeCategoryVO extends BaseVO<KnowledgeCategoryProps> {
  private constructor(props: KnowledgeCategoryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: KnowledgeCategoryProps): KnowledgeCategoryVO {
    return new KnowledgeCategoryVO(props);
  }

  get id(): string { return this.value.id; }
  get name(): string { return this.value.name; }
  get description(): string | null { return this.value.description; }
  get sortOrder(): number { return this.value.sortOrder; }
  get isActive(): boolean { return this.value.isActive; }
}
