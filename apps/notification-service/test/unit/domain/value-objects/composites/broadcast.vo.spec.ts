import { describe, it, expect } from '@jest/globals';
import { BroadcastVO } from '../../../../../src/module/domain/value-objects/composites/broadcast.vo.js';
import { BroadcastIdVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: BroadcastIdVO.create(makeUuid()),
    type: BroadcastTypeVO.allUsers(),
    status: BroadcastStatusVO.draft(),
    target: BroadcastTargetVO.all(),
    templateId: FIXED_TEMPLATE_ID,
    succeeded: 0,
    failed: 0,
    createdBy: FIXED_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('BroadcastVO', () => {
  it('create valid', () => {
    const vo = BroadcastVO.create(buildProps());
    expect(vo.canCancel()).toBe(true);
  });
  it('requires templateId', () => {
    expect(() => BroadcastVO.create(buildProps({ templateId: '' }))).toThrow();
  });
  it('rejects negative succeeded', () => {
    expect(() => BroadcastVO.create(buildProps({ succeeded: -1 }))).toThrow();
  });
  it('rejects negative failed', () => {
    expect(() => BroadcastVO.create(buildProps({ failed: -1 }))).toThrow();
  });
  it('totalProcessed sums succeeded+failed', () => {
    const vo = BroadcastVO.reconstitute(buildProps({ succeeded: 10, failed: 5 }));
    expect(vo.totalProcessed()).toBe(15);
  });
  it('canCancel false when sending', () => {
    const vo = BroadcastVO.reconstitute(buildProps({ status: BroadcastStatusVO.sending() }));
    expect(vo.canCancel()).toBe(false);
  });
  it('reconstitute', () => {
    const vo = BroadcastVO.reconstitute(buildProps());
    expect(vo.templateId).toBe(FIXED_TEMPLATE_ID);
  });
});
