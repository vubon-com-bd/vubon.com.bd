/**
 * UserAddressService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserAddressService } from './user-address.service';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildAddress = (overrides: Partial<Parameters<typeof UserAddressEntity.create>[0]> = {}) =>
  UserAddressEntity.create({
    id: 'addr-1',
    userId: 'user-1' as never,
    label: 'Home',
    line1: '123 Main St',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    postalCode: '1205',
    isDefault: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((a: UserAddressEntity) => Promise.resolve(a)),
  delete: jest.fn(),
  exists: jest.fn(),
  findDefaultByUserId: jest.fn(),
  clearDefaultForUser: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'addr-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserAddressService', () => {
  let service: UserAddressService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new UserAddressService(repo as never, idGen as never);
  });

  describe('listForUser()', () => {
    it('should delegate to repo', async () => {
      const addresses = [buildAddress()];
      repo.findByUserId.mockResolvedValue(addresses);

      const result = await service.listForUser('user-1' as never);

      expect(result).toEqual(addresses);
    });
  });

  describe('add()', () => {
    it('should create new address', async () => {
      const result = await service.add('user-1' as never, {
        label: 'Home',
        line1: '123 Main',
        division: 'Dhaka',
        district: 'Dhaka',
        upazila: 'Dhanmondi',
        postalCode: '1205',
        isDefault: false,
      } as never);

      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
    });

    it('should clear previous default when isDefault=true', async () => {
      await service.add('user-1' as never, {
        label: 'Home',
        line1: '123',
        division: 'Dhaka',
        district: 'Dhaka',
        upazila: 'Dhanmondi',
        postalCode: '1205',
        isDefault: true,
      } as never);

      expect(repo.clearDefaultForUser).toHaveBeenCalledWith('user-1');
    });
  });

  describe('update()', () => {
    it('should throw when address not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.update('missing', {} as never)).rejects.toThrow();
    });

    it('should update address lines', async () => {
      const addr = buildAddress();
      repo.findById.mockResolvedValue(addr);

      await service.update('addr-1', { line1: '456 New St' } as never);

      expect(repo.save).toHaveBeenCalled();
    });

    it('should clear default when setting new default', async () => {
      const addr = buildAddress();
      repo.findById.mockResolvedValue(addr);

      await service.update('addr-1', { isDefault: true } as never);

      expect(repo.clearDefaultForUser).toHaveBeenCalled();
      expect(addr.isDefault).toBe(true);
    });
  });

  describe('remove()', () => {
    it('should delete address', async () => {
      await service.remove('addr-1');
      expect(repo.delete).toHaveBeenCalledWith('addr-1');
    });
  });

  describe('setDefault()', () => {
    it('should throw when address not owned by user', async () => {
      const addr = buildAddress({ userId: 'user-99' as never });
      repo.findById.mockResolvedValue(addr);

      await expect(
        service.setDefault('user-1' as never, 'addr-1'),
      ).rejects.toThrow();
    });

    it('should set address as default', async () => {
      const addr = buildAddress();
      repo.findById.mockResolvedValue(addr);

      await service.setDefault('user-1' as never, 'addr-1');

      expect(addr.isDefault).toBe(true);
      expect(repo.clearDefaultForUser).toHaveBeenCalledWith('user-1');
    });
  });

  describe('toResponse()', () => {
    it('should map to DTO', () => {
      const dto = service.toResponse(buildAddress());
      expect(dto.id).toBe('addr-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.label).toBe('Home');
      expect(dto.postalCode).toBe('1205');
    });
  });
});
