import { ContactControllerMapper } from '@interfaces/mappers/contact.controller.mapper';

describe('ContactControllerMapper', () => {
  const appDto = {
    id: 'c-1',
    userId: 'user-1',
    type: 'email',
    value: 'user@example.com',
    isPrimary: false,
    isVerified: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('toResponse maps entity', () => {
    const result = ContactControllerMapper.toResponse(appDto as never);
    expect(result.id).toBe('c-1');
    expect(result.value).toBe('user@example.com');
  });

  it('toListResponse wraps', () => {
    const result = ContactControllerMapper.toListResponse([appDto as never]);
    expect(result.total).toBe(1);
  });
});
