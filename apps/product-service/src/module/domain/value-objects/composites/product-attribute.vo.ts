/**
 * ProductAttribute Composite Value Object
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AttributeIdVO } from '../primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../primitives/attribute-name.vo.js';
import { AttributeValueVO } from '../primitives/attribute-value.vo.js';

export interface ProductAttributeVOProps {
  readonly id: AttributeIdVO;
  readonly name: AttributeNameVO;
  readonly values: readonly AttributeValueVO[];
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
}

export class ProductAttributeVO extends BaseVO<ProductAttributeVOProps> {
  private constructor(props: ProductAttributeVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ProductAttributeVOProps): ProductAttributeVO {
    const vo = new ProductAttributeVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ProductAttributeVOProps): ProductAttributeVO {
    return new ProductAttributeVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.values.length === 0) {
      throw new ValidationError('ProductAttribute must have at least one value', 'values');
    }
    if (v.unit && v.unit.trim().length === 0) {
      throw new ValidationError('ProductAttribute unit cannot be empty string', 'unit');
    }
  }

  get id(): AttributeIdVO { return this.value.id; }
  get name(): AttributeNameVO { return this.value.name; }
  get values(): readonly AttributeValueVO[] { return this.value.values; }
  get isRequired(): boolean { return this.value.isRequired; }
  get isSearchable(): boolean { return this.value.isSearchable; }
  get isFilterable(): boolean { return this.value.isFilterable; }
  get unit(): string | undefined { return this.value.unit; }

  hasValue(value: AttributeValueVO): boolean {
    return this.values.some((v) => v.equals(value));
  }

  hasUnit(): boolean { return this.unit !== undefined; }
  isMultiValue(): boolean { return this.values.length > 1; }

  firstValue(): AttributeValueVO | undefined { return this.values[0]; }
}
