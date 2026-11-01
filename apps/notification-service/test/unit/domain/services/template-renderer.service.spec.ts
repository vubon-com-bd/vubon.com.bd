import { TemplateRendererService } from '@domain/services/template-renderer.service.js';

describe('TemplateRendererService', () => {
  describe('render()', () => {
    it('replaces simple variable', () => {
      const result = TemplateRendererService.render({
        template: 'Hello {{name}}!',
        data: { name: 'World' },
      });
      expect(result.output).toBe('Hello World!');
    });

    it('replaces multiple variables', () => {
      const result = TemplateRendererService.render({
        template: 'Hi {{name}}, order {{orderId}}',
        data: { name: 'Rahim', orderId: 'ORD-1' },
      });
      expect(result.output).toBe('Hi Rahim, order ORD-1');
    });

    it('handles whitespace in braces', () => {
      const result = TemplateRendererService.render({
        template: 'Hi {{ name }}',
        data: { name: 'X' },
      });
      expect(result.output).toBe('Hi X');
    });

    it('returns missing variables list', () => {
      const result = TemplateRendererService.render({
        template: 'Hi {{name}} {{missing}}',
        data: { name: 'X' },
      });
      expect(result.missingVariables).toContain('missing');
      expect(result.output).toBe('Hi X ');
    });

    it('resolves nested paths', () => {
      const result = TemplateRendererService.render({
        template: 'Hi {{user.name}}',
        data: { user: { name: 'Rahim' } },
      });
      expect(result.output).toBe('Hi Rahim');
    });

    it('escapes HTML when requested', () => {
      const result = TemplateRendererService.render({
        template: 'Hi {{name}}',
        data: { name: '<script>alert(1)</script>' },
        escapeHtml: true,
      });
      expect(result.output).not.toContain('<script>');
      expect(result.output).toContain('&lt;');
    });

    it('preserves raw triple-brace placeholders', () => {
      const result = TemplateRendererService.render({
        template: '{{{html}}}',
        data: { html: '<b>Bold</b>' },
        escapeHtml: true,
      });
      expect(result.output).toContain('<b>');
    });

    it('throws on non-string template', () => {
      expect(() =>
        TemplateRendererService.render({ template: 123 as any, data: {} }),
      ).toThrow();
    });
  });

  describe('extractVariables()', () => {
    it('returns unique variable names', () => {
      const vars = TemplateRendererService.extractVariables('{{a}} {{b}} {{a}}');
      expect(vars).toEqual(['a', 'b']);
    });

    it('returns empty for no variables', () => {
      expect(TemplateRendererService.extractVariables('hello')).toEqual([]);
    });
  });
});
