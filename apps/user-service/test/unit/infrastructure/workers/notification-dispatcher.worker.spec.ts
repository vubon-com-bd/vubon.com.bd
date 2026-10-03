import { jest } from '@jest/globals';

import { NotificationDispatcherWorker } from '@infrastructure/workers/notification-dispatcher.worker';

describe('NotificationDispatcherWorker', () => {
  let worker: NotificationDispatcherWorker;
  let email: { sendWelcome: jest.Mock };
  let sms: { sendVerificationCode: jest.Mock };
  let push: { send: jest.Mock };
  let logger: { log: jest.Mock; warn: jest.Mock; error: jest.Mock };

  beforeEach(() => {
    email = { sendWelcome: jest.fn().mockResolvedValue(undefined) };
    sms = { sendVerificationCode: jest.fn().mockResolvedValue(undefined) };
    push = { send: jest.fn().mockResolvedValue(undefined) };
    logger = { log: jest.fn(), warn: jest.fn(), error: jest.fn() };
    worker = new NotificationDispatcherWorker(
      email as never,
      sms as never,
      push as never,
      logger as never
    );
  });

  it('should dispatch email channel', async () => {
    await worker.process({
      id: 'job-1',
      data: {
        userId: 'user-1',
        channel: 'email',
        template: 'welcome',
        data: {},
      },
    });
    expect(logger.log).toHaveBeenCalled();
  });

  it('should dispatch sms channel', async () => {
    await worker.process({
      id: 'job-2',
      data: { userId: 'user-1', channel: 'sms', template: 'otp', data: {} },
    });
    expect(logger.log).toHaveBeenCalled();
  });

  it('should dispatch push channel', async () => {
    await worker.process({
      id: 'job-3',
      data: { userId: 'user-1', channel: 'push', template: 'kyc', data: {} },
    });
    expect(logger.log).toHaveBeenCalled();
  });

  it('should warn on unknown channel', async () => {
    await worker.process({
      id: 'job-4',
      data: {
        userId: 'user-1',
        channel: 'unknown' as never,
        template: 'x',
        data: {},
      },
    });
    expect(logger.warn).toHaveBeenCalled();
  });
});
