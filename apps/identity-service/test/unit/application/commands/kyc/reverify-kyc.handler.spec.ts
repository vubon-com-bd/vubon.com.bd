import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ReverifyKycHandler } from '@application/commands/kyc/reverify-kyc.handler.js';
import { ReverifyKycCommand } from '@application/commands/kyc/reverify-kyc.command.js';
import type { UserKycServiceInterface } from '@application/services/interfaces/user-kyc.service.interface.js';
import type { UserKycResponseDTO } from '@application/dtos/responses/user-kyc-response.dto.js';

describe('ReverifyKycHandler', () => {
  let handler: ReverifyKycHandler;
  let mockService: jest.Mocked<UserKycServiceInterface>;

  const kyc: UserKycResponseDTO = {
    id: 'kyc-1', userId: 'u-1', status: 'pending', documents: [],
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    mockService = {
      name: 'UserKycService',
      findForUser: jest.fn(),
      submit: jest.fn(),
      verify: jest.fn(),
      reject: jest.fn(),
    } as unknown as jest.Mocked<UserKycServiceInterface>;
    handler = new ReverifyKycHandler(mockService);
  });

  it('should have correct commandType', () => {
    expect(handler.commandType).toBe('user.reverify-kyc');
  });

  it('should call service.submit with input', async () => {
    mockService.submit.mockResolvedValue(kyc);

    const input = {
      documents: [
        {
          type: 'national_id',
          number: '1234567890',
          frontUrl: 'https://x.com/a.jpg',
        },
      ],
    };

    const result = await handler.execute(new ReverifyKycCommand('u-1', input));

    expect(mockService.submit).toHaveBeenCalledWith('u-1', input);
    expect(result).toEqual(kyc);
  });

  it('should propagate submit error', async () => {
    mockService.submit.mockRejectedValue(new Error('invalid'));

    await expect(
      handler.execute(
        new ReverifyKycCommand('u-1', { documents: [] }),
      ),
    ).rejects.toThrow('invalid');
  });
});
