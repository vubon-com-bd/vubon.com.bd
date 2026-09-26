import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface RecommendationContextProps {
  readonly userId: UserIdVO;
  readonly sessionId: string | null;
  readonly deviceType: string | null;
  readonly location: string | null;
  readonly recentlyViewed: readonly string[];
  readonly cartItems: readonly string[];
}

export class RecommendationContextVO extends BaseVO<RecommendationContextProps> {
  static create(props: RecommendationContextProps): RecommendationContextVO {
    return new RecommendationContextVO(props);
  }

  private constructor(props: RecommendationContextProps) {
    super(
      Object.freeze({
        ...props,
        recentlyViewed: Object.freeze([...props.recentlyViewed]),
        cartItems: Object.freeze([...props.cartItems]),
      }),
    );
  }

  get userId(): UserIdVO { return this.value.userId; }
  get sessionId(): string | null { return this.value.sessionId; }
  get deviceType(): string | null { return this.value.deviceType; }
  get location(): string | null { return this.value.location; }
  get recentlyViewed(): readonly string[] { return this.value.recentlyViewed; }
  get cartItems(): readonly string[] { return this.value.cartItems; }

  hasHistory(): boolean {
    return this.value.recentlyViewed.length > 0;
  }
}
