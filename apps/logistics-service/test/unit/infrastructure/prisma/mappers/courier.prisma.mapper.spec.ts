/**
 * CourierPrismaMapper — round-trip।
 */
import { describe, it, expect } from '@jest/globals';
import { CourierPrismaMapper } from '@infrastructure/persistence/prisma/courier.prisma.mapper.js';
import type { PrismaCourierRow } from '@infrastructure/persistence/prisma/courier.prisma.mapper.js';

const NOW = new Date('2026-05-01T10:00:00.000Z');

function row(): PrismaCourierRow {
  return {
    id: 'c-1', code: 'pathao', name: 'Pathao', displayName: 'Pathao Courier',
    type: 'local', status: 'pending',
    logoUrl: null, website: null, contactPhone: null, contactEmail: null,
    trackingUrlTemplate: 'https://x/{trackingNumber}',
    apiEnabled: false,
    apiBaseUrl: null, apiKeyName: null, webhookSecretName: null,
    apiTimeoutMs: 30000, retryAttempts: 3,
    coverageZones: ['z1', 'z2'],
    supportsCOD: true, supportsInsurance: false, supportsInternational: false,
    averageDeliveryDays: 3, isDefault: false, priority: 50,
    version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
  };
}

describe('CourierPrismaMapper', () => {
  it('toDomain minimal (no config)', () => {
    const e = CourierPrismaMapper.toDomain(row());
    expect(e.id).toBe('c-1');
    expect(e.code.value).toBe('pathao');
    expect(e.status.value).toBe('pending');
    expect(e.type.value).toBe('local');
    expect(e.config).toBeUndefined();
    expect(e.coverageZones).toEqual(['z1', 'z2']);
  });

  it('toDomain with config (apiBaseUrl + apiKeyName)', () => {
    const r = row();
    r.apiBaseUrl = 'https://api.pathao.com';
    r.apiKeyName = 'PATHAO_KEY';
    r.webhookSecretName = 'PATHAO_WH';
    r.apiEnabled = true;
    const e = CourierPrismaMapper.toDomain(r);
    expect(e.config).toBeDefined();
    expect(e.config?.baseUrl).toBe('https://api.pathao.com');
    expect(e.config?.apiKeyName).toBe('PATHAO_KEY');
    expect(e.config?.webhookSecretName).toBe('PATHAO_WH');
    expect(e.config?.isEnabled).toBe(true);
  });

  it('toDomain with all optional fields', () => {
    const r = row();
    Object.assign(r, {
      logoUrl: 'https://logo.png', website: 'https://pathao.com',
      contactPhone: '+8801712345678', contactEmail: 'r@pathao.com',
      isDefault: true,
    });
    const e = CourierPrismaMapper.toDomain(r);
    expect(e.logoUrl).toBe('https://logo.png');
    expect(e.website).toBe('https://pathao.com');
    expect(e.isDefault).toBe(true);
  });

  it('toPersistence round-trip', () => {
    const e = CourierPrismaMapper.toDomain(row());
    const p = CourierPrismaMapper.toPersistence(e);
    expect(p['id']).toBe('c-1');
    expect(p['code']).toBe('pathao');
    expect(p['coverageZones']).toEqual(['z1', 'z2']);
    expect(p['apiTimeoutMs']).toBe(30000);
    expect(p['retryAttempts']).toBe(3);
  });

  it('toPersistence with config', () => {
    const r = row();
    r.apiBaseUrl = 'https://api.x.com'; r.apiKeyName = 'K';
    r.apiEnabled = true; r.webhookSecretName = 'W';
    const e = CourierPrismaMapper.toDomain(r);
    const p = CourierPrismaMapper.toPersistence(e);
    expect(p['apiBaseUrl']).toBe('https://api.x.com');
    expect(p['apiKeyName']).toBe('K');
    expect(p['webhookSecretName']).toBe('W');
  });

  it('toPersistence defaults when no config', () => {
    const e = CourierPrismaMapper.toDomain(row());
    const p = CourierPrismaMapper.toPersistence(e);
    expect(p['apiBaseUrl']).toBeNull();
    expect(p['apiKeyName']).toBeNull();
    expect(p['apiTimeoutMs']).toBe(30000);
  });
});
