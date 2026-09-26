/**
 * ListUserAddressesHandler — Unit Tests
 */
import { ListUserAddressesHandler } from './list-user-addresses.handler';
import { ListUserAddressesQuery } from './list-user-addresses.query';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildAddress = (id: string) =>
  UserAddressEntity.create({
    id,
    userId: 'user-1' as never,
    label: 'Home',
    line1: '123 Main St',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    postalCode: '1205',
    isDefault: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('ListUserAddressesHandler', () => {
  let handler: ListUserAddressesHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListUserAddressesHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUserAddressesQuery');
  });

  it('should return address list', async () => {
    repo.findByUserId.mockResolvedValue([buildAddress('a1'), buildAddress('a2')]);
    const query = new ListUserAddressesQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.id).toBe('a1');
  });

  it('should handle empty', async () => {
    repo.findByUserId.mockResolvedValue([]);
    const query = new ListUserAddressesQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toEqual([]);
  });
});
