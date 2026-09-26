/**
 * SubmitKycHandler — Unit Tests
 */
import { SubmitKycHandler } from './submit-kyc.handler';
import { SubmitKycCommand } from './submit-kyc.command';

const mockService = () => ({ submit: jest.fn(), toResponse: jest.fn() });

describe('SubmitKycHandler', () => {
  let handler: SubmitKycHandler;
  let service: ReturnType<typeof mockService>;

  beforeEach(() => {
    service = mockService();
    handler = new SubmitKycHandler(service as never);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('SubmitKycCommand');
  });

  it('should delegate submit', async () => {
    service.submit.mockResolvedValue({ id: 'kyc-1' });
    service.toResponse.mockReturnValue({ id: 'kyc-1' });

    const command = new SubmitKycCommand('user-1' as never, {} as never);
    const result = await handler.execute(command);

    expect(service.submit).toHaveBeenCalledWith('user-1', command.input);
    expect(result.id).toBe('kyc-1');
  });
});
