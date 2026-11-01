/**
 * Command Fixtures for Application Layer tests
 * @module identity-service/test/fixtures/application
 */
import { LoginCommand } from '@application/commands/auth/login.command.js';
import { RegisterCommand } from '@application/commands/auth/register.command.js';
import { LogoutCommand } from '@application/commands/auth/logout.command.js';
import { EnableMfaCommand } from '@application/commands/auth/enable-mfa.command.js';
import { DisableMfaCommand } from '@application/commands/auth/disable-mfa.command.js';
import { VerifyMfaCommand } from '@application/commands/auth/verify-mfa.command.js';
import { CreateUserCommand } from '@application/commands/user/create-user.command.js';
import { SuspendUserCommand } from '@application/commands/user/suspend-user.command.js';
import { TEST_IDS, TEST_EMAIL, TEST_IP, TEST_USER_AGENT, TEST_PASSWORD_PLAIN } from '../ids.fixture.js';
import {
  makeLoginDTO,
  makeLoginDTOWithMfa,
  makeRegisterDTO,
  makeEnableMfaDTO,
  makeVerifyMfaDTO,
} from './dto.fixtures.js';

export const makeLoginCommand = (
  overrides: { input?: Parameters<typeof makeLoginDTO>[0]; ip?: string; ua?: string } = {},
): LoginCommand =>
  new LoginCommand(
    makeLoginDTO(overrides.input),
    overrides.ip ?? TEST_IP,
    overrides.ua ?? TEST_USER_AGENT,
  );

export const makeLoginWithMfaCommand = (): LoginCommand =>
  new LoginCommand(makeLoginDTOWithMfa(), TEST_IP, TEST_USER_AGENT);

export const makeRegisterCommand = (): RegisterCommand =>
  new RegisterCommand(makeRegisterDTO());

export const makeLogoutCommand = (userId: string = TEST_IDS.USER_ID): LogoutCommand =>
  new LogoutCommand({ sessionId: TEST_IDS.SESSION_ID } as never, userId);

export const makeEnableMfaCommand = (authId: string = TEST_IDS.AUTH_ID): EnableMfaCommand =>
  new EnableMfaCommand(authId, makeEnableMfaDTO());

export const makeDisableMfaCommand = (authId: string = TEST_IDS.AUTH_ID): DisableMfaCommand =>
  new DisableMfaCommand(authId, { password: TEST_PASSWORD_PLAIN } as never);

export const makeVerifyMfaCommand = (): VerifyMfaCommand =>
  new VerifyMfaCommand(makeVerifyMfaDTO());

export const makeCreateUserCommand = (): CreateUserCommand =>
  new CreateUserCommand({
    email: TEST_EMAIL,
    password: TEST_PASSWORD_PLAIN,
    firstName: 'Test',
    lastName: 'User',
    type: 'individual',
    acceptTerms: true,
  } as never);

export const makeSuspendUserCommand = (): SuspendUserCommand =>
  new SuspendUserCommand({ userId: TEST_IDS.USER_ID, reason: 'test_suspend' } as never);
