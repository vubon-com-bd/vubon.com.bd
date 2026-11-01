import { DigestMapper } from '@application/mappers/digest.mapper.js';
import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function build() {
  const vo = DigestVO.create({
    id: DigestIdVO.create(IDS.digestId),
    userId: UserIdVO.create(IDS.userId),
    status: DigestStatusVO.pending(),
    type: DigestTypeVO.create('summary'),
    period: DigestPeriodVO.create({
      frequency: 'daily',
      periodStart: DATES.dayAgo,
      periodEnd: DATES.now,
    }),
    categories: ['order'],
    sendHour: 9,
    timezone: 'Asia/Dhaka',
    itemCount: 0,
  });
  return DigestEntity.create({
    id: DigestIdVO.create(IDS.digestId),
    vo,
    now: DATES.now,
  });
}

describe('DigestMapper', () => {
  it('toResponse', () => {
    const r = DigestMapper.toResponse(build());
    expect(r.id).toBe(IDS.digestId);
    expect(r.userId).toBe(IDS.userId);
  });

  it('toSummary', () => {
    const r = DigestMapper.toSummary(build());
    expect(r.id).toBe(IDS.digestId);
  });

  it('toListResponse', () => {
    const r = DigestMapper.toListResponse([build()], 2, 1, 10);
    expect(r.totalPages).toBe(1);
  });
});
