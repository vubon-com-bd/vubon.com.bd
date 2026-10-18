/**
 * BaseTemplate unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { BaseTemplate, type BaseTemplateData } from '@infrastructure/external/email/templates/base.template.js';

interface TestData extends BaseTemplateData {
  readonly value: string;
}

class TestTemplate extends BaseTemplate<TestData> {
  readonly name = 'test';
  subject(data: TestData): string {
    return `Subject ${data.value}`;
  }
  render(data: TestData): string {
    return this.wrap(`<p>${data.value}</p>`, 'Test Title');
  }
  // Expose wrap for testing
  public testWrap(body: string, title: string): string {
    return this.wrap(body, title);
  }
}

describe('BaseTemplate', () => {
  it('subclass implements name/subject/render', () => {
    const t = new TestTemplate();
    expect(t.name).toBe('test');
    expect(t.subject({ recipientName: 'X', value: 'hello' })).toBe('Subject hello');
  });

  it('wrap produces full HTML document', () => {
    const t = new TestTemplate();
    const html = t.testWrap('<p>body</p>', 'Title');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<title>Title</title>');
    expect(html).toContain('<p>body</p>');
    expect(html).toContain('Vubon');
  });

  it('wrap includes current year', () => {
    const t = new TestTemplate();
    const html = t.testWrap('body', 'T');
    expect(html).toContain(String(new Date().getFullYear()));
  });

  it('render produces HTML with data', () => {
    const t = new TestTemplate();
    const html = t.render({ recipientName: 'X', value: 'hello' });
    expect(html).toContain('<p>hello</p>');
  });
});
