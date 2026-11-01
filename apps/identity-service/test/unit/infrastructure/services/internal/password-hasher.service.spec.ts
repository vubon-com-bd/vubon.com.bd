/**
 * PasswordHasherService tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PasswordHasherService } from '@infrastructure/services/internal/password-hasher.service.js';

function makeHashServiceMock() {
  return {
    hash: jest.fn<(plain: string) => Promise<string>>(),
    compare: jest.fn<(plain: string, hash: string) => Promise<boolean>>(),
  };
}

describe('PasswordHasherService', () => {
  let service: PasswordHasherService;
  let hasher: ReturnType<typeof makeHashServiceMock>;

  beforeEach(() => {
    hasher = makeHashServiceMock();
    service = new PasswordHasherService(hasher as never);
  });

  describe('name', () => {
    it('should have a name', () => {
      expect(service.name).toBe('PasswordHasherService');
    });
  });

  describe('hash()', () => {
    it('should delegate to hash service', async () => {
      hasher.hash.mockResolvedValue('$2b$12$hashed');
      const r = await service.hash('plain123');
      expect(r).toBe('$2b$12$hashed');
      expect(hasher.hash).toHaveBeenCalledWith('plain123');
    });
  });

  describe('verify()', () => {
    it('should return true on match', async () => {
      hasher.compare.mockResolvedValue(true);
      const r = await service.verify('plain', '$2b$12$hash');
      expect(r).toBe(true);
    });

    it('should return false on mismatch', async () => {
      hasher.compare.mockResolvedValue(false);
      const r = await service.verify('plain', '$2b$12$hash');
      expect(r).toBe(false);
    });

    it('should return false on compare throw', async () => {
      hasher.compare.mockRejectedValue(new Error('boom'));
      const r = await service.verify('plain', '$2b$12$hash');
      expect(r).toBe(false);
    });
  });
});
