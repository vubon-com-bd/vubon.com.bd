import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AttributeIdVO } from '../primitives/attribute-id.vo';
import { AttributeNameVO } from '../primitives/attribute-name.vo';
import { AttributeValueVO } from '../primitives/attribute-value.vo';

export interface ProductAttributeProps {
  readonly attributeId: AttributeIdVO;
  readonly attributeName: AttributeNameVO;
  readonly attributeValue: AttributeValueVO;
}

export class ProductAttributeVO extends BaseVO<ProductAttributeProps> {
  private constructor(props: ProductAttributeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ProductAttributeProps): ProductAttributeVO {
    return new ProductAttributeVO(props);
  }

  get attributeId(): AttributeIdVO { return this.value.attributeId; }
  get attributeName(): AttributeNameVO { return this.value.attributeName; }
  get attributeValue(): AttributeValueVO { return this.value.attributeValue; }
}
