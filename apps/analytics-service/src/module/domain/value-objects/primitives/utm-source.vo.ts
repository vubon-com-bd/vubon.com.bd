import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class UtmSourceVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 200;

  static create(raw: string): UtmSourceVO {
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new Error('UtmSource cannot be empty');
    }
    if (normalized.length > UtmSourceVO.MAX_LENGTH) {
      throw new Error(`UtmSource too long: ${normalized.length}`);
    }
    return new UtmSourceVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get normalized(): string {
    return this.value.replace(/[^a-z0-9]/g, '');
  }

  equals(other: UtmSourceVO): boolean {
    return this.normalized === other.normalized;
  }
}
