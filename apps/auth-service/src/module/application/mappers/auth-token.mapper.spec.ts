/**
 * AuthTokenMapper — Unit Tests
 * @module auth-service/application/mappers
 */
import { AuthTokenMapper } from './auth-token.mapper';
import { AuthTokenEntity } from '../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../domain/value-objects/primitives/token-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildToken = (overrides: Partial<Parameters<typeof AuthTokenEntity.create>[0]> = {}) =>
  AuthTokenEntity.create({
    id: 'tok-1',
    subjectId: 'user-1',
    value: TokenValueVO.of('a'.repeat(64)),
    type: TokenTypeVO.of('access'),
    expiry: TokenExpiryVO.fromEpoch(NOW_MS + 900_000),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthTokenMapper', () => {
  const mapper = new AuthTokenMapper();

  describe('toTarget()', () => {
    it('should map accessToken from value', () => {
      const dto = mapper.toTarget(buildToken());
      expect(dto.accessToken).toBe('a'.repeat(64));
    });

    it('should set tokenType to Bearer', () => {
      const dto = mapper.toTarget(buildToken());
      expect(dto.tokenType).toBe('Bearer');
    });

    it('should convert expiry to expiresAt', () => {
      const t = buildToken();
      const dto = mapper.toTarget(t);
      expect(dto.expiresAt).toBe(t.expiry.epochMs);
    });

    it('should compute expiresIn as seconds', () => {
      const t = buildToken();
      const dto = mapper.toTarget(t);
      expect(typeof dto.expiresIn).toBe('number');
    });

    it('should NOT expose refresh token (mapper is partial)', () => {
      const dto = mapper.toTarget(buildToken());
      expect(dto.refreshToken).toBe('');
    });
  });

  describe('toSource()', () => {
    it('should throw', () => {
      expect(() =>
        mapper.toSource({
          accessToken: 'x', refreshToken: 'y', tokenType: 'Bearer',
          expiresIn: 900, expiresAt: NOW_MS,
        } as never),
      ).toThrow();
    });
  });
});
