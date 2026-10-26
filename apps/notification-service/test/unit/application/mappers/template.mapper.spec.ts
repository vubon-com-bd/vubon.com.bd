import { TemplateMapper } from '@application/mappers/template.mapper.js';
import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

function buildTemplate(opts: { withSubject?: boolean; type?: 'transactional' | 'system' } = {}) {
  const type = opts.type ?? 'system';
  const typeVO =
    type === 'transactional'
      ? NotificationTypeVO.transactional()
      : NotificationTypeVO.system();

  const vo = TemplateVO.create({
    id: TemplateIdVO.create(IDS.templateId),
    name: TemplateNameVO.create('Welcome Email'),
    slug: 'welcome-email',
    type: typeVO,
    status: 'draft',
    format: TemplateFormatVO.html(),
    subject: opts.withSubject ? TemplateContentVO.create('Hi {{name}}') : undefined,
    body: TemplateContentVO.create('Hello {{name}}'),
    variables: [
      TemplateVariableVO.create({ name: 'name', type: 'string', required: true }),
    ],
    locale: 'en',
    version: 1,
  });
  return TemplateEntity.create({ id: TemplateIdVO.create(IDS.templateId), vo, now: DATES.now });
}

describe('TemplateMapper', () => {
  it('toResponse with subject (transactional)', () => {
    const r = TemplateMapper.toResponse(buildTemplate({ withSubject: true, type: 'transactional' }));
    expect(r.id).toBe(IDS.templateId);
    expect(r.subject).toBe('Hi {{name}}');
  });

  it('toResponse without subject (system type)', () => {
    const r = TemplateMapper.toResponse(buildTemplate({ withSubject: false, type: 'system' }));
    expect(r.subject).toBeUndefined();
  });

  it('toSummary', () => {
    const r = TemplateMapper.toSummary(buildTemplate({ type: 'system' }));
    expect(r.id).toBe(IDS.templateId);
  });

  it('toListResponse', () => {
    const r = TemplateMapper.toListResponse([buildTemplate({ type: 'system' })], 5, 1, 2);
    expect(r.totalPages).toBe(3);
  });
});
