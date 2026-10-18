import { describe, it, expect, beforeEach } from '@jest/globals';
import { UnlinkSocialHandler } from '@application/commands/auth/unlink-social.handler.js';
import { UnlinkSocialCommand } from '@application/commands/auth/unlink-social.command.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('UnlinkSocialHandler', () => {
  let handler: UnlinkSocialHandler;
  beforeEach(() => { handler = new UnlinkSocialHandler(); });

  it('commandType = auth.unlink-social', () => {
    expect(handler.commandType).toBe('auth.unlink-social');
  });

  it('should return unlinked true', async () => {
    const cmd = new UnlinkSocialCommand(TEST_IDS.AUTH_ID, { provider: 'google' } as never);
    const result = await handler.execute(cmd);
    expect(result.unlinked).toBe(true);
  });
});
