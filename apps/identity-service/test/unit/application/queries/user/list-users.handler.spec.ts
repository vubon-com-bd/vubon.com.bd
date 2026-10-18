import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUsersHandler } from '@application/queries/user/list-users.handler.js';
import { makeListUsersQuery, makeUserRepositoryMock } from '@fixtures/index.js';

describe('ListUsersHandler', () => {
  let handler: ListUsersHandler;
  let repo: ReturnType<typeof makeUserRepositoryMock>;

  beforeEach(() => {
    repo = makeUserRepositoryMock();
    handler = new ListUsersHandler(repo as never);
  });

  it('queryType = user.list', () => {
    expect(handler.queryType).toBe('user.list');
  });

  it('should return paginated empty', async () => {
    repo.findPaginated.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 } as never);
    const result = await handler.execute(makeListUsersQuery());
    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });

  it('should return paginated with items', async () => {
    repo.findPaginated.mockResolvedValue({
      items: [],
      total: 5,
      page: 1,
      limit: 20,
      totalPages: 1,
    } as never);
    const result = await handler.execute(makeListUsersQuery());
    expect(result.total).toBe(5);
    expect(result.totalPages).toBe(1);
  });
});
