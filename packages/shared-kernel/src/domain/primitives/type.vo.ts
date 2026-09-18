/**
 * Type Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে (DATA_TYPE)।
 */
import { DATA_TYPE } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export type DataTypeValue = (typeof DATA_TYPE)[keyof typeof DATA_TYPE];

const VALID_TYPES = new Set<string>(Object.values(DATA_TYPE));

export class TypeVO extends BaseVO<DataTypeValue> {
  private constructor(value: DataTypeValue) {
    super(value);
  }

  static of(raw: string): TypeVO {
    if (!VALID_TYPES.has(raw)) {
      throw new Error(`Invalid data type: ${raw}`);
    }
    return new TypeVO(raw as DataTypeValue);
  }

  isPrimitive(): boolean {
    const primitives: readonly string[] = [DATA_TYPE.STRING, DATA_TYPE.NUMBER, DATA_TYPE.BOOLEAN];
    return primitives.includes(this.value);
  }

  isComplex(): boolean {
    return !this.isPrimitive();
  }
}

/**
 * Alias for external consumers.
 */
export const TYPE = DATA_TYPE;
