/**
 * GetUserKycStatusHandler — Unit Tests
 */
import { GetUserKycStatusHandler } from './get-user-kyc-status.handler';
import { GetUserKycStatusQuery } from './get-user-kyc-status.query';
import { UserKycEntity } from '../../../domain/entities/user-kyc.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildKyc = () =>
  UserKycEntity.create({
    id: 'kyc-1',
    userId: 'user-1' as never,
    status: 'pending',
    documentType: 'nid',
    documentNumber: '1234567890',
    createdAt: NOW,
    updatedAt: NOW,
  });

const mockRepo = () => ({ findByUserId: jest.fn() });

describe('GetUserKycStatusHandler', () => {
  let handler: GetUserKycStatusHandler;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    handler = new GetUserKycStatusHandler(repo as never);
  });

  it('should have correct queryType', () => {
    expect(handler.queryType).toBe('GetUserKycStatusQuery');
  });

  it('should return null when no KYC', async () => {
    repo.findByUserId.mockResolvedValue(null);
    const query = new GetUserKycStatusQuery('user-1' as never);

    const result = await handler.execute(query);
    expect(result).toBeNull();
  });

  it('should return masked document number', async () => {
    repo.findByUserId.mockResolvedValue(buildKyc());
    const query = new GetUserKycStatusQuery('user-1' as never);

    const result = await handler.execute(query);

    expect(result?.status).toBe('pending');
    expect(result?.documentNumberMasked).toBe('****7890');
    expect(result?.documentNumberMasked).not.toBe('1234567890');
  });
});
