/**
 * Template Engine — Unit Tests
 * @module notification-service/test/unit/infrastructure/template-engine
 *
 * Covers: 4 engines, 3 partials, 3 helpers, template service
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { HandlebarsEngine } from '@infrastructure/template-engine/engines/handlebars.engine.js';
import { MustacheEngine } from '@infrastructure/template-engine/engines/mustache.engine.js';
import { EjsEngine } from '@infrastructure/template-engine/engines/ejs.engine.js';
import { MjmlEngine } from '@infrastructure/template-engine/engines/mjml.engine.js';

import { HeaderPartial } from '@infrastructure/template-engine/partials/header.partial.js';
import { FooterPartial } from '@infrastructure/template-engine/partials/footer.partial.js';
import { ButtonPartial } from '@infrastructure/template-engine/partials/button.partial.js';

import { FormatCurrencyHelper } from '@infrastructure/template-engine/helpers/format-currency.helper.js';
import { FormatDateHelper } from '@infrastructure/template-engine/helpers/format-date.helper.js';
import { ConditionalHelper } from '@infrastructure/template-engine/helpers/conditional.helper.js';

import { TemplateEngineService } from '@infrastructure/template-engine/template.service.js';

// ═══════════════════════════════════════════════════════════
// 1. HandlebarsEngine
// ═══════════════════════════════════════════════════════════
describe('HandlebarsEngine', () => {
  let engine: HandlebarsEngine;

  beforeEach(() => {
    engine = new HandlebarsEngine();
  });

  it('name = handlebars', () => {
    expect(engine.name).toBe('handlebars');
  });

  it('render — simple interpolation', async () => {
    const result = await engine.render({
      template: 'Hello {{name}}!',
      context: { name: 'World' },
    });
    expect(result.output).toBe('Hello World!');
    expect(result.missingVariables).toEqual([]);
  });

  it('render — missing variable', async () => {
    const result = await engine.render({
      template: 'Hello {{name}}!',
      context: {},
    });
    expect(result.output).toBe('Hello !');
    expect(result.missingVariables).toContain('name');
  });

  it('render — nested path', async () => {
    const result = await engine.render({
      template: '{{user.name}}',
      context: { user: { name: 'Alice' } },
    });
    expect(result.output).toBe('Alice');
  });

  it('render — raw triple braces', async () => {
    const result = await engine.render({
      template: '{{{html}}}',
      context: { html: '<b>bold</b>' },
    });
    expect(result.output).toContain('bold');
  });

  it('render — null value', async () => {
    const result = await engine.render({
      template: '{{x}}',
      context: { x: null },
    });
    expect(result.output).toBe('');
    expect(result.missingVariables).toContain('x');
  });
});

// ═══════════════════════════════════════════════════════════
// 2. MustacheEngine
// ═══════════════════════════════════════════════════════════
describe('MustacheEngine', () => {
  let engine: MustacheEngine;

  beforeEach(() => {
    engine = new MustacheEngine();
  });

  it('name = mustache', () => {
    expect(engine.name).toBe('mustache');
  });

  it('render — interpolation', async () => {
    const result = await engine.render({
      template: 'Hi {{name}}',
      context: { name: 'Bob' },
    });
    expect(result.output).toBe('Hi Bob');
    expect(result.missingVariables).toEqual([]);
  });

  it('render — missing', async () => {
    const result = await engine.render({
      template: '{{missing}}',
      context: {},
    });
    expect(result.missingVariables).toContain('missing');
  });

  it('render — nested', async () => {
    const result = await engine.render({
      template: '{{user.email}}',
      context: { user: { email: 'a@b.com' } },
    });
    expect(result.output).toBe('a@b.com');
  });
});

// ═══════════════════════════════════════════════════════════
// 3. EjsEngine
// ═══════════════════════════════════════════════════════════
describe('EjsEngine', () => {
  let engine: EjsEngine;

  beforeEach(() => {
    engine = new EjsEngine();
  });

  it('name = ejs', () => {
    expect(engine.name).toBe('ejs');
  });

  it('render — <%= var %>', async () => {
    const result = await engine.render({
      template: 'Hello <%= name %>',
      context: { name: 'Charlie' },
    });
    expect(result.output).toBe('Hello Charlie');
  });

  it('render — <%- raw %>', async () => {
    const result = await engine.render({
      template: '<%- html %>',
      context: { html: '<b>x</b>' },
    });
    expect(result.output).toContain('x');
  });

  it('render — missing', async () => {
    const result = await engine.render({
      template: '<%= unknown %>',
      context: {},
    });
    expect(result.missingVariables).toContain('unknown');
  });
});

// ═══════════════════════════════════════════════════════════
// 4. MjmlEngine
// ═══════════════════════════════════════════════════════════
describe('MjmlEngine', () => {
  let engine: MjmlEngine;

  beforeEach(() => {
    engine = new MjmlEngine();
  });

  it('name = mjml', () => {
    expect(engine.name).toBe('mjml');
  });

  it('render — returns mjml source when SDK missing', async () => {
    const result = await engine.render({ mjml: '<mjml><mj-body></mj-body></mjml>' });
    expect(result.html).toContain('mjml');
    expect(Array.isArray(result.errors)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// 5. HeaderPartial
// ═══════════════════════════════════════════════════════════
describe('HeaderPartial', () => {
  it('partialName = header', () => {
    expect(HeaderPartial.partialName).toBe('header');
  });

  it('render — default values', () => {
    const html = HeaderPartial.render();
    expect(html).toContain('Vubon');
    expect(html).toContain('logo');
  });

  it('render — custom brand', () => {
    const html = HeaderPartial.render({ brandName: 'TestCo', bgColor: '#000000' });
    expect(html).toContain('TestCo');
    expect(html).toContain('#000000');
  });
});

// ═══════════════════════════════════════════════════════════
// 6. FooterPartial
// ═══════════════════════════════════════════════════════════
describe('FooterPartial', () => {
  it('partialName = footer', () => {
    expect(FooterPartial.partialName).toBe('footer');
  });

  it('render — default values', () => {
    const html = FooterPartial.render();
    expect(html).toContain('Vubon');
    expect(html).toContain('Unsubscribe');
  });

  it('render — custom values', () => {
    const html = FooterPartial.render({
      brandName: 'TestCo',
      year: 2025,
      unsubscribeUrl: 'https://unsub.test',
    });
    expect(html).toContain('TestCo');
    expect(html).toContain('2025');
    expect(html).toContain('https://unsub.test');
  });
});

// ═══════════════════════════════════════════════════════════
// 7. ButtonPartial
// ═══════════════════════════════════════════════════════════
describe('ButtonPartial', () => {
  it('partialName = button', () => {
    expect(ButtonPartial.partialName).toBe('button');
  });

  it('render — primary variant', () => {
    const html = ButtonPartial.render({ label: 'Click', url: 'https://x.test' });
    expect(html).toContain('Click');
    expect(html).toContain('https://x.test');
  });

  it('render — secondary variant', () => {
    const html = ButtonPartial.render({
      label: 'Cancel',
      url: 'https://x.test',
      variant: 'secondary',
    });
    expect(html).toContain('Cancel');
  });

  it('render — danger variant', () => {
    const html = ButtonPartial.render({
      label: 'Delete',
      url: 'https://x.test',
      variant: 'danger',
    });
    expect(html).toContain('Delete');
  });

  it('render — escaped label', () => {
    const html = ButtonPartial.render({
      label: '<script>x</script>',
      url: 'https://x.test',
    });
    expect(html).not.toContain('<script>');
  });

  it('render — left/right align', () => {
    const htmlLeft = ButtonPartial.render({ label: 'L', url: 'u', align: 'left' });
    const htmlRight = ButtonPartial.render({ label: 'R', url: 'u', align: 'right' });
    expect(htmlLeft).toContain('left');
    expect(htmlRight).toContain('right');
  });
});

// ═══════════════════════════════════════════════════════════
// 8. FormatCurrencyHelper
// ═══════════════════════════════════════════════════════════
describe('FormatCurrencyHelper', () => {
  it('format — BDT', () => {
    const result = FormatCurrencyHelper.format(1234.5, 'BDT');
    expect(result).toMatch(/1,?234/);
  });

  it('format — USD', () => {
    const result = FormatCurrencyHelper.format(99.99, 'USD', 'en-US');
    expect(result).toContain('99.99');
  });

  it('format — string input', () => {
    expect(FormatCurrencyHelper.format('100', 'BDT')).toBeDefined();
  });

  it('format — null input', () => {
    expect(FormatCurrencyHelper.format(null, 'BDT')).toContain('0');
  });

  it('format — NaN input', () => {
    expect(FormatCurrencyHelper.format('invalid', 'BDT')).toContain('0');
  });

  it('plain — formats number', () => {
    expect(FormatCurrencyHelper.plain(1234567)).toContain('1,234,567');
  });

  it('plain — null returns 0', () => {
    expect(FormatCurrencyHelper.plain(null)).toBe('0');
  });

  it('plain — invalid returns 0', () => {
    expect(FormatCurrencyHelper.plain('abc')).toBe('0');
  });
});

// ═══════════════════════════════════════════════════════════
// 9. FormatDateHelper
// ═══════════════════════════════════════════════════════════
describe('FormatDateHelper', () => {
  const testDate = '2026-01-15T10:30:00.000Z';

  it('format — short style', () => {
    const result = FormatDateHelper.format(testDate, 'short');
    expect(result).toBeTruthy();
  });

  it('format — medium style', () => {
    expect(FormatDateHelper.format(testDate, 'medium')).toBeTruthy();
  });

  it('format — long style', () => {
    expect(FormatDateHelper.format(testDate, 'long')).toBeTruthy();
  });

  it('format — full style', () => {
    expect(FormatDateHelper.format(testDate, 'full')).toBeTruthy();
  });

  it('format — null returns empty', () => {
    expect(FormatDateHelper.format(null)).toBe('');
  });

  it('format — invalid returns empty', () => {
    expect(FormatDateHelper.format('not-a-date')).toBe('');
  });

  it('format — Date input', () => {
    expect(FormatDateHelper.format(new Date(testDate))).toBeTruthy();
  });

  it('format — custom locale', () => {
    const result = FormatDateHelper.format(testDate, 'medium', 'bn-BD');
    expect(result).toBeTruthy();
  });

  it('relative — under 1 minute returns "just now"', () => {
    const now = new Date('2026-01-15T10:30:30.000Z');
    const past = new Date('2026-01-15T10:30:00.000Z');
    const result = FormatDateHelper.relative(past, now);
    expect(result).toBe('just now');
  });

  it('relative — minutes ago', () => {
    const now = new Date('2026-01-15T10:35:00.000Z');
    const past = new Date('2026-01-15T10:30:00.000Z');
    expect(FormatDateHelper.relative(past, now)).toContain('minute');
  });

  it('relative — hours ago', () => {
    const now = new Date('2026-01-15T13:30:00.000Z');
    const past = new Date('2026-01-15T10:30:00.000Z');
    expect(FormatDateHelper.relative(past, now)).toContain('hour');
  });

  it('relative — days ago', () => {
    const now = new Date('2026-01-20T10:30:00.000Z');
    const past = new Date('2026-01-15T10:30:00.000Z');
    expect(FormatDateHelper.relative(past, now)).toContain('day');
  });

  it('relative — null returns empty', () => {
    expect(FormatDateHelper.relative(null)).toBe('');
  });
});

// ═══════════════════════════════════════════════════════════
// 10. ConditionalHelper
// ═══════════════════════════════════════════════════════════
describe('ConditionalHelper', () => {
  it('eq — true/false', () => {
    expect(ConditionalHelper.eq(1, 1)).toBe(true);
    expect(ConditionalHelper.eq(1, 2)).toBe(false);
  });

  it('ne — true/false', () => {
    expect(ConditionalHelper.ne(1, 2)).toBe(true);
    expect(ConditionalHelper.ne(1, 1)).toBe(false);
  });

  it('gt/gte', () => {
    expect(ConditionalHelper.gt(5, 3)).toBe(true);
    expect(ConditionalHelper.gt(3, 5)).toBe(false);
    expect(ConditionalHelper.gte(5, 5)).toBe(true);
  });

  it('lt/lte', () => {
    expect(ConditionalHelper.lt(3, 5)).toBe(true);
    expect(ConditionalHelper.lt(5, 3)).toBe(false);
    expect(ConditionalHelper.lte(5, 5)).toBe(true);
  });

  it('and — all truthy', () => {
    expect(ConditionalHelper.and(true, true, true)).toBe(true);
    expect(ConditionalHelper.and(true, false)).toBe(false);
  });

  it('or — any truthy', () => {
    expect(ConditionalHelper.or(false, true, false)).toBe(true);
    expect(ConditionalHelper.or(false, false)).toBe(false);
  });

  it('not — negates', () => {
    expect(ConditionalHelper.not(true)).toBe(false);
    expect(ConditionalHelper.not(false)).toBe(true);
  });

  it('in — array contains', () => {
    expect(ConditionalHelper.in('a', ['a', 'b'])).toBe(true);
    expect(ConditionalHelper.in('c', ['a', 'b'])).toBe(false);
    expect(ConditionalHelper.in('a', 'not-array' as never)).toBe(false);
  });

  it('registry — returns all helpers', () => {
    const registry = ConditionalHelper.registry();
    expect(registry).toHaveProperty('eq');
    expect(registry).toHaveProperty('ne');
    expect(registry).toHaveProperty('gt');
    expect(registry).toHaveProperty('and');
    expect(registry).toHaveProperty('or');
  });
});

// ═══════════════════════════════════════════════════════════
// 11. TemplateEngineService
// ═══════════════════════════════════════════════════════════
describe('TemplateEngineService', () => {
  let service: TemplateEngineService;

  beforeEach(() => {
    service = new TemplateEngineService(
      new HandlebarsEngine(),
      new MustacheEngine(),
      new EjsEngine(),
      new MjmlEngine(),
    );
  });

  it('render — handlebars auto-detect', async () => {
    const result = await service.render({
      template: '{{#if x}}Y{{/if}}',
      context: { x: true },
    });
    expect(result.engine).toBe('handlebars');
  });

  it('render — ejs auto-detect', async () => {
    const result = await service.render({
      template: '<%= x %>',
      context: { x: 'val' },
    });
    expect(result.engine).toBe('ejs');
  });

  it('render — mjml auto-detect', async () => {
    const result = await service.render({
      template: '<mjml><mj-body></mj-body></mjml>',
      context: {},
    });
    expect(result.engine).toBe('mjml');
  });

  it('render — explicit engine', async () => {
    const result = await service.render({
      template: '{{x}}',
      context: { x: 'y' },
      engine: 'mustache',
    });
    expect(result.engine).toBe('mustache');
  });

  it('detectEngine — handlebars helpers', () => {
    expect(service.detectEngine('{{#each items}}{{/each}}')).toBe('handlebars');
  });

  it('detectEngine — ejs', () => {
    expect(service.detectEngine('<%= x %>')).toBe('ejs');
  });

  it('detectEngine — mjml', () => {
    expect(service.detectEngine('<mjml>x</mjml>')).toBe('mjml');
  });

  it('detectEngine — default handlebars for plain', () => {
    expect(service.detectEngine('Hello {{x}}')).toBe('handlebars');
  });

  it('getHelpers — returns all', () => {
    const helpers = service.getHelpers();
    expect(helpers).toHaveProperty('eq');
    expect(helpers).toHaveProperty('formatCurrency');
    expect(helpers).toHaveProperty('formatDate');
  });

  it('getPartials — returns partials', () => {
    const partials = service.getPartials();
    expect(partials).toHaveProperty('header');
    expect(partials).toHaveProperty('footer');
    expect(partials).toHaveProperty('button');
  });

  it('renderToString — returns output only', async () => {
    const output = await service.renderToString({
      template: 'Hi {{x}}',
      context: { x: 'world' },
    });
    expect(output).toBe('Hi world');
  });

  it('validate — valid template', () => {
    const result = service.validate({
      template: '{{x}}',
      context: {},
    });
    expect(result.valid).toBe(true);
  });

  it('validate — empty template', () => {
    const result = service.validate({ template: '', context: {} });
    expect(result.valid).toBe(false);
    expect(result.issues).toContain('empty-template');
  });

  it('validate — unbalanced braces', () => {
    const result = service.validate({
      template: '{{x}',
      context: {},
    });
    expect(result.valid).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH BOOST — Engine fallback paths
// ═══════════════════════════════════════════════════════════
describe('Template engines — extra branches', () => {
  it('HandlebarsEngine — nested undefined path', async () => {
    const engine = new HandlebarsEngine();
    const result = await engine.render({
      template: '{{user.missing.path}}',
      context: { user: { name: 'x' } },
    });
    expect(result.missingVariables.length).toBeGreaterThan(0);
  });

  it('HandlebarsEngine — non-object context path', async () => {
    const engine = new HandlebarsEngine();
    const result = await engine.render({
      template: '{{a.b.c}}',
      context: { a: 'string' },
    });
    expect(result.missingVariables).toContain('a.b.c');
  });

  it('MustacheEngine — nested undefined', async () => {
    const engine = new MustacheEngine();
    const result = await engine.render({
      template: '{{a.b}}',
      context: { a: {} },
    });
    expect(result.missingVariables).toContain('a.b');
  });

  it('EjsEngine — undefined variable', async () => {
    const engine = new EjsEngine();
    const result = await engine.render({
      template: '<%= undefinedVar %>',
      context: {},
    });
    expect(result.missingVariables.length).toBeGreaterThan(0);
  });

  it('TemplateEngineService — renderToString with missing vars', async () => {
    const service = new TemplateEngineService(
      new HandlebarsEngine(),
      new MustacheEngine(),
      new EjsEngine(),
      new MjmlEngine(),
    );
    const result = await service.renderToString({
      template: '{{missing}}',
      context: {},
    });
    expect(result).toBe('');
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH — Engine deep edge cases
// ═══════════════════════════════════════════════════════════
describe('Template engines — deep branches', () => {
  it('FormatCurrencyHelper — unsupported currency fallback', () => {
    const result = FormatCurrencyHelper.format(100, 'XYZ', 'invalid-locale');
    expect(result).toBeTruthy();
  });

  it('FormatDateHelper — unsupported locale fallback', () => {
    const result = FormatDateHelper.format('2026-01-15', 'medium', 'invalid-locale', 'Invalid/Zone');
    expect(result).toBeTruthy();
  });

  it('ConditionalHelper — gt with string numbers', () => {
    expect(ConditionalHelper.gt('10' as never, '5' as never)).toBe(true);
  });

  it('ConditionalHelper — and empty', () => {
    expect(ConditionalHelper.and()).toBe(true); // empty = all truthy
  });

  it('ConditionalHelper — or empty', () => {
    expect(ConditionalHelper.or()).toBe(false); // empty = none truthy
  });

  it('HeaderPartial — with logoUrl', () => {
    const html = HeaderPartial.render({ logoUrl: 'https://example.com/logo.png' });
    expect(html).toContain('example.com');
  });

  it('FooterPartial — custom url', () => {
    const html = FooterPartial.render({ preferencesUrl: 'https://pref.test' });
    expect(html).toContain('pref.test');
  });

  it('ButtonPartial — default variant primary', () => {
    const html = ButtonPartial.render({ label: 'X', url: 'u' });
    expect(html).toContain('#3b82f6'); // primary blue
  });
});

// ═══════════════════════════════════════════════════════════
// FINAL ENGINES — SDK fallback + branches
// ═══════════════════════════════════════════════════════════
describe('Template engines — deep fallback branches', () => {
  it('HandlebarsEngine — escapeHtml true path', async () => {
    const engine = new HandlebarsEngine();
    const result = await engine.render({
      template: '{{html}}',
      context: { html: '<b>bold</b>' },
      escapeHtml: true,
    });
    expect(result.output).toBeTruthy();
  });

  it('HandlebarsEngine — triple brace (raw)', async () => {
    const engine = new HandlebarsEngine();
    const result = await engine.render({
      template: '{{{html}}}',
      context: { html: '<b>bold</b>' },
    });
    expect(result.output).toContain('bold');
  });

  it('MustacheEngine — empty template', async () => {
    const engine = new MustacheEngine();
    const result = await engine.render({ template: '', context: {} });
    expect(result.output).toBe('');
  });

  it('EjsEngine — empty template', async () => {
    const engine = new EjsEngine();
    const result = await engine.render({ template: '', context: {} });
    expect(result.output).toBe('');
  });

  it('MjmlEngine — empty mjml', async () => {
    const engine = new MjmlEngine();
    const result = await engine.render({ mjml: '' });
    expect(result.html).toBe('');
    expect(Array.isArray(result.errors)).toBe(true);
  });

  it('MjmlEngine — with variables context', async () => {
    const engine = new MjmlEngine();
    const result = await engine.render({
      mjml: '<mjml><mj-body>{{x}}</mj-body></mjml>',
      context: { x: 'hello' },
    });
    expect(result.html).toContain('mjml');
  });
});

describe('TemplateEngineService — remaining branches', () => {
  let service: TemplateEngineService;

  beforeEach(() => {
    service = new TemplateEngineService(
      new HandlebarsEngine(),
      new MustacheEngine(),
      new EjsEngine(),
      new MjmlEngine(),
    );
  });

  it('render — mustache explicit engine', async () => {
    const result = await service.render({
      template: '{{x}}',
      context: { x: 'y' },
      engine: 'mustache',
    });
    expect(result.engine).toBe('mustache');
  });

  it('detectEngine — mustache syntax (plain handlebars superset)', () => {
    expect(service.detectEngine('Hello {{x}}')).toBe('handlebars');
  });

  it('renderToString — warns but doesn\'t throw on missing', async () => {
    const result = await service.renderToString({
      template: '{{missing}}',
      context: {},
    });
    expect(result).toBe('');
  });

  it('validate — handlebars balanced', () => {
    const result = service.validate({
      template: '{{x}}{{y}}',
      context: {},
    });
    expect(result.valid).toBe(true);
  });
});
