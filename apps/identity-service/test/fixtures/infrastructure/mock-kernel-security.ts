/**
 * Kernel Security Service Mocks (HashService, JwtService, CryptoService)
 * @module identity-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

// ─── HashService ────────────────────────────
export const makeHashServiceMock = () => ({
  hash: jest.fn(async (plain: string) => `$2b$12$${'x'.repeat(53)}:${plain.length}`),
  compare: jest.fn(async (_plain: string, _hash: string) => true),
});

export type HashServiceMock = ReturnType<typeof makeHashServiceMock>;

// ─── JwtService ────────────────────────────
export const makeJwtServiceMock = () => ({
  sign: jest.fn(async () => 'mock.jwt.token'),
  verify: jest.fn(async () => ({
    sub: 'user-123',
    type: 'access',
    iat: 1234567890,
    exp: 1234567890 + 3600,
    iss: 'vubon-api',
    aud: 'vubon-client',
  })),
});

export type JwtServiceMock = ReturnType<typeof makeJwtServiceMock>;

// ─── CryptoService ─────────────────────────
export const makeCryptoServiceMock = () => ({
  encrypt: jest.fn((v: string) => `enc:${v}`),
  decrypt: jest.fn((v: string) => v.replace(/^enc:/, '')),
  hash: jest.fn((v: string) => `hash:${v}`),
});

export type CryptoServiceMock = ReturnType<typeof makeCryptoServiceMock>;
