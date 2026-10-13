/**
 * UserProfileService — Unit Tests
 */
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../../../../src/module/application/services/impl/user-profile.service.js';
import { USER_PROFILE_REPOSITORY } from '../../../../src/module/domain/repositories/user-profile.repository.interface.js';

describe('UserProfileService', () => {
  let service: UserProfileService;
  let repo: { findByUserIdRaw: jest.Mock };

  beforeEach(async () => {
    repo = { findByUserIdRaw: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        { provide: USER_PROFILE_REPOSITORY, useValue: repo },
      ],
    }).compile();

    service = module.get(UserProfileService);
  });

  it('has correct name', () => {
    expect(service.name).toBe('UserProfileService');
  });

  it('returns null when not found', async () => {
    repo.findByUserIdRaw.mockResolvedValue(null as never);
    const result = await service.findForUser('user-1');
    expect(result).toBeNull();
  });

  it('returns DTO when found', async () => {
    repo.findByUserIdRaw.mockResolvedValue({
      userId: { value: 'user-1' },
      firstName: { value: 'John' },
      lastName: { value: 'Doe' },
      displayName: 'John Doe',
      bio: 'Test bio',
      avatarUrl: 'https://example.com/avatar.jpg',
      updatedAt: '2026-01-01T00:00:00Z',
    } as never);

    const result = await service.findForUser('user-1');
    expect(result).not.toBeNull();
    expect(result?.userId).toBe('user-1');
    expect(result?.firstName).toBe('John');
    expect(result?.visibility).toBe('public');
    expect(result?.completionPercent).toBeGreaterThan(0);
  });
});
