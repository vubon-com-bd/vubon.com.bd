import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('DeviceIdVO', () => {
  it('creates valid UUID', () => {
    expect(DeviceIdVO.create(IDS.deviceId).value).toBe(IDS.deviceId);
  });
  it('rejects empty', () => {
    expect(() => DeviceIdVO.create('')).toThrow(ValidationError);
  });
  it('rejects invalid format', () => {
    expect(() => DeviceIdVO.create('device-1')).toThrow(ValidationError);
  });
});
