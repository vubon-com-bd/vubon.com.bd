import { UserControllerMapper } from '@interfaces/mappers/user.controller.mapper';

describe('UserControllerMapper', () => {
  const appDto = {
    id: 'user-1',
    email: 'user@example.com',
    status: 'active' as const,
    type: 'individual' as const,
    roles: ['user'] as const,
    emailVerified: true,
    phoneVerified: false,
    isMfaEnabled: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('toResponse maps App DTO to interface DTO', () => {
    const result = UserControllerMapper.toResponse(appDto as never);
    expect(result.id).toBe('user-1');
    expect(result.email).toBe('user@example.com');
    expect(result.status).toBe('active');
  });

  it('toResponseList maps array', () => {
    const results = UserControllerMapper.toResponseList([appDto as never]);
    expect(results.length).toBe(1);
  });

  it('toPublicResponse redacts sensitive fields', () => {
    const result = UserControllerMapper.toPublicResponse({
      id: 'user-1',
      displayName: 'John Doe',
      status: 'active',
      type: 'individual',
    } as never);
    expect(result.id).toBe('user-1');
    expect((result as Record<string, unknown>).email).toBeUndefined();
  });

  it('toCreateAppDto converts request DTO', () => {
    const result = UserControllerMapper.toCreateAppDto({
      email: 'user@example.com',
      password: 'Test123!@#',
      type: 'individual',
      acceptTerms: true,
    } as never);
    expect(result.email).toBe('user@example.com');
  });

  it('toListResponse wraps items and pagination', () => {
    const result = UserControllerMapper.toListResponse(
      [appDto as never],
      1,
      1,
      20,
      1
    );
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(1);
  });
});
