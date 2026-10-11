import { describe, it, expect } from '@jest/globals';
import { BroadcastEntity } from '../../../../src/module/domain/entities/broadcast.entity.js';
import { DeviceEntity } from '../../../../src/module/domain/entities/device.entity.js';
import { TemplateEntity } from '../../../../src/module/domain/entities/template.entity.js';
import { BroadcastTypeVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastTargetVO } from '../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { DeviceTypeVO } from '../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceTokenVO } from '../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { DeviceStatusVO } from '../../../../src/module/domain/value-objects/primitives/device-status.vo.js';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { NOTIFICATION_BROADCAST, NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';
import { FIXED_USER_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../helpers/test-factories.js';

function buildBroadcast(): BroadcastEntity {
  return BroadcastEntity.create({
    id: makeUuid(),
    now: new Date().toISOString(),
    props: {
      type: BroadcastTypeVO.allUsers(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('BroadcastEntity — remaining branches', () => {
  it('start throws when not draft/scheduled', () => {
    const e = buildBroadcast();
    e.start(100);
    expect(() => e.start(100)).toThrow();
  });

  it('start throws when over MAX', () => {
    const e = buildBroadcast();
    expect(() => e.start(NOTIFICATION_BROADCAST.MAX_RECIPIENTS + 1)).toThrow();
  });

  it('complete throws when not sending', () => {
    const e = buildBroadcast();
    expect(() => e.complete()).toThrow();
  });

  it('partiallyComplete throws when not sending', () => {
    const e = buildBroadcast();
    expect(() => e.partiallyComplete(['x'])).toThrow();
  });

  it('partiallyComplete ok + failureReasons', () => {
    const e = buildBroadcast();
    e.start(100);
    e.recordProgress(100, 80, 20);
    e.partiallyComplete(['a', 'b']);
    expect(e.failureReasons.length).toBe(2);
  });

  it('fail throws when not sending', () => {
    const e = buildBroadcast();
    expect(() => e.fail('reason')).toThrow();
  });

  it('fail ok', () => {
    const e = buildBroadcast();
    e.start(100);
    e.fail('error');
    expect(e.status.value).toBe('failed');
  });

  it('progressPercent 0 when no recipients', () => {
    const e = buildBroadcast();
    expect(e.progressPercent()).toBe(0);
  });

  it('cancel throws from sending', () => {
    const e = buildBroadcast();
    e.start(100);
    expect(() => e.cancel()).toThrow();
  });

  it('cancel ok from draft', () => {
    const e = buildBroadcast();
    e.cancel('u', 'reason');
    expect(e.status.value).toBe('cancelled');
  });

  it('invariant rejects empty templateId', () => {
    expect(() =>
      BroadcastEntity.create({
        id: makeUuid(),
        now: new Date().toISOString(),
        props: {
          type: BroadcastTypeVO.allUsers(),
          target: BroadcastTargetVO.all(),
          templateId: '',
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('invariant rejects negative counts', () => {
    const e = buildBroadcast();
    // Can't directly set, but reconstitute path
    expect(() =>
      BroadcastEntity.reconstitute({
        id: e.id,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
        props: {
          type: e.type,
          status: e.status,
          target: e.target,
          templateId: e.templateId,
          processed: -1,
          succeeded: 0,
          failed: 0,
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });
});

describe('DeviceEntity — remaining branches', () => {
  function build(): DeviceEntity {
    return DeviceEntity.register({
      id: makeUuid(),
      now: new Date().toISOString(),
      props: {
        userId: FIXED_USER_ID,
        type: DeviceTypeVO.android(),
        token: DeviceTokenVO.create('abcdefghijklmnop1234'),
        platform: 'android',
      },
    });
  }

  it('refreshToken throws when terminal', () => {
    const e = build();
    e.block('spam');
    expect(() => e.refreshToken(DeviceTokenVO.create('newtoken0123456789ab'))).toThrow();
  });

  it('refreshToken ok when inactive → activates', () => {
    const e = DeviceEntity.register({
      id: makeUuid(),
      now: new Date().toISOString(),
      props: {
        userId: FIXED_USER_ID,
        type: DeviceTypeVO.android(),
        token: DeviceTokenVO.create('abcdefghijklmnop1234'),
        status: DeviceStatusVO.inactive(),
      },
    });
    e.refreshToken(DeviceTokenVO.create('newtoken0123456789ab'));
    expect(e.isActive()).toBe(true);
  });

  it('markActive activates when inactive', () => {
    const e = DeviceEntity.register({
      id: makeUuid(),
      now: new Date().toISOString(),
      props: {
        userId: FIXED_USER_ID,
        type: DeviceTypeVO.android(),
        token: DeviceTokenVO.create('abcdefghijklmnop1234'),
        status: DeviceStatusVO.inactive(),
      },
    });
    e.markActive();
    expect(e.isActive()).toBe(true);
  });

  it('unregister early-return when already unregistered', () => {
    const e = build();
    e.unregister();
    expect(() => e.unregister()).not.toThrow();
  });

  it('isStale with days 0', () => {
    const e = build();
    expect(typeof e.isStale(0)).toBe('boolean');
  });

  it('updateAppInfo partial', () => {
    const e = build();
    e.updateAppInfo('2.0');
    expect(e.appVersion).toBe('2.0');
    expect(e.osVersion).toBeUndefined();
  });

  it('create alias calls register', () => {
    const e = DeviceEntity.create({
      id: makeUuid(),
      now: new Date().toISOString(),
      props: {
        userId: FIXED_USER_ID,
        type: DeviceTypeVO.android(),
        token: DeviceTokenVO.create('abcdefghijklmnop1234'),
      },
    });
    expect(e.isActive()).toBe(true);
  });
});

describe('TemplateEntity — remaining branches', () => {
  function build(): TemplateEntity {
    return TemplateEntity.create({
      id: FIXED_TEMPLATE_ID,
      now: new Date().toISOString(),
      props: {
        name: TemplateNameVO.create('Test'),
        slug: 't',
        type: TemplateTypeVO.email(),
        category: TemplateCategoryVO.order(),
        locale: TemplateLocaleVO.en(),
        subject: 'S',
        body: 'B',
        variables: [],
        createdBy: FIXED_USER_ID,
      },
    });
  }

  it('create rejects body too large', () => {
    expect(() =>
      TemplateEntity.create({
        id: FIXED_TEMPLATE_ID,
        now: new Date().toISOString(),
        props: {
          name: TemplateNameVO.create('Test'),
          slug: 't',
          type: TemplateTypeVO.email(),
          category: TemplateCategoryVO.order(),
          locale: TemplateLocaleVO.en(),
          subject: 'S',
          body: 'x'.repeat(NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH + 1),
          variables: [],
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('deactivate throws when not active', () => {
    const e = build();
    expect(() => e.deactivate('u')).toThrow();
  });

  it('createVersion bumps', () => {
    const e = build();
    e.createVersion('u');
    expect(e.templateVersion).toBe(2);
  });

  it('createVersion throws at max', () => {
    const e = build();
    for (let i = 0; i < NOTIFICATION_TEMPLATE.MAX_VERSIONS - 1; i++) {
      e.createVersion('u');
    }
    expect(() => e.createVersion('u')).toThrow();
  });

  it('deprecate + archive', () => {
    const e = build();
    e.deprecate('u', 'replacement-id', 'outdated');
    expect(e.isDeprecated()).toBe(true);

    const e2 = build();
    e2.archive('u');
    expect(e2.isArchived()).toBe(true);
  });
});
