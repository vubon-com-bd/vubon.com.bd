import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'building',
  'ready',
  'rebuilding',
  'stale',
  'failed',
]);

export class VectorStatusVO extends BaseStatusVO<string> {
  static create(raw: string): VectorStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid vector status: ${raw}`);
    }
    return new VectorStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isReady(): boolean { return this.value === 'ready'; }
  isStale(): boolean { return this.value === 'stale'; }
  isFailed(): boolean { return this.value === 'failed'; }
}
