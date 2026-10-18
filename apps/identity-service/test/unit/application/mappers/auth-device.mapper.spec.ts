import { describe, it, expect } from '@jest/globals';
import { AuthDeviceMapper } from '@application/mappers/auth-device.mapper.js';
import { makeDeviceEntity, TEST_IDS } from '@fixtures/index.js';

describe('AuthDeviceMapper', () => {
  it('toDTO() maps fields', () => {
    const device = makeDeviceEntity();
    const dto = AuthDeviceMapper.toDTO(device);
    expect(dto.id).toBe(device.id);
    expect(dto.userId).toBe(TEST_IDS.USER_ID);
    expect(dto.type).toBe(device.type.value);
    expect(dto.isCurrent).toBe(false);
  });

  it('toDTOList() empty', () => {
    expect(AuthDeviceMapper.toDTOList([])).toEqual([]);
  });

  it('toDTOList() maps array', () => {
    const list = AuthDeviceMapper.toDTOList([makeDeviceEntity(), makeDeviceEntity()]);
    expect(list.length).toBe(2);
  });
});
