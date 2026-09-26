import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { SocialPostCompositeVO } from '../value-objects/composites/social-post-composite.vo';
import { SocialMediaIdVO } from '../value-objects/primitives/social-media-id.vo';

export interface SocialPostEntityProps {
  readonly socialMediaId: SocialMediaIdVO;
  readonly post: SocialPostCompositeVO;
}

export class SocialPostEntity extends BaseEntity<string> {
  private readonly _socialMediaId: SocialMediaIdVO;
  private readonly _post: SocialPostCompositeVO;

  private constructor(
    id: string,
    props: SocialPostEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._socialMediaId = props.socialMediaId;
    this._post = props.post;
  }

  static create(props: SocialPostEntityProps): SocialPostEntity {
    const now = new Date().toISOString();
    return new SocialPostEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: SocialPostEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SocialPostEntity {
    return new SocialPostEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get socialMediaId(): SocialMediaIdVO { return this._socialMediaId; }
  get post(): SocialPostCompositeVO { return this._post; }
}
