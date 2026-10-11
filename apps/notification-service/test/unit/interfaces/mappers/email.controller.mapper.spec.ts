import { describe, it, expect } from '@jest/globals';
import { EmailControllerMapper } from '../../../../src/module/interfaces/mappers/email.controller.mapper.js';

describe('EmailControllerMapper', () => {
  it('toSendAppDto full', () => {
    const dto = EmailControllerMapper.toSendAppDto({
      to: 'x@y.com',
      cc: ['a@b.com'],
      bcc: ['c@d.com'],
      from: 'f@x.com',
      replyTo: 'r@x.com',
      subject: 'S',
      text: 'T',
      html: '<p>H</p>',
      templateId: 't-1',
      templateData: { k: 'v' },
      attachments: [],
      headers: { 'X-Test': 'y' },
      priority: 'high',
      idempotencyKey: 'idem-12345678',
    } as never);
    expect(dto.subject).toBe('S');
    expect(dto.cc?.length).toBe(1);
  });

  it('toSendAppDto minimal', () => {
    const dto = EmailControllerMapper.toSendAppDto({
      to: 'x@y.com',
      subject: 'S',
    } as never);
    expect(dto.to).toBe('x@y.com');
  });

  it('toSendWithTemplateAppDto', () => {
    const dto = EmailControllerMapper.toSendWithTemplateAppDto({
      to: 'x@y.com',
      templateSlug: 'welcome',
      templateData: { name: 'x' },
    } as never);
    expect(dto.templateSlug).toBe('welcome');
  });

  it('toListAppDto defaults', () => {
    const o = EmailControllerMapper.toListAppDto({} as never);
    expect(o.page).toBe(1);
    expect(o.limit).toBe(20);
  });

  it('toListAppDto with filter', () => {
    const o = EmailControllerMapper.toListAppDto({
      page: 3, limit: 30, to: 'x@y.com', status: 'sent', provider: 'sendgrid',
      fromDate: '2026-01-01', toDate: '2026-12-31',
    } as never);
    expect(o.filter?.to).toBe('x@y.com');
    expect(o.filter?.status).toBe('sent');
  });
});
