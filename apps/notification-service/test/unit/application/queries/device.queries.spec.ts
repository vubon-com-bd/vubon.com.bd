import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetDeviceHandler } from '../../../../src/module/application/queries/device/get-device.handler.js';
import { GetDeviceQuery } from '../../../../src/module/application/queries/device/get-device.query.js';
import { ListDevicesHandler } from '../../../../src/module/application/queries/device/list-devices.handler.js';
import { ListDevicesQuery } from '../../../../src/module/application/queries/device/list-devices.query.js';
import { ListActiveDevicesHandler } from '../../../../src/module/application/queries/device/list-active-devices.handler.js';
import { ListActiveDevicesQuery } from '../../../../src/module/application/queries/device/list-active-devices.query.js';

function mockSvc() {
  return {
    getById: jest.fn().mockResolvedValue({ id: 'd-1' }),
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    listActiveByUser: jest.fn().mockResolvedValue([]),
  } as never;
}

describe('Device query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetDeviceHandler', async () => {
    await new GetDeviceHandler(svc).execute(new GetDeviceQuery('d-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('ListDevicesHandler', async () => {
    await new ListDevicesHandler(svc).execute(new ListDevicesQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
  it('ListActiveDevicesHandler', async () => {
    await new ListActiveDevicesHandler(svc).execute(new ListActiveDevicesQuery('u'));
    expect(svc.listActiveByUser).toHaveBeenCalled();
  });
});
