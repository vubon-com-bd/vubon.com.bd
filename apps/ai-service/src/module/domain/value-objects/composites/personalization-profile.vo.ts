import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface PersonalizationProfileProps {
  readonly userId: UserIdVO;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brandAffinity: Readonly<Record<string, number>>;
  readonly priceRangeMin: number | null;
  readonly priceRangeMax: number | null;
}

export class PersonalizationProfileVO extends BaseVO<PersonalizationProfileProps> {
  static create(props: PersonalizationProfileProps): PersonalizationProfileVO {
    if (
      props.priceRangeMin !== null &&
      props.priceRangeMax !== null &&
      props.priceRangeMin > props.priceRangeMax
    ) {
      throw new Error('PersonalizationProfile: priceRangeMin > priceRangeMax');
    }
    return new PersonalizationProfileVO(props);
  }

  private constructor(props: PersonalizationProfileProps) {
    super(
      Object.freeze({
        ...props,
        interests: Object.freeze([...props.interests]),
        categories: Object.freeze([...props.categories]),
        brandAffinity: Object.freeze({ ...props.brandAffinity }),
      }),
    );
  }

  get userId(): UserIdVO { return this.value.userId; }
  get interests(): readonly string[] { return this.value.interests; }
  get categories(): readonly string[] { return this.value.categories; }
  get brandAffinity(): Readonly<Record<string, number>> { return this.value.brandAffinity; }
  get priceRangeMin(): number | null { return this.value.priceRangeMin; }
  get priceRangeMax(): number | null { return this.value.priceRangeMax; }

  affinityFor(brand: string): number {
    return this.value.brandAffinity[brand] ?? 0;
  }

  hasInterestIn(interest: string): boolean {
    return this.value.interests.includes(interest);
  }
}
