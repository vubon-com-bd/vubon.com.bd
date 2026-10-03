/**
 * UserMapper Unit Test (Application layer)
 */
import { UserMapper } from '@application/mappers/user.mapper';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

describe('UserMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildUser = () => {
    const u = UserEntity.create({
      id: UserIdVO.create('user-1'),
      email: UserEmailVO.create('user@example.com'),
      name: UserNameVO.create('John Doe'),
      type: UserTypeVO.create('individual'),
      now,
    });
    u.markEmailVerified();
    u.activate(now);
    return u;
  };

  describe('toResponse', () => {
    it('should map UserEntity to UserResponseDTO', () => {
      const dto = UserMapper.toResponse(buildUser());

      expect(dto.id).toBe('user-1');
      expect(dto.email).toBe('user@example.com');
      expect(dto.status).toBe('active');
      expect(dto.type).toBe('individual');
      expect(dto.emailVerified).toBe(true);
      expect(dto.phoneVerified).toBe(false);
    });

    it('should not include sensitive fields', () => {
      const dto = UserMapper.toResponse(buildUser()) as Record<string, unknown>;
      expect(dto.passwordHash).toBeUndefined();
      expect(dto.password).toBeUndefined();
      expect(dto.refreshToken).toBeUndefined();
    });

    it('should set phone to undefined when no phone', () => {
      const dto = UserMapper.toResponse(buildUser());
      expect(dto.phone).toBeUndefined();
    });
  });

  describe('toPublicResponse', () => {
    it('should only contain public fields', () => {
      const dto = UserMapper.toPublicResponse(buildUser());

      expect(dto.id).toBe('user-1');
      expect(dto.displayName).toBe('John Doe');
      expect(dto.status).toBe('active');
      // no email, no phone
      expect((dto as Record<string, unknown>).email).toBeUndefined();
      expect((dto as Record<string, unknown>).phone).toBeUndefined();
    });
  });

  describe('toResponseList', () => {
    it('should map list of users', () => {
      const users = [buildUser(), buildUser()];
      const dtos = UserMapper.toResponseList(users);
      expect(dtos.length).toBe(2);
      expect(dtos[0].id).toBe('user-1');
    });

    it('should return empty array for empty input', () => {
      expect(UserMapper.toResponseList([])).toEqual([]);
    });
  });

  describe('toPublicResponseList', () => {
    it('should map list of users to public response', () => {
      const users = [buildUser()];
      const dtos = UserMapper.toPublicResponseList(users);
      expect(dtos.length).toBe(1);
      expect(dtos[0].displayName).toBe('John Doe');
    });
  });
});
