import { PreferenceMapper } from '@application/mappers/preference.mapper.js';
import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceMatrixVO } from '@domain/composites/preference-matrix.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build(opts: { quietHours?: boolean; withCategory?: boolean } = {}) {
  const options = [
    PreferenceOptionVO.create({ channel: 'email', enabled: true }),
    ...(opts.withCategory
      ? [PreferenceOptionVO.create({ channel: 'email', category: 'promotion', enabled: false })]
      : []),
  ];
  const vo = PreferenceVO.create({
    id: PreferenceIdVO.create(IDS.preferenceId),
    userId: UserIdVO.create(IDS.userId),
    type: PreferenceTypeVO.create('opt_in'),
    options,
    quietHoursEnabled: opts.quietHours ?? false,
    quietHoursStart: opts.quietHours ? 22 : undefined,
    quietHoursEnd: opts.quietHours ? 8 : undefined,
    timezone: 'Asia/Dhaka',
    locale: 'en',
    locked: false,
  });
  return PreferenceEntity.create({
    id: PreferenceIdVO.create(IDS.preferenceId),
    vo,
    now: DATES.now,
  });
}

describe('PreferenceMapper', () => {
  it('toResponse without quiet hours', () => {
    const r = PreferenceMapper.toResponse(build());
    expect(r.userId).toBe(IDS.userId);
    expect(r.quietHoursEnabled).toBe(false);
  });

  it('toResponse with quiet hours', () => {
    const r = PreferenceMapper.toResponse(build({ quietHours: true }));
    expect(r.quietHoursStart).toBe(22);
    expect(r.quietHoursEnd).toBe(8);
  });

  it('toResponse with category option', () => {
    const r = PreferenceMapper.toResponse(build({ withCategory: true }));
    expect(r.options.length).toBe(2);
    expect(r.options.some(o => o.category === 'promotion')).toBe(true);
  });

  it('toMatrixResponse', () => {
    const r = PreferenceMapper.toMatrixResponse(build({ withCategory: true }));
    expect(r.userId).toBe(IDS.userId);
    expect(r.channels.email).toBe(true);
    expect(r.categories['email:promotion']).toBe(false);
  });

  it('toMatrixResponse with quiet hours', () => {
    const r = PreferenceMapper.toMatrixResponse(build({ quietHours: true }));
    expect(r.quietHours).toBeDefined();
    expect(r.quietHours!.start).toBe(22);
  });

  it('toMatrixResponse without quiet hours', () => {
    const r = PreferenceMapper.toMatrixResponse(build());
    expect(r.quietHours).toBeNull();
  });

  it('matrixVOToResponse', () => {
    const vo = PreferenceMatrixVO.create({
      userId: UserIdVO.create(IDS.userId),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: true })],
      quietHoursEnabled: false,
      timezone: 'Asia/Dhaka',
      locale: 'en',
    });
    const r = PreferenceMapper.matrixVOToResponse(vo);
    expect(r.userId).toBe(IDS.userId);
  });
});
