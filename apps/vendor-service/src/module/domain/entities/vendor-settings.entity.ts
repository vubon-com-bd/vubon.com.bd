/**
 * VendorSettingsEntity — vendor preferences / toggles
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface VendorNotificationPrefs {
  readonly orderAlerts: boolean;
  readonly payoutAlerts: boolean;
  readonly reviewAlerts: boolean;
  readonly stockAlerts: boolean;
  readonly emailEnabled: boolean;
  readonly smsEnabled: boolean;
  readonly pushEnabled: boolean;
}

export interface VendorSettingsEntityProps {
  readonly vendorId: string;
  readonly autoAcceptOrders: boolean;
  readonly autoConfirmPayout: boolean;
  readonly vacationMode: boolean;
  readonly vacationMessage?: string;
  readonly timezone: string;
  readonly locale: string;
  readonly currency: string;
  readonly notifications: VendorNotificationPrefs;
}

const DEFAULT_NOTIFICATIONS: VendorNotificationPrefs = {
  orderAlerts: true,
  payoutAlerts: true,
  reviewAlerts: true,
  stockAlerts: true,
  emailEnabled: true,
  smsEnabled: false,
  pushEnabled: true,
};

export class VendorSettingsEntity extends BaseEntity<string> {
  private _autoAcceptOrders: boolean;
  private _autoConfirmPayout: boolean;
  private _vacationMode: boolean;
  private _vacationMessage?: string;
  private _timezone: string;
  private _locale: string;
  private _currency: string;
  private _notifications: VendorNotificationPrefs;

  private readonly _vendorId: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSettingsEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._autoAcceptOrders = props.autoAcceptOrders;
    this._autoConfirmPayout = props.autoConfirmPayout;
    this._vacationMode = props.vacationMode;
    this._vacationMessage = props.vacationMessage;
    this._timezone = props.timezone;
    this._locale = props.locale;
    this._currency = props.currency;
    this._notifications = props.notifications;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (this._vacationMessage !== undefined && this._vacationMessage.length > 500) {
      throw new ValidationError('Vacation message cannot exceed 500 chars', 'vacationMessage');
    }
    if (this._vacationMode && !this._vacationMessage) {
      throw new ValidationError('Vacation mode requires a message', 'vacationMessage');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get autoAcceptOrders(): boolean { return this._autoAcceptOrders; }
  get autoConfirmPayout(): boolean { return this._autoConfirmPayout; }
  get vacationMode(): boolean { return this._vacationMode; }
  get vacationMessage(): string | undefined { return this._vacationMessage; }
  get timezone(): string { return this._timezone; }
  get locale(): string { return this._locale; }
  get currency(): string { return this._currency; }
  get notifications(): VendorNotificationPrefs { return this._notifications; }

  isOnVacation(): boolean { return this._vacationMode; }

  isAcceptingOrders(): boolean {
    return !this._vacationMode && this._autoAcceptOrders;
  }

  toggleVacation(enabled: boolean, message?: string, now: string = new Date().toISOString()): void {
    if (enabled && (!message || message.trim().length === 0)) {
      throw new ValidationError('Vacation mode requires a message', 'vacationMessage');
    }
    this._vacationMode = enabled;
    this._vacationMessage = enabled ? message!.trim() : undefined;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setAutoAcceptOrders(enabled: boolean, now: string = new Date().toISOString()): void {
    this._autoAcceptOrders = enabled;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setAutoConfirmPayout(enabled: boolean, now: string = new Date().toISOString()): void {
    this._autoConfirmPayout = enabled;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateNotifications(prefs: Partial<VendorNotificationPrefs>, now: string = new Date().toISOString()): void {
    this._notifications = { ...this._notifications, ...prefs };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  updateLocale(timezone: string, locale: string, now: string = new Date().toISOString()): void {
    if (!timezone || timezone.length > 60) {
      throw new ValidationError('Timezone must be 1-60 chars', 'timezone');
    }
    if (!locale || locale.length > 10) {
      throw new ValidationError('Locale must be 1-10 chars', 'locale');
    }
    this._timezone = timezone;
    this._locale = locale;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    vendorId: string;
    currency: string;
    now: string;
    timezone?: string;
    locale?: string;
  }): VendorSettingsEntity {
    return new VendorSettingsEntity(
      params.id,
      params.now,
      params.now,
      {
        vendorId: params.vendorId,
        autoAcceptOrders: false,
        autoConfirmPayout: false,
        vacationMode: false,
        timezone: params.timezone ?? 'Asia/Dhaka',
        locale: params.locale ?? 'bn-BD',
        currency: params.currency.toUpperCase(),
        notifications: DEFAULT_NOTIFICATIONS,
      },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorSettingsEntityProps;
    deletedAt?: string | null;
  }): VendorSettingsEntity {
    return new VendorSettingsEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
