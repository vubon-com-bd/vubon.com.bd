import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetDigestHandler } from '../../../../src/module/application/queries/digest/get-digest.handler.js';
import { GetDigestQuery } from '../../../../src/module/application/queries/digest/get-digest.query.js';
import { ListDigestsHandler } from '../../../../src/module/application/queries/digest/list-digests.handler.js';
import { ListDigestsQuery } from '../../../../src/module/application/queries/digest/list-digests.query.js';
import { PreviewDigestHandler } from '../../../../src/module/application/queries/digest/preview-digest.handler.js';
import { PreviewDigestQuery } from '../../../../src/module/application/queries/digest/preview-digest.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'd-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    preview: jest.fn().mockResolvedValue({ userId: 'u' }),
  } as never;
}

describe('Digest query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetDigestHandler', async () => {
    await new GetDigestHandler(svc).execute(new GetDigestQuery('d-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListDigestsHandler', async () => {
    await new ListDigestsHandler(svc).execute(new ListDigestsQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
  it('PreviewDigestHandler', async () => {
    await new PreviewDigestHandler(svc).execute(new PreviewDigestQuery({ userId: 'u', frequency: 'daily' } as never));
    expect(svc.preview).toHaveBeenCalled();
  });
});
