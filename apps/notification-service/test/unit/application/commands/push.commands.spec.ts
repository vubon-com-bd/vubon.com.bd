import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SendPushHandler } from '../../../../src/module/application/commands/push/send-push.handler.js';
import { SendPushCommand } from '../../../../src/module/application/commands/push/send-push.command.js';
import { SendPushToTopicHandler } from '../../../../src/module/application/commands/push/send-push-to-topic.handler.js';
import { SendPushToTopicCommand } from '../../../../src/module/application/commands/push/send-push-to-topic.command.js';
import { SubscribePushHandler } from '../../../../src/module/application/commands/push/subscribe-push.handler.js';
import { SubscribePushCommand } from '../../../../src/module/application/commands/push/subscribe-push.command.js';
import { UnsubscribePushHandler } from '../../../../src/module/application/commands/push/unsubscribe-push.handler.js';
import { UnsubscribePushCommand } from '../../../../src/module/application/commands/push/unsubscribe-push.command.js';
import { RetryPushHandler } from '../../../../src/module/application/commands/push/retry-push.handler.js';
import { RetryPushCommand } from '../../../../src/module/application/commands/push/retry-push.command.js';

function mockSvc() {
  return {
    send: jest.fn().mockResolvedValue({ success: true, successCount: 1, failureCount: 0 }),
    sendToTopic: jest.fn().mockResolvedValue({ success: true, successCount: 1, failureCount: 0 }),
    subscribe: jest.fn().mockResolvedValue(undefined),
    unsubscribe: jest.fn().mockResolvedValue(undefined),
    retry: jest.fn().mockResolvedValue({ success: true, successCount: 1, failureCount: 0 }),
  } as never;
}

describe('Push command handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });

  it('SendPushHandler', async () => {
    await new SendPushHandler(svc).execute(new SendPushCommand({
      tokens: ['tk'], title: 'T', body: 'B',
    } as never, 'a'));
    expect(svc.send).toHaveBeenCalled();
  });
  it('SendPushToTopicHandler', async () => {
    await new SendPushToTopicHandler(svc).execute(new SendPushToTopicCommand({
      topic: 'x', title: 'T', body: 'B',
    } as never, 'a'));
    expect(svc.sendToTopic).toHaveBeenCalled();
  });
  it('SubscribePushHandler', async () => {
    await new SubscribePushHandler(svc).execute(new SubscribePushCommand({
      userId: 'u', token: 'tk', platform: 'android',
    } as never));
    expect(svc.subscribe).toHaveBeenCalled();
  });
  it('UnsubscribePushHandler', async () => {
    await new UnsubscribePushHandler(svc).execute(new UnsubscribePushCommand('tk', 'a'));
    expect(svc.unsubscribe).toHaveBeenCalled();
  });
  it('RetryPushHandler', async () => {
    await new RetryPushHandler(svc).execute(new RetryPushCommand('p-1', 'a'));
    expect(svc.retry).toHaveBeenCalled();
  });
});
