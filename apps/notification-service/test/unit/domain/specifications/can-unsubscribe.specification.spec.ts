import { CanUnsubscribeSpecification } from '@domain/specifications/can-unsubscribe.specification.js';
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const opt = (ch: string, en = true) =>
  PreferenceOptionVO.create({ channel: ch as any, enabled: en });

const make = (o: any = {}) =>
  PreferenceEntity.reconstitute({
    id: IDS.preferenceId, createdAt: NOW, updatedAt: NOW,
    props: {
      vo: PreferenceVO.create({
        id: PreferenceIdVO.create(IDS.preferenceId),
        userId: UserIdVO.create(IDS.userId),
        type: PreferenceTypeVO.create('channel_specific'),
        options: [opt('email', true), opt('sms', true)],
        quietHoursEnabled: false,
        timezone: 'UTC', locale: 'en', locked: false,
        ...o,
      }),
    },
  });

describe('CanUnsubscribeSpecification', () => {
  const spec = CanUnsubscribeSpecification.strict();

  it('satisfied for unlocked channel', () => {
    expect(spec.isSatisfiedBy({ preference: make(), ctx: { channel: 'email' } })).toBe(true);
  });

  it('not satisfied when locked', () => {
    const p = make({ locked: true });
    expect(spec.isSatisfiedBy({ preference: p, ctx: { channel: 'email' } })).toBe(false);
  });

  it('not satisfied for protected category (auth)', () => {
    expect(
      spec.isSatisfiedBy({ preference: make(), ctx: { channel: 'email', category: 'auth' } }),
    ).toBe(false);
  });

  it('not satisfied for protected category (security)', () => {
    expect(
      spec.isSatisfiedBy({ preference: make(), ctx: { channel: 'email', category: 'security' } }),
    ).toBe(false);
  });

  it('not satisfied for protected category (system)', () => {
    expect(
      spec.isSatisfiedBy({ preference: make(), ctx: { channel: 'email', category: 'system' } }),
    ).toBe(false);
  });

  it('not satisfied when already unsubscribed', () => {
    const p = make({ options: [opt('email', false)] });
    expect(spec.isSatisfiedBy({ preference: p, ctx: { channel: 'email' } })).toBe(false);
  });
});
