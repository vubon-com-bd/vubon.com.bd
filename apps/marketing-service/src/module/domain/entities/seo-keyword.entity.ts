import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { SeoKeywordCompositeVO } from '../value-objects/composites/seo-keyword-composite.vo';
import { SeoMarketingIdVO } from '../value-objects/primitives/seo-marketing-id.vo';

export interface SeoKeywordEntityProps {
  readonly seoMarketingId: SeoMarketingIdVO;
  readonly keyword: SeoKeywordCompositeVO;
}

export class SeoKeywordEntity extends BaseEntity<string> {
  private readonly _seoMarketingId: SeoMarketingIdVO;
  private readonly _keyword: SeoKeywordCompositeVO;

  private constructor(
    id: string,
    props: SeoKeywordEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._seoMarketingId = props.seoMarketingId;
    this._keyword = props.keyword;
  }

  static create(props: SeoKeywordEntityProps): SeoKeywordEntity {
    const now = new Date().toISOString();
    return new SeoKeywordEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: SeoKeywordEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SeoKeywordEntity {
    return new SeoKeywordEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get seoMarketingId(): SeoMarketingIdVO { return this._seoMarketingId; }
  get keyword(): SeoKeywordCompositeVO { return this._keyword; }
}
