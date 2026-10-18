import { describe, it, expect, beforeEach } from '@jest/globals';
import { LinkSocialHandler } from '@application/commands/auth/link-social.handler.js';
import { LinkSocialCommand } from '@application/commands/auth/link-social.command.js';
import { TEST_IDS } from '@fixtures/index.js';

describe('LinkSocialHandler', () => {
  let handler: LinkSocialHandler;
  beforeEach(() => { handler = new LinkSocialHandler(); });

  it('commandType = auth.link-social', () => {
    expect(handler.commandType).toBe('auth.link-social');
  });

  it('should return linked true', async () => {
    const cmd = new LinkSocialCommand(TEST_IDS.AUTH_ID, { provider: 'google', code: 'x', redirectUri: 'y' } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(result.linked).toBe(true);
  });
});
