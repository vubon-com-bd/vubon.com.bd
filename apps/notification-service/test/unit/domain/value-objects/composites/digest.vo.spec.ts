import { describe, it, expect } from '@jest/globals';
import { DigestVO } from '../../../../../src/module/domain/value-objects/composites/digest.vo.js';
import { DigestIdVO } from '../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: DigestIdVO.create(makeUuid()),
    userId: FIXED_USER_ID,
    frequency: DigestFrequencyVO.daily(),
    type: DigestTypeVO.summary(),
    status: DigestStatusVO.pending(),
    periodStart: new Date(Date.now() - 86_400_000).toISOString(),
    periodEnd: new Date().toISOString(),
    itemCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('DigestVO', () => {
  it('create valid', () => {
    const vo = DigestVO.create(buildProps());
    expect(vo.isEmpty()).toBe(true);
  });
  it('rejects periodEnd <= periodStart', () => {
    const now = new Date().toISOString();
    expect(() =>
      DigestVO.create(buildProps({ periodStart: now, periodEnd: now })),
    ).toThrow();
  });
  it('rejects negative itemCount', () => {
    expect(() => DigestVO.create(buildProps({ itemCount: -1 }))).toThrow();
  });
  it('sent requires sentAt', () => {
    expect(() =>
      DigestVO.create(buildProps({ status: DigestStatusVO.sent() })),
    ).toThrow();
  });
  it('hasItems', () => {
    const vo = DigestVO.reconstitute(buildProps({ itemCount: 5 }));
    expect(vo.hasItems()).toBe(true);
  });
  it('reconstitute', () => {
    const vo = DigestVO.reconstitute(buildProps());
    expect(vo.userId).toBe(FIXED_USER_ID);
  });
});
