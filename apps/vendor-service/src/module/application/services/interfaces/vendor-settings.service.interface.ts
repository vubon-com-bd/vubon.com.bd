/**
 * IVendorSettingsService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_SETTINGS_SERVICE = Symbol('VENDOR_SETTINGS_SERVICE');

export interface NotificationPrefsDto {
  readonly orderAlerts: boolean;
  readonly payoutAlerts: boolean;
  readonly reviewAlerts: boolean;
  readonly stockAlerts: boolean;
  readonly emailEnabled: boolean;
  readonly smsEnabled: boolean;
  readonly pushEnabled: boolean;
}

export interface VendorSettingsResponseDto {
  readonly vendorId: string;
  readonly autoAcceptOrders: boolean;
  readonly autoConfirmPayout: boolean;
  readonly vacationMode: boolean;
  readonly vacationMessage?: string;
  readonly timezone: string;
  readonly locale: string;
  readonly currency: string;
  readonly notifications: NotificationPrefsDto;
  readonly updatedAt: string;
}

export interface IVendorSettingsService {
  initialize(vendorId: string, currency: string, actorId?: string): Promise<VendorSettingsResponseDto>;
  setVacation(vendorId: string, enabled: boolean, message?: string, actorId?: string): Promise<VendorSettingsResponseDto>;
  setAutoAccept(vendorId: string, enabled: boolean, actorId?: string): Promise<VendorSettingsResponseDto>;
  setAutoPayout(vendorId: string, enabled: boolean, actorId?: string): Promise<VendorSettingsResponseDto>;
  updateNotifications(vendorId: string, prefs: Partial<NotificationPrefsDto>, actorId?: string): Promise<VendorSettingsResponseDto>;
  updateLocale(vendorId: string, timezone: string, locale: string, actorId?: string): Promise<VendorSettingsResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorSettingsResponseDto>;
}
