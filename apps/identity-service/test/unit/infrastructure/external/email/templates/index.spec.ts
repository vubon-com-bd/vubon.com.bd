import { describe, it, expect } from '@jest/globals';
import * as Templates from '@infrastructure/external/email/templates/index.js';

describe('Templates barrel', () => {
  it('exports all templates', () => {
    expect(Templates).toHaveProperty('WelcomeTemplate');
    expect(Templates).toHaveProperty('VerificationTemplate');
    expect(Templates).toHaveProperty('PasswordResetTemplate');
    expect(Templates).toHaveProperty('MfaCodeTemplate');
    expect(Templates).toHaveProperty('RecoveryCodeTemplate');
    expect(Templates).toHaveProperty('AccountLockTemplate');
    expect(Templates).toHaveProperty('DeviceLoginTemplate');
  });

  it('exports BaseTemplate', () => {
    expect(Templates).toHaveProperty('BaseTemplate');
  });
});
