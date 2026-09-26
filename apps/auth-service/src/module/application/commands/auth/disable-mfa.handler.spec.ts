/**
 * DisableMfaHandler — Unit Tests
 */
import { DisableMfaHandler } from './disable-mfa.handler';
import { DisableMfaCommand } from './disable-mfa.command';

const mockMfaService = () => ({
  name: 'AuthMfaService',
  disable: jest.fn(),
});

describe('DisableMfaHandler', () => {
  let handler: DisableMfaHandler;
  let mfaService: ReturnType<typeof mockMfaService>;

  beforeEach(() => {
    mfaService = mockMfaService();
    handler = new DisableMfaHandler(mfaService as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('DisableMfaCommand');
  });

  it('should delegate disable', async () => {
    mfaService.disable.mockResolvedValue(undefined);
    const command = new DisableMfaCommand('user-1' as never, {
      password: 'x',
    } as never);

    await handler.execute(command);

    expect(mfaService.disable).toHaveBeenCalledWith('user-1', command.input);
  });
});
