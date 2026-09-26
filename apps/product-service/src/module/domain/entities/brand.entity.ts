import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo';
import { BrandNameVO } from '../value-objects/primitives/brand-name.vo';
import { BrandSlugVO } from '../value-objects/primitives/brand-slug.vo';
import { BrandLogoVO } from '../value-objects/primitives/brand-logo.vo';
import {
  BrandCreatedEvent,
  BrandUpdatedEvent,
} from '../events/brand.events';

export interface BrandEntityProps {
  readonly name: BrandNameVO;
  readonly slug: BrandSlugVO;
  readonly logo: BrandLogoVO | null;
}

export class BrandEntity extends AggregateRoot<BrandIdVO> {
  private readonly _name: BrandNameVO;
  private readonly _slug: BrandSlugVO;
  private readonly _logo: BrandLogoVO | null;

  private constructor(
    id: BrandIdVO,
    props: BrandEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._slug = props.slug;
    this._logo = props.logo;
  }

  static create(props: BrandEntityProps): BrandEntity {
    const now = new Date().toISOString();
    const id = BrandIdVO.create(crypto.randomUUID());
    const entity = new BrandEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new BrandCreatedEvent(id.value, id.value, props.name.value, props.slug.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: BrandIdVO,
    props: BrandEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): BrandEntity {
    return new BrandEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeName(name: BrandNameVO): BrandEntity {
    const updated = new BrandEntity(
      this.id,
      { ...this._toProps(), name },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new BrandUpdatedEvent(this.id.value, this.id.value, ['name'], this.version + 1),
    );
    return updated;
  }

  updateLogo(logo: BrandLogoVO | null): BrandEntity {
    const updated = new BrandEntity(
      this.id,
      { ...this._toProps(), logo },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new BrandUpdatedEvent(this.id.value, this.id.value, ['logo'], this.version + 1),
    );
    return updated;
  }

  get name(): BrandNameVO { return this._name; }
  get slug(): BrandSlugVO { return this._slug; }
  get logo(): BrandLogoVO | null { return this._logo; }

  private _toProps(): BrandEntityProps {
    return {
      name: this._name,
      slug: this._slug,
      logo: this._logo,
    };
  }
}
