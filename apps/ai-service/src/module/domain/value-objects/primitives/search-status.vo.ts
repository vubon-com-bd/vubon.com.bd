import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending',
  'running',
  'completed',
  'failed',
  'cached',
]);

export class SearchStatusVO extends BaseStatusVO<string> {
  static create(raw: string): SearchStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid search status: ${raw}`);
    }
    return new SearchStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isCompleted(): boolean { return this.value === 'completed'; }
  isCached(): boolean { return this.value === 'cached'; }
}
