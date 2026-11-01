/**
 * Mappers — every possible null + value branch
 * @module notification-service/test/unit/infrastructure/persistence/prisma
 */
import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { TemplatePrismaMapper } from '@infrastructure/persistence/prisma/mappers/template.prisma.mapper.js';
import { NotificationRecipientPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-recipient.prisma.mapper.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaTemplate,
} from '@test-infra/index.js';

describe('NotificationPrismaMapper — every field null-vs-set', () => {
  // Every optional field — null branch + set branch = 2 branches each
  const pairs: Array<{ field: string; valid: unknown }> = [
    { field: 'imageUrl', valid: 'https://x.test/i.png' },
    { field: 'iconUrl', valid: 'https://x.test/ic.png' },
    { field: 'actionUrl', valid: 'https://x.test/a' },
    { field: 'provider', valid: 'sendgrid' },
    { field: 'providerMessageId', valid: 'msg-1' },
    { field: 'failureReason', valid: 'err' },
    { field: 'failureCode', valid: 'E1' },
    { field: 'metadata', valid: { foo: 'bar' } },
  ];

  for (const { field, valid } of pairs) {
    it(`${field} — null branch`, () => {
      const row = makePrismaNotification({ [field]: null });
      expect(() => NotificationPrismaMapper.toDomain(row)).not.toThrow();
    });
    it(`${field} — set branch`, () => {
      const row = makePrismaNotification({ [field]: valid });
      expect(() => NotificationPrismaMapper.toDomain(row)).not.toThrow();
    });
  }

  const datePairs = ['sentAt', 'deliveredAt', 'scheduledAt', 'expiresAt', 'cancelledAt'] as const;
  for (const field of datePairs) {
    it(`${field} — null`, () => {
      const row = makePrismaNotification({ [field]: null });
      NotificationPrismaMapper.toDomain(row);
    });
    it(`${field} — set`, () => {
      const row = makePrismaNotification({ [field]: new Date('2026-01-15') });
      NotificationPrismaMapper.toDomain(row);
    });
  }
});

describe('NotificationRecipientPrismaMapper — every destination type', () => {
  it('email only', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'email', email: 'a@b.com' },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.email).toBeDefined();
  });
  it('phone only', () => {
    const row = makePrismaNotification({
      recipient: { userId: TEST_IDS.USER, channel: 'sms', phone: '+8801712345678' },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.phone).toBeDefined();
  });
  it('deviceToken only', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER, channel: 'push',
        deviceToken: 'fcm_token_abcdefghijklmnopqrstuvwxyz12345',
      },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.deviceToken).toBeDefined();
  });
  it('webhookUrl only', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER, channel: 'webhook',
        webhookUrl: 'https://example.com/hook',
      },
    });
    expect(NotificationRecipientPrismaMapper.toDomain(row)?.recipient.webhookUrl).toBeDefined();
  });
  it('all destinations', () => {
    const row = makePrismaNotification({
      recipient: {
        userId: TEST_IDS.USER, channel: 'email',
        email: 'a@b.com', phone: '+8801712345678',
        deviceToken: 'fcm_token_abcdefghijklmnopqrstuvwxyz12345',
        webhookUrl: 'https://x.test/hook',
      },
    });
    const r = NotificationRecipientPrismaMapper.toDomain(row)?.recipient;
    expect(r?.email).toBeDefined();
    expect(r?.phone).toBeDefined();
    expect(r?.deviceToken).toBeDefined();
    expect(r?.webhookUrl).toBeDefined();
  });
});

describe('TemplatePrismaMapper — every field null-vs-set', () => {
  it('subject null', () => {
    const row = makePrismaTemplate({ subject: null, type: 'system' });
    expect(TemplatePrismaMapper.toDomain(row).vo.subject).toBeUndefined();
  });
  it('subject set', () => {
    const row = makePrismaTemplate({ subject: 'Hello' });
    expect(TemplatePrismaMapper.toDomain(row).vo.subject).toBeDefined();
  });
  it('bodyHtml null → text', () => {
    const row = makePrismaTemplate({ bodyHtml: null });
    expect(TemplatePrismaMapper.toDomain(row).vo.format.value).toBe('text');
  });
  it('bodyHtml set → html', () => {
    const row = makePrismaTemplate({ bodyHtml: '<p>h</p>' });
    expect(TemplatePrismaMapper.toDomain(row).vo.format.value).toBe('html');
  });
  it('variables empty', () => {
    const row = makePrismaTemplate({ variables: [] });
    expect(TemplatePrismaMapper.toDomain(row).vo.variables.length).toBe(0);
  });
  it('variables single', () => {
    const row = makePrismaTemplate({ variables: [{ name: 'x', type: 'string', required: true }] });
    expect(TemplatePrismaMapper.toDomain(row).vo.variables.length).toBe(1);
  });
  it('variables null', () => {
    const row = makePrismaTemplate({ variables: null });
    expect(TemplatePrismaMapper.toDomain(row).vo.variables.length).toBe(0);
  });
});
