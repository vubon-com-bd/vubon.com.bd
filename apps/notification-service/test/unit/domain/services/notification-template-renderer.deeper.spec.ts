import { describe, it, expect } from '@jest/globals';
import { NotificationTemplateRendererService } from '../../../../src/module/domain/services/notification-template-renderer.service.js';

function makeTemplate(overrides: Record<string, unknown> = {}) {
  return {
    id: 't-1',
    body: 'Hi {{name}}',
    subject: undefined,
    bodyHtml: undefined,
    requiredVariables: () => [],
    variables: [],
    ...overrides,
  } as never;
}

describe('NotificationTemplateRendererService deeper', () => {
  it('renders with declared default fallback', () => {
    const t = makeTemplate({
      body: 'Hi {{name}}',
      variables: [
        { name: { value: 'name' }, hasDefault: () => true, defaultValue: 'Guest' },
      ],
    });
    const r = NotificationTemplateRendererService.render({ template: t, data: {} });
    expect(r.body).toBe('Hi Guest');
  });

  it('renders number/boolean/date values', () => {
    const t = makeTemplate({ body: '{{n}} {{b}}' });
    const r = NotificationTemplateRendererService.render({
      template: t, data: { n: 42, b: true },
    });
    expect(r.body).toBe('42 true');
  });

  it('renders Date values as ISO', () => {
    const t = makeTemplate({ body: '{{d}}' });
    const date = new Date('2026-10-10T00:00:00.000Z');
    const r = NotificationTemplateRendererService.render({
      template: t, data: { d: date },
    });
    expect(r.body).toContain('2026-10-10');
  });

  it('renders object values as JSON', () => {
    const t = makeTemplate({ body: '{{o}}' });
    const r = NotificationTemplateRendererService.render({
      template: t, data: { o: { a: 1 } },
    });
    expect(r.body).toBe('{"a":1}');
  });

  it('assertRendered throws on missing vars', () => {
    const t = makeTemplate({ body: 'Hi {{missing}}' });
    expect(() =>
      NotificationTemplateRendererService.assertRendered({ template: t, data: {} }),
    ).toThrow();
  });

  it('assertRendered returns result when ok', () => {
    const t = makeTemplate({ body: 'Hi {{name}}' });
    const r = NotificationTemplateRendererService.assertRendered({
      template: t, data: { name: 'Rahim' },
    });
    expect(r.body).toBe('Hi Rahim');
  });

  it('renders null value as empty', () => {
    const t = makeTemplate({ body: 'Hi {{x}}' });
    const r = NotificationTemplateRendererService.render({
      template: t, data: { x: null },
    });
    expect(r.body).toBe('Hi ');
  });

  it('renders undefined value as empty', () => {
    const t = makeTemplate({ body: 'Hi {{x}}' });
    const r = NotificationTemplateRendererService.render({
      template: t, data: { x: undefined },
    });
    expect(r.body).toBe('Hi ');
  });
});
