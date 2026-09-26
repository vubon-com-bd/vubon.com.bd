import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface SearchResultItemProps {
  readonly documentId: string;
  readonly score: number;
  readonly snippet: string | null;
  readonly source: string;
}

export interface SearchResultProps {
  readonly query: string;
  readonly items: readonly SearchResultItemProps[];
  readonly totalHits: number;
  readonly tookMs: number;
}

export class SearchResultVO extends BaseVO<SearchResultProps> {
  static create(props: SearchResultProps): SearchResultVO {
    if (props.totalHits < 0) {
      throw new Error('SearchResult: totalHits cannot be negative');
    }
    if (props.tookMs < 0) {
      throw new Error('SearchResult: tookMs cannot be negative');
    }
    return new SearchResultVO(props);
  }

  private constructor(props: SearchResultProps) {
    super(
      Object.freeze({
        ...props,
        items: Object.freeze(props.items.map((i) => Object.freeze({ ...i }))),
      }),
    );
  }

  get query(): string { return this.value.query; }
  get items(): readonly SearchResultItemProps[] { return this.value.items; }
  get totalHits(): number { return this.value.totalHits; }
  get tookMs(): number { return this.value.tookMs; }

  isEmpty(): boolean {
    return this.value.items.length === 0;
  }
}
