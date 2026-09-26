/**
 * GetUserContactHandler — Unit Tests
 */
import { GetUserContactHandler } from './get-user-contact.handler';
import { GetUserContactQuery } from './get-user-contact.query';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildContact = () =>
  UserContactEntity.create({
    id: 'contact-1',
    userId: 'user-1' as never,
    email: UserEmailVO.of('john@example.com'),
    verified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findById: jest.fn() });

describe('GetUserContactHandler', () => {
  let handler: GetUserContactHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserContactHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserContactQuery');
  });

  it('should return null when not found', async () => {
    repo.findById.mockResolvedValue(null);
    const query = new GetUserContactQuery('missing');

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return mapped contact', async () => {
    repo.findById.mockResolvedValue(buildContact());
    const query = new GetUserContactQuery('contact-1');

    const result = await handler.execute(query);

    expect(result?.id).toBe('contact-1');
    expect(result?.email).toBe('john@example.com');
  });
});
