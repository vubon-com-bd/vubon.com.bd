import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo';
import { VendorStatusVO } from '../value-objects/primitives/vendor-status.vo';
import { VendorTypeVO } from '../value-objects/primitives/vendor-type.vo';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import {
  VendorRegisteredEvent,
  VendorUpdatedEvent,
  VendorDeletedEvent,
} from '../events/vendor.events';
import {
  VendorTierUpgradedEvent,
  VendorTierDowngradedEvent,
} from '../events/vendor-tier.events';
import { InvalidVendorStateError } from '../errors/vendor.errors';

export interface VendorEntityProps {
  readonly ownerId: UserIdVO;
  readonly name: VendorNameVO;
  readonly slug: VendorSlugVO;
  readonly status: VendorStatusVO;
  readonly type: VendorTypeVO;
  readonly tier: VendorTierVO;
}

export class VendorEntity extends AggregateRoot<VendorIdVO> {
  private readonly _ownerId: UserIdVO;
  private readonly _name: VendorNameVO;
  private readonly _slug: VendorSlugVO;
  private readonly _status: VendorStatusVO;
  private readonly _type: VendorTypeVO;
  private readonly _tier: VendorTierVO;

  private constructor(
    id: VendorIdVO,
    props: VendorEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._ownerId = props.ownerId;
    this._name = props.name;
    this._slug = props.slug;
    this._status = props.status;
    this._type = props.type;
    this._tier = props.tier;
  }

  static create(props: VendorEntityProps): VendorEntity {
    const now = new Date().toISOString();
    const id = VendorIdVO.create(crypto.randomUUID());
    const entity = new VendorEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new VendorRegisteredEvent(
        id.value,
        id.value,
        props.ownerId.value,
        props.name.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: VendorIdVO,
    props: VendorEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorEntity {
    return new VendorEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  updateName(name: VendorNameVO): VendorEntity {
    const now = new Date().toISOString();
    const updated = new VendorEntity(
      this.id,
      { ...this._toProps(), name },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorUpdatedEvent(this.id.value, this.id.value, ['name'], this.version + 1),
    );
    return updated;
  }

  changeStatus(status: VendorStatusVO): VendorEntity {
    const now = new Date().toISOString();
    const updated = new VendorEntity(
      this.id,
      { ...this._toProps(), status },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new VendorUpdatedEvent(this.id.value, this.id.value, ['status'], this.version + 1),
    );
    return updated;
  }

  changeTier(tier: VendorTierVO): VendorEntity {
    const now = new Date().toISOString();
    const fromTier = this._tier.value;
    const toTier = tier.value;
    const updated = new VendorEntity(
      this.id,
      { ...this._toProps(), tier },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    const isUpgrade = ['basic', 'bronze', 'silver', 'gold', 'platinum', 'diamond'].indexOf(toTier) >
      ['basic', 'bronze', 'silver', 'gold', 'platinum', 'diamond'].indexOf(fromTier);
    updated.addDomainEvent(
      isUpgrade
        ? new VendorTierUpgradedEvent(this.id.value, this.id.value, fromTier, toTier, this.version + 1)
        : new VendorTierDowngradedEvent(this.id.value, this.id.value, fromTier, toTier, this.version + 1),
    );
    return updated;
  }

  softDelete(): VendorEntity {
    const now = new Date().toISOString();
    const updated = new VendorEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      now,
    );
    updated.addDomainEvent(
      new VendorDeletedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  ensureActive(): void {
    if (this._status.value !== 'active') {
      throw new InvalidVendorStateError(`vendor is not active: ${this._status.value}`);
    }
  }

  get ownerId(): UserIdVO { return this._ownerId; }
  get name(): VendorNameVO { return this._name; }
  get slug(): VendorSlugVO { return this._slug; }
  get status(): VendorStatusVO { return this._status; }
  get type(): VendorTypeVO { return this._type; }
  get tier(): VendorTierVO { return this._tier; }

  private _toProps(): VendorEntityProps {
    return {
      ownerId: this._ownerId,
      name: this._name,
      slug: this._slug,
      status: this._status,
      type: this._type,
      tier: this._tier,
    };
  }
}
