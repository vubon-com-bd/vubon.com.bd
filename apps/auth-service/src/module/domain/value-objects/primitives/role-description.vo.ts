/**
 * RoleDescriptionVO — Human-readable role description
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const MAX = 500;
const MIN = 2;

export class RoleDescriptionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): RoleDescriptionVO {
    if (typeof raw !== 'string') {
      throw new Error('Role description must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new Error(`Role description must be ${MIN}–${MAX} chars`);
    }
    if (/[<>]/.test(trimmed)) {
      throw new Error('Role description must not contain HTML');
    }
    return new RoleDescriptionVO(trimmed);
  }
}
