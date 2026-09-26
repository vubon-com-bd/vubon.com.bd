/**
 * GetUserAddressHandler — Unit Tests
 */
import { GetUserAddressHandler } from './get-user-address.handler';
import { GetUserAddressQuery } from './get-user-address.query';
import { UserAddressEntity } from '../../../domain/entities/user-address.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildAddress = () =>
  UserAddressEntity.create({
    id: 'addr-1',
    userId: 'user-1' as never,
    label: 'Home',
    line1: '123 Main St',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    postalCode: '1205',
    isDefault: true,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findById: jest.fn() });

describe('GetUserAddressHandler', () => {
  let handler: GetUserAddressHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserAddressHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserAddressQuery');
  });

  it('should return null when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const query = new GetUserAddressQuery('missing');

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return mapped address', async () => {
    repo.findById.mockResolvedValue(buildAddress());
    const query = new GetUserAddressQuery('addr-1');

    const result = await handler.execute(query);

    expect(result?.id).toBe('addr-1');
    expect(result?.label).toBe('Home');
    expect(result?.postalCode).toBe('1205');
  });
});
