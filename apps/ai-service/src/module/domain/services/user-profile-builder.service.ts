import { PersonalizationProfileVO } from '../value-objects/composites/personalization-profile.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface InteractionRecord {
  readonly userId: string;
  readonly action: 'view' | 'like' | 'purchase' | 'review';
  readonly categories: readonly string[];
  readonly brands: readonly string[];
  readonly price: number | null;
}

export interface BuiltProfile {
  readonly userId: UserIdVO;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brandAffinity: Readonly<Record<string, number>>;
  readonly priceRangeMin: number | null;
  readonly priceRangeMax: number | null;
}

export class UserProfileBuilderService {
  private static readonly ACTION_WEIGHTS: Record<InteractionRecord['action'], number> = {
    view: 1,
    like: 3,
    purchase: 5,
    review: 2,
  };

  build(userId: UserIdVO, interactions: readonly InteractionRecord[]): BuiltProfile {
    const categoryScores = new Map<string, number>();
    const brandScores = new Map<string, number>();
    const prices: number[] = [];

    for (const interaction of interactions) {
      const weight = UserProfileBuilderService.ACTION_WEIGHTS[interaction.action];
      for (const cat of interaction.categories) {
        categoryScores.set(cat, (categoryScores.get(cat) ?? 0) + weight);
      }
      for (const brand of interaction.brands) {
        brandScores.set(brand, (brandScores.get(brand) ?? 0) + weight);
      }
      if (interaction.price !== null) {
        prices.push(interaction.price);
      }
    }

    const categories = [...categoryScores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([c]) => c);

    const brandAffinity: Record<string, number> = {};
    const maxBrandScore = Math.max(1, ...brandScores.values());
    for (const [brand, score] of brandScores.entries()) {
      brandAffinity[brand] = score / maxBrandScore;
    }

    return {
      userId,
      interests: categories.slice(0, 10),
      categories,
      brandAffinity: Object.freeze(brandAffinity),
      priceRangeMin: prices.length ? Math.min(...prices) : null,
      priceRangeMax: prices.length ? Math.max(...prices) : null,
    };
  }

  toProfile(built: BuiltProfile): PersonalizationProfileVO {
    return PersonalizationProfileVO.create({
      userId: built.userId,
      interests: built.interests,
      categories: built.categories,
      brandAffinity: built.brandAffinity,
      priceRangeMin: built.priceRangeMin,
      priceRangeMax: built.priceRangeMax,
    });
  }
}
