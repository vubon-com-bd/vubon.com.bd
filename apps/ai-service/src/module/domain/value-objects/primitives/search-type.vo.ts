import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'semantic',
  'keyword',
  'hybrid',
  'vector',
  'autocomplete',
]);

export class SearchTypeVO extends BaseTypeVO<string> {
  static create(raw: string): SearchTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid search type: ${raw}`);
    }
    return new SearchTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isSemantic(): boolean { return this.value === 'semantic'; }
  isHybrid(): boolean { return this.value === 'hybrid'; }
  isVector(): boolean { return this.value === 'vector'; }
}
