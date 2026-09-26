import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { PersonalizationIdVO } from '../value-objects/primitives/personalization-id.vo';
import { PersonalizationProfileVO } from '../value-objects/composites/personalization-profile.vo';

export interface PersonalizationProfileEntityProps {
  readonly profile: PersonalizationProfileVO;
}

export class PersonalizationProfileEntity extends AggregateRoot<PersonalizationIdVO> {
  private readonly _profile: PersonalizationProfileVO;

  private constructor(
    id: PersonalizationIdVO,
    props: PersonalizationProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._profile = props.profile;
  }

  static create(props: PersonalizationProfileEntityProps): PersonalizationProfileEntity {
    const now = new Date().toISOString();
    const id = PersonalizationIdVO.create(crypto.randomUUID());
    return new PersonalizationProfileEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PersonalizationIdVO,
    props: PersonalizationProfileEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PersonalizationProfileEntity {
    return new PersonalizationProfileEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  applyUpdate(patch: {
    interests?: readonly string[];
    categories?: readonly string[];
    brandAffinity?: Readonly<Record<string, number>>;
    priceRangeMin?: number | null;
    priceRangeMax?: number | null;
  }): PersonalizationProfileEntity {
    const newProfile = PersonalizationProfileVO.create({
      userId: this._profile.userId,
      interests: patch.interests ?? this._profile.interests,
      categories: patch.categories ?? this._profile.categories,
      brandAffinity: patch.brandAffinity ?? this._profile.brandAffinity,
      priceRangeMin: patch.priceRangeMin !== undefined ? patch.priceRangeMin : this._profile.priceRangeMin,
      priceRangeMax: patch.priceRangeMax !== undefined ? patch.priceRangeMax : this._profile.priceRangeMax,
    });
    return new PersonalizationProfileEntity(
      this.id,
      { profile: newProfile },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  hasInterestIn(interest: string): boolean {
    return this._profile.hasInterestIn(interest);
  }

  affinityFor(brand: string): number {
    return this._profile.affinityFor(brand);
  }

  get profile(): PersonalizationProfileVO { return this._profile; }
}
