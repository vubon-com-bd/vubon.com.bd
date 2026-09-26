/**
 * UserActivityService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserActivityService } from './user-activity.service';
import { UserActivityEntity } from '../../../domain/entities/user-activity.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildActivity = (overrides: Partial<Parameters<typeof UserActivityEntity.create>[0]> = {}) =>
  UserActivityEntity.create({
    id: 'act-1',
    userId: 'user-1' as never,
    type: 'login',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((a: UserActivityEntity) => Promise.resolve(a)),
  delete: jest.fn(),
  exists: jest.fn(),
  findRecentByUser: jest.fn(),
  deleteOlderThan: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'act-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserActivityService', () => {
  let service: UserActivityService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new UserActivityService(repo as never, idGen as never);
  });

  describe('record()', () => {
    it('should create activity entity', async () => {
      const result = await service.record({
        userId: 'user-1' as never,
        type: 'login',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
      });

      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
      expect(result.type).toBe('login');
    });

    it('should accept metadata', async () => {
      const result = await service.record({
        userId: 'user-1' as never,
        type: 'login',
        metadata: { device: 'iPhone' },
      });

      expect(result.metadata).toEqual({ device: 'iPhone' });
    });
  });

  describe('listForUser()', () => {
    it('should delegate with limit', async () => {
      repo.findByUserId.mockResolvedValue([buildActivity()]);

      const result = await service.listForUser('user-1' as never, 20);

      expect(result).toHaveLength(1);
      expect(repo.findByUserId).toHaveBeenCalledWith('user-1', 20);
    });

    it('should use default limit', async () => {
      repo.findByUserId.mockResolvedValue([]);

      await service.listForUser('user-1' as never);

      expect(repo.findByUserId).toHaveBeenCalledWith('user-1', 50);
    });
  });

  describe('toResponse()', () => {
    it('should map to DTO', () => {
      const dto = service.toResponse(buildActivity());
      expect(dto.id).toBe('act-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.type).toBe('login');
      expect(dto.ipAddress).toBe('192.168.1.1');
    });

    it('should include metadata when present', () => {
      const dto = service.toResponse(buildActivity({ metadata: { a: 'b' } }));
      expect(dto.metadata).toEqual({ a: 'b' });
    });
  });
});
