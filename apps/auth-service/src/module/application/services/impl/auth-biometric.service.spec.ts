/**
 * AuthBiometricService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { AuthBiometricService } from './auth-biometric.service';
import { AuthBiometricEntity } from '../../../domain/entities/auth-biometric.entity';
import { BiometricIdVO } from '../../../domain/value-objects/primitives/biometric-id.vo';
import { BiometricFailedAppError } from '../../errors/biometric.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildBio = (overrides: Partial<Parameters<typeof AuthBiometricEntity.create>[0]> = {}) =>
  AuthBiometricEntity.create({
    id: 'bio-1',
    userId: 'user-1' as never,
    biometricId: BiometricIdVO.of('bio_abc12345'),
    kind: 'fingerprint',
    enrolledAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUser: jest.fn(),
  findByBiometricId: jest.fn(),
  findByUserAndKind: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((b: AuthBiometricEntity) => Promise.resolve(b)),
  delete: jest.fn(),
  exists: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'bio-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('AuthBiometricService', () => {
  let service: AuthBiometricService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new AuthBiometricService(repo as never, idGen as never);
  });

  describe('enroll()', () => {
    it('should enroll fingerprint', async () => {
      const result = await service.enroll('user-1' as never, {
        kind: 'fingerprint',
        biometricId: 'bio_abc12345',
        deviceId: 'device-1',
        password: 'x',
      } as never);

      expect(result.enabled).toBe(true);
      expect(result.biometricId).toBe('bio_abc12345');
      expect(result.kind).toBe('fingerprint');
    });

    it('should enroll face', async () => {
      const result = await service.enroll('user-1' as never, {
        kind: 'face',
        biometricId: 'bio_face1234',
        deviceId: 'device-1',
        password: 'x',
      } as never);

      expect(result.kind).toBe('face');
    });
  });

  describe('remove()', () => {
    it('should remove matching biometric', async () => {
      repo.findByUser.mockResolvedValue([buildBio()]);

      await service.remove('user-1' as never, {
        biometricId: 'bio_abc12345',
        password: 'x',
      } as never);

      expect(repo.delete).toHaveBeenCalledWith('bio-1');
    });

    it('should be a no-op if not found', async () => {
      repo.findByUser.mockResolvedValue([]);

      await service.remove('user-1' as never, {
        biometricId: 'bio_missing1234',
        password: 'x',
      } as never);

      expect(repo.delete).not.toHaveBeenCalled();
    });
  });

  describe('verify()', () => {
    it('should throw when not enrolled', async () => {
      repo.findByBiometricId.mockResolvedValue(null);

      await expect(
        service.verify({
          biometricId: 'bio_abc12345',
          challenge: 'challenge-1234',
          deviceId: 'device-1',
        } as never),
      ).rejects.toThrow(BiometricFailedAppError);
    });

    it('should return true for valid verification', async () => {
      repo.findByBiometricId.mockResolvedValue(buildBio());

      const result = await service.verify({
        biometricId: 'bio_abc12345',
        challenge: 'challenge-1234',
        deviceId: 'device-1',
      } as never);

      expect(result).toBe(true);
    });
  });

  describe('listForUser()', () => {
    it('should delegate to repo', async () => {
      repo.findByUser.mockResolvedValue([buildBio()]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });
});
