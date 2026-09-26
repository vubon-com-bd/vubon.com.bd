/**
 * UserKycService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserKycService } from './user-kyc.service';
import { UserKycEntity } from '../../../domain/entities/user-kyc.entity';

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

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((k: UserKycEntity) => Promise.resolve(k)),
  delete: jest.fn(),
  exists: jest.fn(),
  findPending: jest.fn(),
  findByDocumentNumber: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'kyc-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserKycService', () => {
  let service: UserKycService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new UserKycService(repo as never, idGen as never);
  });

  describe('submit()', () => {
    it('should create new KYC on first submit', async () => {
      repo.findByUserId.mockResolvedValue(null);

      const result = await service.submit('user-1' as never, {
        documentType: 'nid',
        documentNumber: '1234567890',
        frontImageUrl: 'https://x.com/front.jpg',
      } as never);

      expect(repo.save).toHaveBeenCalled();
      expect(result.status).toBe('pending');
    });

    it('should update existing KYC', async () => {
      const k = buildKyc();
      repo.findByUserId.mockResolvedValue(k);

      await service.submit('user-1' as never, {
        documentType: 'nid',
        documentNumber: '1234567890',
        frontImageUrl: 'https://x.com/front.jpg',
      } as never);

      expect(repo.save).toHaveBeenCalled();
      expect(k.status).toBe('pending');
    });
  });

  describe('approve()', () => {
    it('should approve pending KYC', async () => {
      const k = buildKyc({ status: 'pending' });
      repo.findByUserId.mockResolvedValue(k);

      await service.approve({ userId: 'user-1' } as never);

      expect(k.status).toBe('approved');
    });

    it('should throw when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);
      await expect(service.approve({ userId: 'user-1' } as never)).rejects.toThrow();
    });
  });

  describe('reject()', () => {
    it('should reject pending KYC with reason', async () => {
      const k = buildKyc({ status: 'pending' });
      repo.findByUserId.mockResolvedValue(k);

      await service.reject({ userId: 'user-1', reason: 'Blurry' } as never);

      expect(k.status).toBe('rejected');
    });

    it('should throw when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);
      await expect(
        service.reject({ userId: 'user-1', reason: 'x' } as never),
      ).rejects.toThrow();
    });
  });

  describe('getByUserId()', () => {
    it('should return KYC when found', async () => {
      const k = buildKyc();
      repo.findByUserId.mockResolvedValue(k);

      const result = await service.getByUserId('user-1' as never);

      expect(result).toEqual(k);
    });

    it('should return null when not found', async () => {
      repo.findByUserId.mockResolvedValue(null);
      const result = await service.getByUserId('user-1' as never);
      expect(result).toBeNull();
    });
  });

  describe('listPending()', () => {
    it('should delegate to repo', async () => {
      repo.findPending.mockResolvedValue([buildKyc({ status: 'pending' })]);
      const result = await service.listPending();
      expect(result).toHaveLength(1);
    });
  });

  describe('toResponse()', () => {
    it('should mask document number', () => {
      const dto = service.toResponse(buildKyc());
      expect(dto.documentNumberMasked).toBe('****7890');
    });

    it('should handle short document number', () => {
      const dto = service.toResponse(buildKyc({ documentNumber: '123' }));
      expect(dto.documentNumberMasked).toBe('****');
    });
  });
});
