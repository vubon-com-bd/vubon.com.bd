import { describe, it, expect } from '@jest/globals';
import { BroadcastVO } from '../../../../../src/module/domain/value-objects/composites/broadcast.vo.js';
import { DeviceVO } from '../../../../../src/module/domain/value-objects/composites/device.vo.js';
import { DigestVO } from '../../../../../src/module/domain/value-objects/composites/digest.vo.js';
import { BroadcastIdVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { DeviceIdVO } from '../../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '../../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../../../../../src/module/domain/value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { DigestIdVO } from '../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';

describe('BroadcastVO deeper', () => {
  it('getters + canCancel + totalProcessed', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.draft(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      succeeded: 10,
      failed: 5,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.totalProcessed()).toBe(15);
    expect(vo.canCancel()).toBe(true);
    expect(vo.templateId).toBe(FIXED_TEMPLATE_ID);
  });

  it('canCancel false in sending', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.sending(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      succeeded: 0,
      failed: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.canCancel()).toBe(false);
  });
});

describe('DeviceVO deeper', () => {
  it('all getters', () => {
    const vo = DeviceVO.reconstitute({
      id: DeviceIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      type: DeviceTypeVO.android(),
      status: DeviceStatusVO.active(),
      token: DeviceTokenVO.create('abcdefghijklmnop1234'),
      platform: 'android',
      appVersion: '1.0',
      osVersion: '14',
      lastActiveAt: new Date().toISOString(),
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.canReceivePush()).toBe(true);
    expect(vo.platform).toBe('android');
    expect(vo.appVersion).toBe('1.0');
    expect(vo.isStale(30)).toBe(false);
  });

  it('blocked cannot receive', () => {
    const vo = DeviceVO.reconstitute({
      id: DeviceIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      type: DeviceTypeVO.android(),
      status: DeviceStatusVO.blocked(),
      token: DeviceTokenVO.create('abcdefghijklmnop1234'),
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.canReceivePush()).toBe(false);
  });
});

describe('DigestVO deeper', () => {
  it('all getters + hasItems', () => {
    const vo = DigestVO.reconstitute({
      id: DigestIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      status: DigestStatusVO.pending(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.hasItems()).toBe(true);
    expect(vo.isEmpty()).toBe(false);
  });

  it('sent status with sentAt', () => {
    const vo = DigestVO.reconstitute({
      id: DigestIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      status: DigestStatusVO.sent(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 5,
      sentAt: new Date().toISOString(),
      channel: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.status.isSent()).toBe(true);
  });
});
