/**
 * AuthPrismaMapper — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { AuthPrismaMapper } from '../../../../src/module/infrastructure/persistence/prisma/mappers/auth.prisma.mapper.js';

describe('AuthPrismaMapper', () => {
  describe('toDomain()', () => {
    it('maps Prisma row → AuthEntity', () => {
      const row = {
        id: '11111111-1111-4111-8111-111111111111',
        email: 'test@example.com',
        password: '$2b$12$hashed',
        status: 'active',
        type: 'individual',
        role: 'customer',
        emailVerified: true,
        createdAt: new Date('2026-01-01T00:00:00Z'),
        updatedAt: new Date('2026-01-02T00:00:00Z'),
        deletedAt: null,
      };

      const entity = AuthPrismaMapper.toDomain(row);
      expect(entity.id).toBe(row.id);
      expect(entity.identifier.normalized).toBe('test@example.com');
      expect(entity.isEmailVerified).toBe(true);
    });
  });

  describe('toPersistence()', () => {
    it('maps AuthEntity → Prisma row', () => {
      const entity = {
        id: '11111111-1111-4111-8111-111111111111',
        identifier: { normalized: 'test@example.com' },
        status: { value: 'active' },
        isEmailVerified: true,
        updatedAt: '2026-01-02T00:00:00Z',
      };

      const row = AuthPrismaMapper.toPersistence(entity as never);
      expect(row.id).toBe(entity.id);
      expect(row.email).toBe('test@example.com');
      expect(row.status).toBe('active');
      expect(row.emailVerified).toBe(true);
    });
  });
});
