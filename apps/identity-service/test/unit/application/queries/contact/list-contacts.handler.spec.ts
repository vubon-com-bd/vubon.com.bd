import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ListContactsHandler } from '@application/queries/contact/list-contacts.handler.js';
import { ListContactsQuery } from '@application/queries/contact/list-contacts.query.js';
import type { UserContactServiceInterface } from '@application/services/interfaces/user-contact.service.interface.js';

describe('ListContactsHandler', () => {
  let handler: ListContactsHandler;
  let mockService: jest.Mocked<UserContactServiceInterface>;

  beforeEach(() => {
    mockService = {
      name: 'UserContactService',
      listForUser: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      setPrimary: jest.fn(),
    } as unknown as jest.Mocked<UserContactServiceInterface>;
    handler = new ListContactsHandler(mockService);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('user.list-contacts');
  });

  it('should call service.listForUser', async () => {
    mockService.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListContactsQuery('u-1'));
    expect(mockService.listForUser).toHaveBeenCalledWith('u-1');
    expect(result).toEqual([]);
  });
});
