import { describe, it, expect } from '@jest/globals';
import { VerifyContactHandler } from '@application/commands/contact/verify-contact.handler.js';
import { VerifyContactCommand } from '@application/commands/contact/verify-contact.command.js';

describe('VerifyContactHandler', () => {
  let handler: VerifyContactHandler;

  beforeEach(() => {
    handler = new VerifyContactHandler();
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.verify-contact');
  });

  it('should return success true with verified true', async () => {
    const command = new VerifyContactCommand('contact-1', '123456');
    const result = await handler.execute(command);
    expect(result).toEqual({ success: true, verified: true });
  });

  it('should return same response for any contact/code', async () => {
    const command = new VerifyContactCommand('any', '999999');
    const result = await handler.execute(command);
    expect(result.success).toBe(true);
    expect(result.verified).toBe(true);
  });
});
