/**
 * RecoveryCodeGeneratorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { RecoveryCodeGeneratorService } from './recovery-code-generator.service';

describe('RecoveryCodeGeneratorService', () => {
  let service: RecoveryCodeGeneratorService;

  beforeEach(() => {
    service = new RecoveryCodeGeneratorService();
  });

  it('should have name', () => {
    expect(service.name).toBe('RecoveryCodeGeneratorService');
  });

  describe('generate()', () => {
    it('should generate requested count', async () => {
      const codes = await service.generate(10);
      expect(codes).toHaveLength(10);
    });

    it('should produce unique codes', async () => {
      const codes = await service.generate(10);
      expect(new Set(codes).size).toBe(10);
    });

    it('should produce XXXX-XXXX format', async () => {
      const codes = await service.generate(5);
      codes.forEach((c) => {
        expect(c).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}$/);
      });
    });

    it('should generate 1 code', async () => {
      const codes = await service.generate(1);
      expect(codes).toHaveLength(1);
    });
  });

  describe('hash() / verify()', () => {
    it('should hash a code', async () => {
      const hash = await service.hash('ABCD-1234');
      expect(hash).toMatch(/^\$2[aby]\$/);
    });

    it('should verify matching code', async () => {
      const code = 'ABCD-1234';
      const hash = await service.hash(code);
      expect(await service.verify(code, hash)).toBe(true);
    });

    it('should reject non-matching code', async () => {
      const hash = await service.hash('ABCD-1234');
      expect(await service.verify('WXYZ-5678', hash)).toBe(false);
    });

    it('should handle case-insensitively', async () => {
      const hash = await service.hash('ABCD-1234');
      expect(await service.verify('abcd-1234', hash)).toBe(true);
    });

    it('should return false for empty inputs', async () => {
      expect(await service.verify('', 'hash')).toBe(false);
      expect(await service.verify('code', '')).toBe(false);
    });
  });

  describe('constantTimeEquals()', () => {
    it('should return true for same strings', () => {
      expect(RecoveryCodeGeneratorService.constantTimeEquals('abc', 'abc')).toBe(true);
    });

    it('should return false for different strings', () => {
      expect(RecoveryCodeGeneratorService.constantTimeEquals('abc', 'xyz')).toBe(false);
    });
  });
});
