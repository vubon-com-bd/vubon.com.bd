/**
 * VendorSettingsService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_SETTINGS_REPOSITORY,
  type VendorSettingsRepository,
} from '../../../domain/repositories/vendor-settings.repository.interface.js';
import { VendorSettingsEntity } from '../../../domain/entities/vendor-settings.entity.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';
import {
  VENDOR_SETTINGS_SERVICE,
  type IVendorSettingsService,
  type VendorSettingsResponseDto,
  type NotificationPrefsDto,
} from '../interfaces/vendor-settings.service.interface.js';

@Injectable()
export class VendorSettingsService implements IVendorSettingsService {
  constructor(
    @Inject(VENDOR_SETTINGS_REPOSITORY)
    private readonly repo: VendorSettingsRepository,
  ) {}

  async initialize(vendorId: string, currency: string, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const existing = await this.repo.findByVendorId(vendorId);
    if (existing) return this.toResponse(existing);

    const now = new Date().toISOString();
    const entity = VendorSettingsEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId,
      currency,
      now,
    });
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async setVacation(vendorId: string, enabled: boolean, message?: string, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    entity.toggleVacation(enabled, message, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async setAutoAccept(vendorId: string, enabled: boolean, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    entity.setAutoAcceptOrders(enabled, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async setAutoPayout(vendorId: string, enabled: boolean, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    entity.setAutoConfirmPayout(enabled, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateNotifications(vendorId: string, prefs: Partial<NotificationPrefsDto>, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    entity.updateNotifications(prefs, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async updateLocale(vendorId: string, timezone: string, locale: string, _actorId?: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    entity.updateLocale(timezone, locale, new Date().toISOString());
    const saved = await this.repo.upsert(entity);
    return this.toResponse(saved);
  }

  async getByVendorId(vendorId: string): Promise<VendorSettingsResponseDto> {
    const entity = await this.requireSettings(vendorId);
    return this.toResponse(entity);
  }

  private async requireSettings(vendorId: string): Promise<VendorSettingsEntity> {
    const entity = await this.repo.findByVendorId(vendorId);
    if (!entity) {
      throw new Error(`Settings not found for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorSettingsEntity): VendorSettingsResponseDto {
    return {
      vendorId: entity.vendorId,
      autoAcceptOrders: entity.autoAcceptOrders,
      autoConfirmPayout: entity.autoConfirmPayout,
      vacationMode: entity.vacationMode,
      vacationMessage: entity.vacationMessage,
      timezone: entity.timezone,
      locale: entity.locale,
      currency: entity.currency,
      notifications: entity.notifications,
      updatedAt: entity.updatedAt,
    };
  }
}
