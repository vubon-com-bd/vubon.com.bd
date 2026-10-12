/**
 * UserPreferencesEntity — BaseEntity
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export interface UserPreferencesEntityProps {
  readonly userId: UserIdVO;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  whatsappNotifications: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  productRecommendations: boolean;
  priceDropAlerts: boolean;
  backInStockAlerts: boolean;
}

export class UserPreferencesEntity extends BaseEntity<string> {
  private props: UserPreferencesEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: UserPreferencesEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get userId(): UserIdVO { return this.props.userId; }
  get emailNotifications(): boolean { return this.props.emailNotifications; }
  get smsNotifications(): boolean { return this.props.smsNotifications; }
  get pushNotifications(): boolean { return this.props.pushNotifications; }
  get whatsappNotifications(): boolean { return this.props.whatsappNotifications; }
  get orderUpdates(): boolean { return this.props.orderUpdates; }
  get promotions(): boolean { return this.props.promotions; }
  get newsletter(): boolean { return this.props.newsletter; }
  get productRecommendations(): boolean { return this.props.productRecommendations; }
  get priceDropAlerts(): boolean { return this.props.priceDropAlerts; }
  get backInStockAlerts(): boolean { return this.props.backInStockAlerts; }

  update(patch: Partial<Omit<UserPreferencesEntityProps, 'userId'>>, now: string = new Date().toISOString()): void {
    this.props = { ...this.props, ...patch };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  unsubscribeAll(now: string = new Date().toISOString()): void {
    this.props = {
      ...this.props,
      emailNotifications: false,
      smsNotifications: false,
      pushNotifications: false,
      whatsappNotifications: false,
      promotions: false,
      newsletter: false,
      productRecommendations: false,
      priceDropAlerts: false,
      backInStockAlerts: false,
    };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: { id: string; userId: UserIdVO; now: string }): UserPreferencesEntity {
    return new UserPreferencesEntity(params.id, params.now, params.now, {
      userId: params.userId,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      whatsappNotifications: false,
      orderUpdates: true,
      promotions: false,
      newsletter: false,
      productRecommendations: true,
      priceDropAlerts: false,
      backInStockAlerts: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserPreferencesEntityProps;
  }): UserPreferencesEntity {
    return new UserPreferencesEntity(params.id, params.createdAt, params.updatedAt, params.props);
  }
}
