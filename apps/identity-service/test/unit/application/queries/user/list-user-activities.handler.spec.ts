import { describe, it, expect, beforeEach } from '@jest/globals';
import { ListUserActivitiesHandler } from '@application/queries/user/list-user-activities.handler.js';
import { ListUserActivitiesQuery } from '@application/queries/user/list-user-activities.query.js';
import { makeUserActivityServiceMock, TEST_IDS } from '@fixtures/index.js';

describe('ListUserActivitiesHandler', () => {
  let handler: ListUserActivitiesHandler;
  let service: ReturnType<typeof makeUserActivityServiceMock>;

  beforeEach(() => {
    service = makeUserActivityServiceMock();
    handler = new ListUserActivitiesHandler(service as never);
  });

  it('queryType = user.list-activities', () => {
    expect(handler.queryType).toBe('user.list-activities');
  });

  it('should return empty', async () => {
    service.listForUser.mockResolvedValue([]);
    const result = await handler.execute(new ListUserActivitiesQuery(TEST_IDS.USER_ID));
    expect(result).toEqual([]);
  });
});
