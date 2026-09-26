/**
 * UserContactService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserContactService } from './user-contact.service';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../../../domain/value-objects/primitives/user-phone.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildContact = (overrides: Partial<Parameters<typeof UserContactEntity.create>[0]> = {}) =>
  UserContactEntity.create({
    id: 'contact-1',
    userId: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    verified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockRepo = () => ({
  findById: jest.fn(),
  findByUserId: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((c: UserContactEntity) => Promise.resolve(c)),
  delete: jest.fn(),
  exists: jest.fn(),
  findVerifiedByUserId: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'contact-new'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserContactService', () => {
  let service: UserContactService;
  let repo: ReturnType<typeof mockRepo>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    repo = mockRepo();
    idGen = mockIdGen();
    service = new UserContactService(repo as never, idGen as never);
  });

  describe('listForUser()', () => {
    it('should delegate', async () => {
      repo.findByUserId.mockResolvedValue([buildContact()]);
      const result = await service.listForUser('user-1' as never);
      expect(result).toHaveLength(1);
    });
  });

  describe('add()', () => {
    it('should create contact with email', async () => {
      const result = await service.add('user-1' as never, {
        email: 'alt@example.com',
      } as never);
      expect(repo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
    });

    it('should create contact with phone', async () => {
      const result = await service.add('user-1' as never, {
        phone: '+8801712345678',
      } as never);
      expect(result.phone?.value).toBe('+8801712345678');
    });
  });

  describe('update()', () => {
    it('should throw when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.update({ contactId: 'missing' } as never)).rejects.toThrow();
    });

    it('should mark verified', async () => {
      const c = buildContact();
      repo.findById.mockResolvedValue(c);
      await service.update({ contactId: 'contact-1', verified: true } as never);
      expect(c.verified).toBe(true);
    });
  });

  describe('remove()', () => {
    it('should delete contact', async () => {
      await service.remove('contact-1');
      expect(repo.delete).toHaveBeenCalledWith('contact-1');
    });
  });

  describe('toResponse()', () => {
    it('should map contact to DTO', () => {
      const dto = service.toResponse(buildContact());
      expect(dto.id).toBe('contact-1');
      expect(dto.email).toBe('john@example.com');
      expect(dto.verified).toBe(false);
    });

    it('should include phone if present', () => {
      const c = buildContact({
        email: undefined,
        phone: UserPhoneVO.of('+8801712345678'),
      });
      const dto = service.toResponse(c);
      expect(dto.phone).toBe('+8801712345678');
    });
  });
});
