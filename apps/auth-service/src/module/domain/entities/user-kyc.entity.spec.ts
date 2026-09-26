/**
 * UserKycEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserKycEntity } from './user-kyc.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildKyc = (overrides: Partial<Parameters<typeof UserKycEntity.create>[0]> = {}) =>
  UserKycEntity.create({
    id: 'kyc-1',
    userId: 'user-1' as never,
    status: 'not_submitted',
    documentType: 'nid',
    documentNumber: '1234567890',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserKycEntity', () => {
  describe('create()', () => {
    it('should create not_submitted KYC', () => {
      const k = buildKyc();
      expect(k.status).toBe('not_submitted');
      expect(k.documentType).toBe('nid');
    });
  });

  describe('submit()', () => {
    it('should submit KYC', () => {
      const k = buildKyc();
      k.submit(NOW, 'front-url');
      expect(k.status).toBe('pending');
    });

    it('should reject when pending', () => {
      const k = buildKyc({ status: 'pending' });
      expect(() => k.submit(NOW, 'front-url')).toThrow('already pending');
    });

    it('should reject when approved', () => {
      const k = buildKyc({ status: 'approved' });
      expect(() => k.submit(NOW, 'front-url')).toThrow('already approved');
    });

    it('should reject when front image missing', () => {
      const k = buildKyc();
      expect(() => k.submit(NOW, '')).toThrow('Front image is required');
    });

    it('should accept front + back', () => {
      const k = buildKyc();
      k.submit(NOW, 'front-url', 'back-url');
      expect(k.status).toBe('pending');
    });
  });

  describe('approve()', () => {
    it('should approve pending KYC', () => {
      const k = buildKyc({ status: 'pending' });
      k.approve(NOW);
      expect(k.status).toBe('approved');
    });

    it('should reject approve when not pending', () => {
      const k = buildKyc();
      expect(() => k.approve(NOW)).toThrow('not pending');
    });
  });

  describe('reject()', () => {
    it('should reject pending KYC with reason', () => {
      const k = buildKyc({ status: 'pending' });
      k.reject(NOW, 'Blurry image');
      expect(k.status).toBe('rejected');
    });

    it('should require reason', () => {
      const k = buildKyc({ status: 'pending' });
      expect(() => k.reject(NOW, '')).toThrow('Rejection reason required');
    });

    it('should reject when not pending', () => {
      const k = buildKyc();
      expect(() => k.reject(NOW, 'reason')).toThrow('not pending');
    });
  });

  describe('getters', () => {
    it('should expose status', () => {
      expect(buildKyc().status).toBe('not_submitted');
    });

    it('should expose documentType', () => {
      expect(buildKyc().documentType).toBe('nid');
    });

    it('should expose documentNumber', () => {
      expect(buildKyc().documentNumber).toBe('1234567890');
    });
  });
});
