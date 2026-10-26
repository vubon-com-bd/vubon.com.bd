import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { InvalidTemplateFormatError } from '@domain/errors/template.errors.js';

describe('TemplateFormatVO', () => {
  it.each(['text', 'html', 'mjml', 'markdown'])('accepts "%s"', (f) => {
    expect(TemplateFormatVO.create(f).value).toBe(f);
  });

  it('normalizes case', () => {
    expect(TemplateFormatVO.create('HTML').value).toBe('html');
  });

  it('rejects invalid', () => {
    expect(() => TemplateFormatVO.create('xml')).toThrow(InvalidTemplateFormatError);
  });

  it('rejects non-string', () => {
    expect(() => TemplateFormatVO.create({} as any)).toThrow(InvalidTemplateFormatError);
  });

  describe('factory + predicates', () => {
    it('text()', () => {
      expect(TemplateFormatVO.text().value).toBe('text');
      expect(TemplateFormatVO.text().isText()).toBe(true);
      expect(TemplateFormatVO.text().isHtml()).toBe(false);
      expect(TemplateFormatVO.text().isRich()).toBe(false);
    });

    it('html()', () => {
      expect(TemplateFormatVO.html().isHtml()).toBe(true);
      expect(TemplateFormatVO.html().isText()).toBe(false);
      expect(TemplateFormatVO.html().isRich()).toBe(true);
    });

    it('mjml() is rich', () => {
      expect(TemplateFormatVO.mjml().isRich()).toBe(true);
    });

    it('markdown() is rich', () => {
      expect(TemplateFormatVO.markdown().isRich()).toBe(true);
    });
  });
});
