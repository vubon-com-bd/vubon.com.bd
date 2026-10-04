/**
 * UserProfileMapper Unit Test
 */
import { UserProfileMapper } from '@application/mappers/user-profile.mapper';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';

describe('UserProfileMapper', () => {
  const now = '2026-01-01T00:00:00.000Z';

  const buildProfile = (withAvatar = false, withBio = false) => {
    const p = UserProfileEntity.create({
      id: 'profile-1',
      userId: UserIdVO.create('user-1'),
      now,
    });
    if (withAvatar) p.updateAvatar(UserAvatarVO.create('https://cdn.example.com/a.png'), now);
    if (withBio) p.updateBio(UserBioVO.create('Hello world'), now);
    return p;
  };

  describe('toResponse', () => {
    it('should map empty profile', () => {
      const dto = UserProfileMapper.toResponse(buildProfile());
      expect(dto.userId).toBe('user-1');
      expect(dto.avatarUrl).toBeUndefined();
      expect(dto.bio).toBeUndefined();
      expect(dto.visibility).toBe('public');
    });

    it('should map profile with avatar + bio', () => {
      const dto = UserProfileMapper.toResponse(buildProfile(true, true));
      expect(dto.avatarUrl).toBe('https://cdn.example.com/a.png');
      expect(dto.bio).toBe('Hello world');
    });
  });

  describe('toResponseList', () => {
    it('should map list', () => {
      const dtos = UserProfileMapper.toResponseList([buildProfile()]);
      expect(dtos.length).toBe(1);
    });
  });
});
