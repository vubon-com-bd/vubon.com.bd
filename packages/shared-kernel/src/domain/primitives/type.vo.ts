import { DATA_TYPE } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export type DataTypeValue = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];

const VALID_TYPES = new Set<string>(Object.values(DATA_TYPE));

/**
 * Generic domain type VO.
 * Subclass may override `allowedValues()` to constrain.
 */
export abstract class BaseTypeVO<T extends string = string>
  extends BaseVO<T>
{
  protected constructor(value: T) {
    super(value);
  }

  /**
   * Override in subclass to constrain allowed values.
   * Default: uses DATA_TYPE (backward-compatible with old kernel).
   */
  protected static allowedValues(): ReadonlySet<string> {
    return VALID_TYPES;
  }

  protected static validate(raw: string): void {
    if (!BaseTypeVO.allowedValues().has(raw)) {
      throw new Error(`Invalid type: ${raw}`);
    }
  }

  isPrimitive(): boolean {
    const primitives: readonly string[] = [
      DATA_TYPE.STRING,
      DATA_TYPE.NUMBER,
      DATA_TYPE.BOOLEAN,
    ];
    return primitives.includes(this.value);
  }

  isComplex(): boolean {
    return !this.isPrimitive();
  }
}

/**
 * Default generic TypeVO (data type only).
 */
export class TypeVO extends BaseTypeVO<DataTypeValue> {
  private constructor(value: DataTypeValue) {
    super(value);
  }

  static of(raw: string): TypeVO {
    BaseTypeVO.validate(raw);
    return new TypeVO(raw as DataTypeValue);
  }
}

export const TYPE = DATA_TYPE;
