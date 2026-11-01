/**
 * Template Render E2E
 * @module notification-service/test/e2e/infrastructure
 */
import { TemplateEngineService } from '@infrastructure/template-engine/template.service.js';
import { HandlebarsEngine } from '@infrastructure/template-engine/engines/handlebars.engine.js';
import { MustacheEngine } from '@infrastructure/template-engine/engines/mustache.engine.js';
import { EjsEngine } from '@infrastructure/template-engine/engines/ejs.engine.js';
import { MjmlEngine } from '@infrastructure/template-engine/engines/mjml.engine.js';

describe('Template Render E2E', () => {
  let service: TemplateEngineService;

  beforeEach(() => {
    service = new TemplateEngineService(
      new HandlebarsEngine(),
      new MustacheEngine(),
      new EjsEngine(),
      new MjmlEngine(),
    );
  });

  it('renders handlebars template', async () => {
    const result = await service.render({
      template: 'Hello {{name}}, your order {{orderId}} is confirmed',
      context: { name: 'Alice', orderId: 'ORD-123' },
    });
    expect(result.output).toContain('Alice');
    expect(result.output).toContain('ORD-123');
    expect(result.engine).toBe('handlebars');
  });

  it('renders EJS template with loop-like syntax', async () => {
    const result = await service.render({
      template: 'Hello <%= user.name %>',
      context: { user: { name: 'Bob' } },
      engine: 'ejs',
    });
    expect(result.output).toContain('Bob');
    expect(result.engine).toBe('ejs');
  });

  it('validates template syntax', () => {
    const result = service.validate({
      template: 'Hello {{name}}',
      context: {},
    });
    expect(result.valid).toBe(true);
  });

  it('detects missing variables', async () => {
    const result = await service.render({
      template: 'Hello {{name}} from {{city}}',
      context: { name: 'Alice' },
    });
    expect(result.missingVariables).toContain('city');
  });
});
