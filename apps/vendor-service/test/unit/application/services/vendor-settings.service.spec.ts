import { jest } from '@jest/globals';
import { VendorSettingsService } from '../../../../src/module/application/services/impl/vendor-settings.service.js';
import type { VendorSettingsRepository } from '../../../../src/module/domain/repositories/vendor-settings.repository.interface.js';
import { VendorSettingsEntity } from '../../../../src/module/domain/entities/vendor-settings.entity.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeSettings(): VendorSettingsEntity {
  return VendorSettingsEntity.create({ id: UUID, vendorId: UUID, currency: 'BDT', now: NOW });
}

function makeRepoMock(): jest.Mocked<VendorSettingsRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findOnVacation: jest.fn(),
    findAutoAccept: jest.fn(),
  } as unknown as jest.Mocked<VendorSettingsRepository>;
}

describe('VendorSettingsService', () => {
  let service: VendorSettingsService;
  let repo: jest.Mocked<VendorSettingsRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSettingsService(repo);
  });

  describe('initialize()', () => {
    it('returns existing', async () => {
      repo.findByVendorId.mockResolvedValue(makeSettings());
      const r = await service.initialize(UUID, 'BDT');
      expect(r.vendorId).toBe(UUID);
    });

    it('creates when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      repo.upsert.mockResolvedValue(makeSettings());
      const r = await service.initialize(UUID, 'BDT');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('setVacation()', () => {
    it('enables vacation', async () => {
      const s = makeSettings();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.setVacation(UUID, true, 'Back soon');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('setAutoAccept()', () => {
    it('enables auto-accept', async () => {
      const s = makeSettings();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.setAutoAccept(UUID, true);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('setAutoPayout()', () => {
    it('enables auto-payout', async () => {
      const s = makeSettings();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.setAutoPayout(UUID, true);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateNotifications()', () => {
    it('updates prefs', async () => {
      const s = makeSettings();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.updateNotifications(UUID, { smsEnabled: true });
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateLocale()', () => {
    it('updates timezone + locale', async () => {
      const s = makeSettings();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.updateLocale(UUID, 'Asia/Dhaka', 'bn-BD');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('getByVendorId()', () => {
    it('returns settings', async () => {
      repo.findByVendorId.mockResolvedValue(makeSettings());
      const r = await service.getByVendorId(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('throws when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow();
    });
  });
});
