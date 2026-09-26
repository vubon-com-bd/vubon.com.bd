import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class EventNameVO extends BaseCodeVO {
  private static readonly PATTERN = /^[a-z][a-z0-9_.]*$/;
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 100;

  static create(raw: string): EventNameVO {
    const normalized = raw.trim().toLowerCase();

    if (normalized.length < EventNameVO.MIN_LENGTH) {
      throw new Error(`EventName too short (min ${EventNameVO.MIN_LENGTH}): ${raw}`);
    }
    if (normalized.length > EventNameVO.MAX_LENGTH) {
      throw new Error(`EventName too long (max ${EventNameVO.MAX_LENGTH}): ${raw}`);
    }
    if (!EventNameVO.PATTERN.test(normalized)) {
      throw new Error(`EventName must be lowercase snake/dot: ${raw}`);
    }

    return new EventNameVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get namespace(): string {
    return this.value.split('.')[0] ?? this.value;
  }

  get action(): string {
    const parts = this.value.split('.');
    return parts[parts.length - 1] ?? this.value;
  }
}
