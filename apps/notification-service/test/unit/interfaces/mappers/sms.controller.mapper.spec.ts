import { describe, it, expect } from '@jest/globals';
import { SmsControllerMapper } from '../../../../src/module/interfaces/mappers/sms.controller.mapper.js';

describe('SmsControllerMapper', () => {
  it('toSendAppDto', () => {
    const dto = SmsControllerMapper.toSendAppDto({
      to: '+8801712345678', message: 'M', type: 'transactional',
      senderId: 'VUBON', provider: 'twilio', templateId: 't-1',
      templateData: { k: 'v' }, idempotencyKey: 'idem-12345678',
    } as never);
    expect(dto.message).toBe('M');
    expect(dto.type).toBe('transactional');
  });

  it('toSendAppDto minimal', () => {
    const dto = SmsControllerMapper.toSendAppDto({ to: 'x', message: 'M' } as never);
    expect(dto.to).toBe('x');
  });

  it('toBulkAppDto', () => {
    const dto = SmsControllerMapper.toBulkAppDto({
      recipients: ['a', 'b'], message: 'M', type: 'promotional',
    } as never);
    expect(dto.recipients.length).toBe(2);
  });

  it('toListAppDto defaults', () => {
    const o = SmsControllerMapper.toListAppDto({} as never);
    expect(o.page).toBe(1);
    expect(o.limit).toBe(20);
  });

  it('toListAppDto with filter', () => {
    const o = SmsControllerMapper.toListAppDto({
      to: '+88017', status: 'sent', provider: 'twilio', type: 'transactional',
    } as never);
    expect(o.filter?.to).toBeDefined();
    expect(o.filter?.provider).toBe('twilio');
  });
});
