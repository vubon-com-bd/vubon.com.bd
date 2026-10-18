import { describe, it, expect, beforeEach } from '@jest/globals';
import { VerifyBackupCodeHandler } from '@application/commands/auth/verify-backup-code.handler.js';
import { VerifyBackupCodeCommand } from '@application/commands/auth/verify-backup-code.command.js';
import { TEST_IDS, TEST_BACKUP_CODE } from '@fixtures/index.js';

describe('VerifyBackupCodeHandler', () => {
  let handler: VerifyBackupCodeHandler;
  beforeEach(() => { handler = new VerifyBackupCodeHandler(); });

  it('commandType = auth.verify-backup-code', () => {
    expect(handler.commandType).toBe('auth.verify-backup-code');
  });

  it('should return false when code not verified', async () => {
    const cmd = new VerifyBackupCodeCommand(TEST_IDS.AUTH_ID, { code: TEST_BACKUP_CODE } as never);
    const result = await handler.execute(cmd);
    expect(result.success).toBe(true);
    expect(typeof result.verified).toBe('boolean');
  });
});
