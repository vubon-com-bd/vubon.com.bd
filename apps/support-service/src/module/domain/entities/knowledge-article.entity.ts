import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { KnowledgeArticleIdVO } from '../value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../value-objects/primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../value-objects/primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../value-objects/primitives/knowledge-status.vo';

export interface KnowledgeArticleEntityProps {
  readonly title: KnowledgeArticleTitleVO;
  readonly body: KnowledgeArticleBodyVO;
  readonly status: KnowledgeStatusVO;
  readonly categoryId: string | null;
  readonly tags: ReadonlyArray<string>;
  readonly viewCount: number;
}

export class KnowledgeArticleEntity extends AggregateRoot<KnowledgeArticleIdVO> {
  private readonly _title: KnowledgeArticleTitleVO;
  private readonly _body: KnowledgeArticleBodyVO;
  private readonly _status: KnowledgeStatusVO;
  private readonly _categoryId: string | null;
  private readonly _tags: ReadonlyArray<string>;
  private readonly _viewCount: number;

  private constructor(
    id: KnowledgeArticleIdVO,
    props: KnowledgeArticleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._title = props.title;
    this._body = props.body;
    this._status = props.status;
    this._categoryId = props.categoryId;
    this._tags = Object.freeze([...props.tags]);
    this._viewCount = props.viewCount;
  }

  static create(props: KnowledgeArticleEntityProps): KnowledgeArticleEntity {
    const now = new Date().toISOString();
    const id = KnowledgeArticleIdVO.create(crypto.randomUUID());
    return new KnowledgeArticleEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: KnowledgeArticleIdVO,
    props: KnowledgeArticleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): KnowledgeArticleEntity {
    return new KnowledgeArticleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  publish(): KnowledgeArticleEntity {
    return new KnowledgeArticleEntity(
      this.id,
      { ...this._toProps(), status: KnowledgeStatusVO.create('published') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get title(): KnowledgeArticleTitleVO { return this._title; }
  get body(): KnowledgeArticleBodyVO { return this._body; }
  get status(): KnowledgeStatusVO { return this._status; }
  get categoryId(): string | null { return this._categoryId; }
  get tags(): ReadonlyArray<string> { return this._tags; }
  get viewCount(): number { return this._viewCount; }

  private _toProps(): KnowledgeArticleEntityProps {
    return {
      title: this._title,
      body: this._body,
      status: this._status,
      categoryId: this._categoryId,
      tags: this._tags,
      viewCount: this._viewCount,
    };
  }
}
