/**
 * TokenSignerService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { TokenSignerService } from './token-signer.service';

describe('TokenSignerService', () => {
  let service: TokenSignerService;
  const payload = {
    sub: 'user-1',
    jti: 'token-id-1',
    type: 'access' as const,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900,
  };

  beforeEach(() => {
    service = new TokenSignerService();
  });

  it('should have name', () => {
    expect(service.name).toBe('TokenSignerService');
  });

  describe('sign()', () => {
    it('should produce a JWT-like string', async () => {
      const token = await service.sign(payload);
      expect(token).toMatch(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/);
    });

    it('should include payload metadata', async () => {
      const token = await service.sign({
        ...payload,
        meta: { ip: '1.1.1.1' },
      });
      const decoded = service.decode(token);
      expect(decoded?.meta).toEqual({ ip: '1.1.1.1' });
    });
  });

  describe('verify()', () => {
    it('should verify valid token', async () => {
      const token = await service.sign(payload);
      const verified = await service.verify(token);
      expect(verified.sub).toBe('user-1');
      expect(verified.jti).toBe('token-id-1');
      expect(verified.type).toBe('access');
    });

    it('should reject tampered token', async () => {
      const token = await service.sign(payload);
      const tampered = `${token.slice(0, -5)}XXXXX`;
      await expect(service.verify(tampered)).rejects.toThrow();
    });

    it('should reject invalid token', async () => {
      await expect(service.verify('not-a-jwt')).rejects.toThrow();
    });
  });

  describe('decode()', () => {
    it('should decode valid token without verification', async () => {
      const token = await service.sign(payload);
      const decoded = service.decode(token);
      expect(decoded?.sub).toBe('user-1');
    });

    it('should return null for invalid token', () => {
      expect(service.decode('garbage')).toBeNull();
    });
  });
});
