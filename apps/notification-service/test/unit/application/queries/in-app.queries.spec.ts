import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetInAppHandler } from '../../../../src/module/application/queries/in-app/get-in-app.handler.js';
import { GetInAppQuery } from '../../../../src/module/application/queries/in-app/get-in-app.query.js';
import { GetInAppInboxHandler } from '../../../../src/module/application/queries/in-app/get-in-app-inbox.handler.js';
import { GetInAppInboxQuery } from '../../../../src/module/application/queries/in-app/get-in-app-inbox.query.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: FIXED_NOTIFICATION_ID }),
    inbox: jest.fn().mockResolvedValue({ userId: FIXED_USER_ID, unreadCount: 0, totalCount: 0, notifications: [] }),
  } as never;
}

describe('In-App query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetInAppHandler', async () => {
    await new GetInAppHandler(svc).execute(new GetInAppQuery(FIXED_NOTIFICATION_ID, FIXED_USER_ID));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('GetInAppInboxHandler', async () => {
    await new GetInAppInboxHandler(svc).execute(new GetInAppInboxQuery({ userId: FIXED_USER_ID } as never));
    expect(svc.inbox).toHaveBeenCalled();
  });
});
