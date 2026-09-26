import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'active',
  'inactive',
  'learning',
  'ready',
  'failed',
]);

export class PersonalizationStatusVO extends BaseStatusVO<string> {
  static create(raw: string): PersonalizationStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid personalization status: ${raw}`);
    }
    return new PersonalizationStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isReady(): boolean { return this.value === 'ready'; }
  isLearning(): boolean { return this.value === 'learning'; }
  isFailed(): boolean { return this.value === 'failed'; }
}
