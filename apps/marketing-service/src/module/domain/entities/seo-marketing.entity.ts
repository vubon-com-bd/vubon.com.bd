import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SeoMarketingIdVO } from '../value-objects/primitives/seo-marketing-id.vo';
import { SeoElementVO } from '../value-objects/primitives/seo-element.vo';

export interface SeoMarketingEntityProps {
  readonly pageUrl: string;
  readonly title: SeoElementVO | null;
  readonly description: SeoElementVO | null;
  readonly score: number;
}

export class SeoMarketingEntity extends AggregateRoot<SeoMarketingIdVO> {
  private readonly _pageUrl: string;
  private readonly _title: SeoElementVO | null;
  private readonly _description: SeoElementVO | null;
  private readonly _score: number;

  private constructor(
    id: SeoMarketingIdVO,
    props: SeoMarketingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._pageUrl = props.pageUrl;
    this._title = props.title;
    this._description = props.description;
    this._score = props.score;
  }

  static create(props: SeoMarketingEntityProps): SeoMarketingEntity {
    const now = new Date().toISOString();
    const id = SeoMarketingIdVO.create(crypto.randomUUID());
    return new SeoMarketingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SeoMarketingIdVO,
    props: SeoMarketingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SeoMarketingEntity {
    return new SeoMarketingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get pageUrl(): string { return this._pageUrl; }
  get title(): SeoElementVO | null { return this._title; }
  get description(): SeoElementVO | null { return this._description; }
  get score(): number { return this._score; }
}
