import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

const VALID = new Set<string>([
  'pending',
  'generating',
  'generated',
  'indexed',
  'failed',
]);

export class EmbeddingStatusVO extends BaseStatusVO<string> {
  static create(raw: string): EmbeddingStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid embedding status: ${raw}`);
    }
    return new EmbeddingStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isIndexed(): boolean { return this.value === 'indexed'; }
  isGenerated(): boolean { return this.value === 'generated'; }
}
