/**
 * NotificationTemplateRendererService — {{var}} interpolation
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationTemplateRendererService } from '../../../../src/module/domain/services/notification-template-renderer.service.js';

function buildFakeTemplate(overrides: Record<string, unknown> = {}) {
  return {
    id: 'test-template',
    body: 'Hello {{name}}, order #{{orderNumber}}',
    subject: 'Order #{{orderNumber}}',
    bodyHtml: undefined,
    requiredVariables: () => [],
    variables: [],
    ...overrides,
  } as never;
}

describe('NotificationTemplateRendererService', () => {
  it('should replace {{var}} with value', () => {
    const template = buildFakeTemplate();
    const result = NotificationTemplateRendererService.render({
      template,
      data: { name: 'Rahim', orderNumber: '12345' },
    });
    expect(result.body).toBe('Hello Rahim, order #12345');
    expect(result.subject).toBe('Order #12345');
  });

  it('should support {{var:fallback}} syntax', () => {
    const template = buildFakeTemplate({
      body: 'Hi {{name:Guest}}, code {{code:N/A}}',
    });
    const result = NotificationTemplateRendererService.render({
      template,
      data: {},
    });
    expect(result.body).toBe('Hi Guest, code N/A');
  });

  it('should track missing variables', () => {
    const template = buildFakeTemplate({
      body: 'Hi {{missingVar}}',
    });
    const result = NotificationTemplateRendererService.render({
      template,
      data: {},
    });
    expect(result.missingVariables).toContain('missingVar');
  });

  it('should throw when required variables are missing', () => {
    const template = buildFakeTemplate({
      requiredVariables: () => [
        { name: { value: 'orderNumber' }, hasDefault: () => false },
      ],
    });
    expect(() =>
      NotificationTemplateRendererService.render({
        template,
        data: {},
      }),
    ).toThrow();
  });

  it('should render bodyHtml when present', () => {
    const template = buildFakeTemplate({
      bodyHtml: '<p>Hi {{name}}</p>',
    });
    const result = NotificationTemplateRendererService.render({
      template,
      data: { name: 'Rahim', orderNumber: '12345' },
    });
    expect(result.bodyHtml).toBe('<p>Hi Rahim</p>');
  });
});
