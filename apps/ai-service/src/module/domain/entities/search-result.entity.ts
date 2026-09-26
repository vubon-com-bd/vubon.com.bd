import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AiSearchIdVO } from '../value-objects/primitives/ai-search-id.vo';
import { SearchResultVO } from '../value-objects/composites/search-result.vo';

export interface SearchResultEntityProps {
  readonly searchId: AiSearchIdVO;
  readonly result: SearchResultVO;
}

export class SearchResultEntity extends BaseEntity<AiSearchIdVO> {
  private readonly _searchId: AiSearchIdVO;
  private readonly _result: SearchResultVO;

  private constructor(
    id: AiSearchIdVO,
    props: SearchResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._searchId = props.searchId;
    this._result = props.result;
  }

  static create(props: SearchResultEntityProps): SearchResultEntity {
    const now = new Date().toISOString();
    return new SearchResultEntity(props.searchId, props, now, now, null);
  }

  static reconstitute(
    id: AiSearchIdVO,
    props: SearchResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SearchResultEntity {
    return new SearchResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get searchId(): AiSearchIdVO { return this._searchId; }
  get result(): SearchResultVO { return this._result; }

  isEmpty(): boolean {
    return this._result.isEmpty();
  }
}
