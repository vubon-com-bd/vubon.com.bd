import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { SocialMediaIdVO } from '../value-objects/primitives/social-media-id.vo';
import { SocialPlatformVO } from '../value-objects/primitives/social-platform.vo';

export interface SocialMediaEntityProps {
  readonly name: string;
  readonly platform: SocialPlatformVO;
  readonly status: string;
}

export class SocialMediaEntity extends AggregateRoot<SocialMediaIdVO> {
  private readonly _name: string;
  private readonly _platform: SocialPlatformVO;
  private readonly _status: string;

  private constructor(
    id: SocialMediaIdVO,
    props: SocialMediaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._platform = props.platform;
    this._status = props.status;
  }

  static create(props: SocialMediaEntityProps): SocialMediaEntity {
    const now = new Date().toISOString();
    const id = SocialMediaIdVO.create(crypto.randomUUID());
    return new SocialMediaEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: SocialMediaIdVO,
    props: SocialMediaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SocialMediaEntity {
    return new SocialMediaEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get platform(): SocialPlatformVO { return this._platform; }
  get status(): string { return this._status; }
}
