/**
 * Division Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { DIVISION } from '@vubon/shared-constants/common';

export type DivisionType = (typeof DIVISION)[keyof typeof DIVISION];

const DIVISION_VALUES: ReadonlySet<string> = new Set(Object.values(DIVISION));

export class DivisionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DivisionVO {
    if (typeof raw !== 'string') {
      throw new Error('Division must be a string');
    }
    const normalized = raw.trim().toLowerCase();
    if (!DIVISION_VALUES.has(normalized)) {
      throw new Error(
        `Invalid division: "${raw}". Allowed: ${[...DIVISION_VALUES].join(', ')}`
      );
    }
    return new DivisionVO(normalized);
  }

  static isDivision(value: string): boolean {
    return DIVISION_VALUES.has(value.trim().toLowerCase());
  }

  is(division: DivisionType): boolean {
    return this.value === division;
  }

  isDhaka(): boolean {
    return this.value === DIVISION.DHAKA;
  }
}
