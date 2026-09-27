import { ProfileControllerMapper } from '@interfaces/mappers/profile.controller.mapper';

describe('ProfileControllerMapper', () => {
  it('toUpdateAppDto maps userId + fields', () => {
    const result = ProfileControllerMapper.toUpdateAppDto('user-1', {
      bio: 'Hello',
      visibility: 'public',
    } as never);
    expect(result.userId).toBe('user-1');
    expect(result.bio).toBe('Hello');
  });

  it('toResponse maps App DTO to interface DTO', () => {
    const result = ProfileControllerMapper.toResponse({
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-01-01T00:00:00.000Z',
    } as never);
    expect(result.userId).toBe('user-1');
    expect(result.visibility).toBe('public');
  });
});
