/**
 * UserService — Unit Tests
 * @module auth-service/application/services/impl
 */
import { UserService } from './user.service';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../domain/value-objects/primitives/user-name.vo';
import { UserStatusVO } from '../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../domain/value-objects/primitives/user-role.vo';
import {
  UserNotFoundAppError,
  UserAlreadyExistsAppError,
} from '../../errors/user.errors';

const NOW = '2024-01-01T00:00:00.000Z';

const buildUser = (overrides: Partial<Parameters<typeof UserEntity.create>[0]> = {}) =>
  UserEntity.create({
    id: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    passwordHash: '$2b$12$abcdefghijklmnopqrstuv',
    name: UserNameVO.of('John Doe'),
    status: UserStatusVO.active(),
    type: UserTypeVO.of('customer'),
    roles: [UserRoleVO.customer()],
    emailVerified: true,
    phoneVerified: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

const mockUserRepo = () => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  existsByEmail: jest.fn(),
  findAll: jest.fn(),
  save: jest.fn((u: UserEntity) => Promise.resolve(u)),
  delete: jest.fn(),
  exists: jest.fn(),
  findByIds: jest.fn(),
  countByStatus: jest.fn(),
});

const mockHasher = () => ({
  name: 'PasswordHasherService',
  hash: jest.fn(() => Promise.resolve('$2b$12$hash')),
  verify: jest.fn(),
  needsRehash: jest.fn(),
});

const mockIdGen = () => ({
  name: 'IdGeneratorService',
  generate: jest.fn(() => 'id-1'),
  generateUuid: jest.fn(() => 'uuid-1'),
});

describe('UserService', () => {
  let service: UserService;
  let userRepo: ReturnType<typeof mockUserRepo>;
  let hasher: ReturnType<typeof mockHasher>;
  let idGen: ReturnType<typeof mockIdGen>;

  beforeEach(() => {
    userRepo = mockUserRepo();
    hasher = mockHasher();
    idGen = mockIdGen();
    service = new UserService(userRepo as never, hasher as never, idGen as never);
  });

  // ═══════════════════════════════════════════════════════════
  // create
  // ═══════════════════════════════════════════════════════════

  describe('create()', () => {
    const validInput = {
      email: 'new@example.com',
      password: 'Str0ng!Pass#2024',
      type: 'customer',
      acceptTerms: true,
    };

    it('should throw if email exists', async () => {
      userRepo.existsByEmail.mockResolvedValue(true);

      await expect(service.create(validInput as never))
        .rejects.toThrow(UserAlreadyExistsAppError);
    });

    it('should hash password before saving', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);

      await service.create(validInput as never);

      expect(hasher.hash).toHaveBeenCalledWith('Str0ng!Pass#2024');
    });

    it('should create user with "User" as default name', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);
      let saved: UserEntity | undefined;
      userRepo.save.mockImplementation((u: UserEntity) => {
        saved = u;
        return Promise.resolve(u);
      });

      await service.create(validInput as never);

      expect(saved?.name.value).toBe('User');
    });

    it('should set status to pending', async () => {
      userRepo.existsByEmail.mockResolvedValue(false);
      let saved: UserEntity | undefined;
      userRepo.save.mockImplementation((u: UserEntity) => {
        saved = u;
        return Promise.resolve(u);
      });

      await service.create(validInput as never);

      expect(saved?.status.value).toBe('pending');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // update
  // ═══════════════════════════════════════════════════════════

  describe('update()', () => {
    it('should throw if user not found', async () => {
      userRepo.findById.mockResolvedValue(null);

      await expect(service.update('missing' as never, { name: 'X' } as never))
        .rejects.toThrow(UserNotFoundAppError);
    });

    it('should update user name', async () => {
      const user = buildUser();
      userRepo.findById.mockResolvedValue(user);

      await service.update('user-1' as never, { name: 'Jane Doe' } as never);

      expect(user.name.value).toBe('Jane Doe');
      expect(userRepo.save).toHaveBeenCalled();
    });
  });

  // ═══════════════════════════════════════════════════════════
  // delete
  // ═══════════════════════════════════════════════════════════

  describe('delete()', () => {
    it('should throw if not found', async () => {
      userRepo.findById.mockResolvedValue(null);
      await expect(service.delete('missing' as never)).rejects.toThrow(UserNotFoundAppError);
    });

    it('should soft-delete (status = deleted)', async () => {
      const user = buildUser();
      userRepo.findById.mockResolvedValue(user);

      await service.delete('user-1' as never, 'user_request');

      expect(user.status.value).toBe('deleted');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // activate
  // ═══════════════════════════════════════════════════════════

  describe('activate()', () => {
    it('should change status to active', async () => {
      const user = buildUser({ status: UserStatusVO.pending() });
      userRepo.findById.mockResolvedValue(user);

      await service.activate('user-1' as never);

      expect(user.status.value).toBe('active');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // deactivate
  // ═══════════════════════════════════════════════════════════

  describe('deactivate()', () => {
    it('should change status to inactive', async () => {
      const user = buildUser();
      userRepo.findById.mockResolvedValue(user);

      await service.deactivate('user-1' as never, 'policy');

      expect(user.status.value).toBe('inactive');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // suspend
  // ═══════════════════════════════════════════════════════════

  describe('suspend()', () => {
    it('should change status to suspended', async () => {
      const user = buildUser();
      userRepo.findById.mockResolvedValue(user);

      await service.suspend('user-1' as never, 'fraud');

      expect(user.status.value).toBe('suspended');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // unsuspend
  // ═══════════════════════════════════════════════════════════

  describe('unsuspend()', () => {
    it('should change status back to active', async () => {
      const user = buildUser({ status: UserStatusVO.suspended() });
      userRepo.findById.mockResolvedValue(user);

      await service.unsuspend('user-1' as never);

      expect(user.status.value).toBe('active');
    });
  });

  // ═══════════════════════════════════════════════════════════
  // findByEmail
  // ═══════════════════════════════════════════════════════════

  describe('findByEmail()', () => {
    it('should delegate to repo', async () => {
      const user = buildUser();
      userRepo.findByEmail.mockResolvedValue(user);

      const result = await service.findByEmail('john@example.com');

      expect(result).toEqual(user);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // toResponse
  // ═══════════════════════════════════════════════════════════

  describe('toResponse()', () => {
    it('should map user to DTO', () => {
      const dto = service.toResponse(buildUser());
      expect(dto.id).toBe('user-1');
      expect(dto.email).toBe('john@example.com');
      expect(dto.roles).toContain('customer');
    });

    it('should NOT leak passwordHash', () => {
      const dto = service.toResponse(buildUser());
      expect(JSON.stringify(dto)).not.toContain('$2b$');
    });
  });
});
