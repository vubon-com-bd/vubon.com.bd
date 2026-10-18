/**
 * TokenGeneratorService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { TokenGeneratorService } from '@infrastructure/services/internal/token-generator.service.js';
import { makeJwtServiceMock } from '@fixtures/index.js';

describe('TokenGeneratorService', () => {
  let service: TokenGeneratorService;
  let jwt: ReturnType<typeof makeJwtServiceMock>;

  beforeEach(() => {
    jwt = makeJwtServiceMock();
    service = new TokenGeneratorService(jwt as never);
  });

  it('generateAccessToken delegates to jwt.sign', async () => {
    jwt.sign.mockResolvedValueOnce('token-abc');
    const result = await service.generateAccessToken({ sub: 'u-1', type: 'access' } as never);
    expect(result).toBe('token-abc');
    expect(jwt.sign).toHaveBeenCalled();
  });

  it('generateRefreshToken returns hex string', () => {
    const token = service.generateRefreshToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(20);
  });

  it('generateRefreshToken produces unique values', () => {
    const a = service.generateRefreshToken();
    const b = service.generateRefreshToken();
    expect(a).not.toBe(b);
  });

  it('generateOpaqueToken returns string with custom bytes', () => {
    const t = service.generateOpaqueToken(16);
    expect(t.length).toBe(32); // 16 bytes → 32 hex chars
  });

  it('generatePair returns access + refresh + expiry', async () => {
    jwt.sign.mockResolvedValue('token');
    const pair = await service.generatePair({ sub: 'u-1' } as never);
    expect(pair).toHaveProperty('accessToken');
    expect(pair).toHaveProperty('refreshToken');
    expect(pair).toHaveProperty('expiresAt');
  });

  it('hashToken returns stable SHA-256 hex', () => {
    const h1 = service.hashToken('token');
    const h2 = service.hashToken('token');
    expect(h1).toBe(h2);
    expect(h1.length).toBe(64); // SHA-256 hex
  });

  it('accessTtlSeconds returns number', () => {
    expect(typeof service.accessTtlSeconds()).toBe('number');
  });

  it('refreshTtlSeconds returns number', () => {
    expect(typeof service.refreshTtlSeconds()).toBe('number');
  });
});
