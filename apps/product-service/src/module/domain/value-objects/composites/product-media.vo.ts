import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface ProductMediaProps {
  readonly id: string;
  readonly url: string;
  readonly type: 'image' | 'video' | 'document';
  readonly order: number;
}

export class ProductMediaVO extends BaseVO<ProductMediaProps> {
  private constructor(props: ProductMediaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductMediaProps): ProductMediaVO {
    return new ProductMediaVO(props);
  }

  get id(): string { return this.value.id; }
  get url(): string { return this.value.url; }
  get type(): 'image' | 'video' | 'document' { return this.value.type; }
  get order(): number { return this.value.order; }
}
