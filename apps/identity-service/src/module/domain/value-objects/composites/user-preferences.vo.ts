/**
 * UserPreferencesVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

import { UserIdVO } from '../primitives/user-id.vo.js';

export interface UserPreferencesVOProps {
  readonly userId: UserIdVO;
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly whatsappNotifications: boolean;
  readonly orderUpdates: boolean;
  readonly promotions: boolean;
  readonly newsletter: boolean;
  readonly productRecommendations: boolean;
  readonly priceDropAlerts: boolean;
  readonly backInStockAlerts: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserPreferencesVO extends BaseVO<UserPreferencesVOProps> {
  private constructor(props: UserPreferencesVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserPreferencesVOProps): UserPreferencesVO {
    return new UserPreferencesVO(props);
  }

  static reconstitute(props: UserPreferencesVOProps): UserPreferencesVO {
    return new UserPreferencesVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get emailNotifications(): boolean { return this.value.emailNotifications; }
  get smsNotifications(): boolean { return this.value.smsNotifications; }
  get pushNotifications(): boolean { return this.value.pushNotifications; }
  get whatsappNotifications(): boolean { return this.value.whatsappNotifications; }
  get orderUpdates(): boolean { return this.value.orderUpdates; }
  get promotions(): boolean { return this.value.promotions; }
  get newsletter(): boolean { return this.value.newsletter; }
  get productRecommendations(): boolean { return this.value.productRecommendations; }
  get priceDropAlerts(): boolean { return this.value.priceDropAlerts; }
  get backInStockAlerts(): boolean { return this.value.backInStockAlerts; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  anyMarketingEnabled(): boolean {
    return this.value.promotions || this.value.newsletter || this.value.productRecommendations;
  }
  anyChannelEnabled(): boolean {
    return (
      this.value.emailNotifications ||
      this.value.smsNotifications ||
      this.value.pushNotifications ||
      this.value.whatsappNotifications
    );
  }
}
