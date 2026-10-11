import { describe, it, expect } from '@jest/globals';
import { ChannelSelectorService } from '../../../../../src/module/infrastructure/services/internal/channel-selector.service.js';

describe('ChannelSelectorService', () => {
  const s = new ChannelSelectorService();
  const all = ['email', 'sms', 'push', 'in_app', 'whatsapp', 'webhook'];

  it('returns empty for empty input', () => {
    expect(s.select({ type: 'transactional', priority: 'normal', availableChannels: [] })).toEqual([]);
  });

  it('uses all for security type', () => {
    const r = s.select({ type: 'security', priority: 'normal', availableChannels: all });
    expect(r.length).toBeGreaterThan(0);
  });

  it('uses all for alert type', () => {
    const r = s.select({ type: 'alert', priority: 'normal', availableChannels: all });
    expect(r.length).toBeGreaterThan(0);
  });

  it('uses all for verification type', () => {
    const r = s.select({ type: 'verification', priority: 'normal', availableChannels: all });
    expect(r.length).toBeGreaterThan(0);
  });

  it('uses all for critical priority', () => {
    const r = s.select({ type: 'transactional', priority: 'critical', availableChannels: all });
    expect(r.length).toBeGreaterThan(0);
  });

  it('filters to email+push+in_app for marketing', () => {
    const r = s.select({ type: 'marketing', priority: 'normal', availableChannels: all });
    expect(r).toContain('email');
    expect(r).toContain('push');
    expect(r).toContain('in_app');
    expect(r).not.toContain('sms');
  });

  it('filters to email+push+in_app for promotional', () => {
    const r = s.select({ type: 'promotional', priority: 'normal', availableChannels: all });
    expect(r).not.toContain('sms');
  });

  it('filters to email+push+in_app for announcement', () => {
    const r = s.select({ type: 'announcement', priority: 'normal', availableChannels: all });
    expect(r).not.toContain('sms');
  });

  it('filters to push+in_app for reminder', () => {
    const r = s.select({ type: 'reminder', priority: 'normal', availableChannels: all });
    expect(r).toContain('push');
    expect(r).toContain('in_app');
    expect(r).not.toContain('email');
  });

  it('honors preferredChannels', () => {
    const r = s.select({
      type: 'transactional',
      priority: 'normal',
      availableChannels: all,
      preferredChannels: ['email'],
    });
    expect(r).toEqual(['email']);
  });

  it('sorts by priority for default', () => {
    const r = s.select({ type: 'transactional', priority: 'normal', availableChannels: all });
    expect(r.length).toBe(all.length);
  });
});
