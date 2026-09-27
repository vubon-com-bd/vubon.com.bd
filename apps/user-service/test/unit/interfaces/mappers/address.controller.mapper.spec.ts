import { AddressControllerMapper } from '@interfaces/mappers/address.controller.mapper';

describe('AddressControllerMapper', () => {
  const appDto = {
    id: 'addr-1',
    userId: 'user-1',
    type: 'home',
    line1: '123 Main',
    city: 'Dhaka',
    country: 'BD',
    isDefault: true,
    isDefaultShipping: false,
    isDefaultBilling: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('toResponse maps entity', () => {
    const result = AddressControllerMapper.toResponse(appDto as never);
    expect(result.id).toBe('addr-1');
    expect(result.city).toBe('Dhaka');
  });

  it('toListResponse wraps items', () => {
    const result = AddressControllerMapper.toListResponse([appDto as never]);
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(1);
  });

  it('toAddAppDto adds userId', () => {
    const result = AddressControllerMapper.toAddAppDto('user-1', {
      type: 'home',
      line1: '123 Main',
      city: 'Dhaka',
      postalCode: '1200',
    } as never);
    expect(result.userId).toBe('user-1');
  });
});
