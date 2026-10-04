import { KycControllerMapper } from '@interfaces/mappers/kyc.controller.mapper';

describe('KycControllerMapper', () => {
  it('toResponse maps entity', () => {
    const result = KycControllerMapper.toResponse({
      userId: 'user-1',
      status: 'pending',
      level: 0,
      documents: [],
      updatedAt: '2026-01-01T00:00:00.000Z',
    } as never);
    expect(result.userId).toBe('user-1');
    expect(result.status).toBe('pending');
  });

  it('toListResponse wraps', () => {
    const result = KycControllerMapper.toListResponse([]);
    expect(result.items.length).toBe(0);
  });

  it('toSubmitAppDto adds userId and normalizes', () => {
    const result = KycControllerMapper.toSubmitAppDto('user-1', {
      documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }],
      acceptTerms: true,
    } as never);
    expect(result.userId).toBe('user-1');
    expect(result.documents.length).toBe(1);
  });
});
