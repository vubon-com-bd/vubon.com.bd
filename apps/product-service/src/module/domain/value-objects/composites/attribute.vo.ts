/**
 * AttributeCompositeVO
 * @module product-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AttributeIdVO } from '../primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../primitives/attribute-name.vo.js';
import { AttributeValueVO } from '../primitives/attribute-value.vo.js';
import { ATTRIBUTE_TYPE } from '@vubon/shared-constants/business/product';

export interface AttributeOptionItem {
  readonly value: string;
  readonly label: string;
  readonly sortOrder: number;
}

export interface AttributeCompositeProps {
  readonly id: AttributeIdVO;
  readonly name: AttributeNameVO;
  readonly slug: string;
  readonly type: string;
  readonly isRequired: boolean;
  readonly isSearchable: boolean;
  readonly isFilterable: boolean;
  readonly unit?: string;
  readonly options?: readonly AttributeOptionItem[];
}

export class AttributeCompositeVO extends BaseVO<AttributeCompositeProps> {
  private constructor(props: AttributeCompositeProps) {
    super(props);
  }

  static create(props: AttributeCompositeProps): AttributeCompositeVO {
    if (!(Object.values(ATTRIBUTE_TYPE) as readonly string[]).includes(props.type)) {
      throw new Error(`Invalid attribute type: ${props.type}`);
    }
    const isSelectLike = props.type === ATTRIBUTE_TYPE.SELECT || props.type === ATTRIBUTE_TYPE.MULTISELECT;
    if (isSelectLike && (!props.options || props.options.length === 0)) {
      throw new Error('Select/Multiselect attributes must have options');
    }
    return new AttributeCompositeVO(props);
  }

  static reconstitute(props: AttributeCompositeProps): AttributeCompositeVO {
    return new AttributeCompositeVO(props);
  }

  get id(): AttributeIdVO { return this.value.id; }
  get name(): AttributeNameVO { return this.value.name; }
  get type(): string { return this.value.type; }
  get isRequired(): boolean { return this.value.isRequired; }
  get isFilterable(): boolean { return this.value.isFilterable; }

  validateValue(value: AttributeValueVO): boolean {
    const v = value.value;
    switch (this.value.type) {
      case ATTRIBUTE_TYPE.TEXT:
      case ATTRIBUTE_TYPE.COLOR:
        return typeof v === 'string';
      case ATTRIBUTE_TYPE.NUMBER:
        return typeof v === 'number' && Number.isFinite(v);
      case ATTRIBUTE_TYPE.BOOLEAN:
        return typeof v === 'boolean';
      case ATTRIBUTE_TYPE.SELECT:
        return typeof v === 'string' && this.hasOption(v);
      case ATTRIBUTE_TYPE.MULTISELECT:
        return Array.isArray(v) && v.every((x) => this.hasOption(x));
      case ATTRIBUTE_TYPE.DATE:
        return typeof v === 'string' && !Number.isNaN(Date.parse(v));
      default:
        return false;
    }
  }

  private hasOption(value: string): boolean {
    return (this.value.options ?? []).some((o) => o.value === value);
  }
}
