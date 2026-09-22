import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo';
import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';
import { ProfileUpdatedEvent } from '../events/vendor.events';

export interface VendorProfileEntityProps {
  readonly vendorId: VendorIdVO;
  readonly displayName: VendorNameVO;
  readonly bio: string | null;
  readonly avatarUrl: string | null;
  readonly rating?: RatingValueVO;
}

export class VendorProfileEntity extends AggregateRoot<VendorIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _displayName: VendorNameVO;
  private readonly _bio: string | null;
  private readonly _avatarUrl: string | null;
  private readonly _rating: RatingValueVO;

  private constructor(
    id: VendorIdVO,
    props: VendorProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._displayName = props.displayName;
    this._bio = props.bio;
    this._avatarUrl = props.avatarUrl;
    this._rating = props.rating ?? RatingValueVO.create(0);
  }

  static create(props: VendorProfileEntityProps): VendorProfileEntity {
    const now = new Date().toISOString();
    return new VendorProfileEntity(props.vendorId, props, now, now, null);
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorProfileEntity {
    return new VendorProfileEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateProfile(
    displayName: VendorNameVO,
    bio: string | null,
    avatarUrl: string | null,
  ): VendorProfileEntity {
    const now = new Date().toISOString();
    const updated = new VendorProfileEntity(
      this.id,
      { ...this._toProps(), displayName, bio, avatarUrl },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new ProfileUpdatedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get displayName(): VendorNameVO { return this._displayName; }
  get bio(): string | null { return this._bio; }
  get avatarUrl(): string | null { return this._avatarUrl; }
  get rating(): RatingValueVO { return this._rating; }

  private _toProps(): VendorProfileEntityProps {
    return {
      vendorId: this._vendorId,
      displayName: this._displayName,
      bio: this._bio,
      avatarUrl: this._avatarUrl,
      rating: this._rating,
    };
  }
}
