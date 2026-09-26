/**
 * ListUserContactsHandler — Unit Tests
 */
import { ListUserContactsHandler } from './list-user-contacts.handler';
import { ListUserContactsQuery } from './list-user-contacts.query';
import { UserContactEntity } from '../../../domain/entities/user-contact.entity';
import { UserEmailVO } from '../../../domain/value-objects/primitives/user-email.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildContact = (id: string, email: string) =>
  UserContactEntity.create({
    id,
    userId: 'user-1' as never,
    email: UserEmailVO.of(email),
    verified: false,
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('ListUserContactsHandler', () => {
  let handler: ListUserContactsHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new ListUserContactsHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('ListUserContactsQuery');
  });

  it('should return contact DTOs', async () => {
    repo.findByUserId.mockResolvedValue([
      buildContact('c1', 'a@example.com'),
      buildContact('c2', 'b@example.com'),
    ]);
    const query = new ListUserContactsQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result).toHaveLength(2);
    expect(result[0]?.email).toBe('a@example.com');
  });
});
