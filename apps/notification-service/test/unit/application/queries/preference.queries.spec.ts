import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetPreferenceHandler } from '../../../../src/module/application/queries/preference/get-preference.handler.js';
import { GetPreferenceQuery } from '../../../../src/module/application/queries/preference/get-preference.query.js';
import { GetPreferencePublicHandler } from '../../../../src/module/application/queries/preference/get-preference-public.handler.js';
import { GetPreferencePublicQuery } from '../../../../src/module/application/queries/preference/get-preference-public.query.js';

function mockSvc() {
  return {
    getOrCreate: jest.fn().mockResolvedValue({ userId: 'u' }),
    getPublic: jest.fn().mockResolvedValue({ userId: 'u' }),
  } as never;
}

describe('Preference query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetPreferenceHandler', async () => {
    await new GetPreferenceHandler(svc).execute(new GetPreferenceQuery('u'));
    expect(svc.getOrCreate).toHaveBeenCalled();
  });
  it('GetPreferencePublicHandler', async () => {
    await new GetPreferencePublicHandler(svc).execute(new GetPreferencePublicQuery('u'));
    expect(svc.getPublic).toHaveBeenCalled();
  });
});
