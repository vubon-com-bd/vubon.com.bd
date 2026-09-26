/**
 * AuthMfaMapper — Unit Tests
 * @module auth-service/application/mappers
 */
import { AuthMfaMapper } from './auth-mfa.mapper';
import { AuthMfaEntity } from '../../domain/entities/auth-mfa.entity';
import { MfaTypeVO } from '../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../domain/value-objects/primitives/mfa-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildMfa = (status: 'disabled' | 'pending' | 'enabled' | 'suspended' = 'disabled') =>
  AuthMfaEntity.create({
    id: 'mfa-1',
    userId: 'user-1' as never,
    type: MfaTypeVO.of('totp'),
    status: MfaStatusVO.of(status),
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('AuthMfaMapper', () => {
  const mapper = new AuthMfaMapper();

  describe('map()', () => {
    it('should map disabled MFA', () => {
      const dto = mapper.map(buildMfa('disabled'));
      expect(dto.enabled).toBe(false);
      expect(dto.type).toBe('totp');
    });

    it('should map enabled MFA', () => {
      const dto = mapper.map(buildMfa('enabled'));
      expect(dto.enabled).toBe(true);
    });

    it('should map pending MFA (not enabled)', () => {
      const dto = mapper.map(buildMfa('pending'));
      expect(dto.enabled).toBe(false);
    });

    it('should include enrolledAt', () => {
      const dto = mapper.map(buildMfa('enabled'));
      expect(dto.enrolledAt).toBeDefined();
      expect(typeof dto.enrolledAt).toBe('string');
    });
  });
});
