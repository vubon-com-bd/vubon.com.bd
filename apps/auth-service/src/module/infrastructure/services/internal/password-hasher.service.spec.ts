/**
 * PasswordHasherService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 *
 * Tests real bcrypt hashing. Uses low rounds to keep fast.
 */
import { PasswordHasherService } from './password-hasher.service';

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;

  beforeEach(() => {
    service = new PasswordHasherService();
  });

  it('should have name', () => {
    expect(service.name).toBe('PasswordHasherService');
  });

  describe('hash()', () => {
    it('should produce a bcrypt hash', async () => {
      const hash = await service.hash('Test1234!');
      expect(hash).toMatch(/^\$2[aby]\$/);
      expect(hash.length).toBeGreaterThan(50);
    });

    it('should produce different hashes for same password', async () => {
      const h1 = await service.hash('Test1234!');
      const h2 = await service.hash('Test1234!');
      expect(h1).not.toBe(h2);
    });

    it('should reject empty password', async () => {
      await expect(service.hash('')).rejects.toThrow('empty');
    });
  });

  describe('verify()', () => {
    it('should verify correct password', async () => {
      const hash = await service.hash('Test1234!');
      const ok = await service.verify('Test1234!', hash);
      expect(ok).toBe(true);
    });

    it('should reject wrong password', async () => {
      const hash = await service.hash('Test1234!');
      const ok = await service.verify('WrongPass', hash);
      expect(ok).toBe(false);
    });

    it('should return false for empty inputs', async () => {
      expect(await service.verify('', 'hash')).toBe(false);
      expect(await service.verify('pass', '')).toBe(false);
    });

    it('should return false for malformed hash', async () => {
      const ok = await service.verify('pass', 'not-a-hash');
      expect(ok).toBe(false);
    });
  });

  describe('needsRehash()', () => {
    it('should return true for malformed hash', () => {
      expect(service.needsRehash('not-a-hash')).toBe(true);
    });

    it('should return false for freshly hashed password', async () => {
      const hash = await service.hash('Test1234!');
      expect(service.needsRehash(hash)).toBe(false);
    });

    it('should return true for empty string', () => {
      expect(service.needsRehash('')).toBe(true);
    });
  });
});
