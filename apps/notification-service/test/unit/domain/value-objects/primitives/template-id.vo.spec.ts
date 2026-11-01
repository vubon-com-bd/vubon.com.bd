import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('TemplateIdVO', () => {
  it('creates from valid UUID', () => {
    expect(TemplateIdVO.create(IDS.templateId).value).toBe(IDS.templateId);
  });

  it('rejects empty', () => {
    expect(() => TemplateIdVO.create('')).toThrow(ValidationError);
  });

  it('rejects non-UUID', () => {
    expect(() => TemplateIdVO.create('bad')).toThrow(ValidationError);
  });

  it('reconstitute accepts any string', () => {
    expect(TemplateIdVO.reconstitute('legacy-id-001').value).toBe('legacy-id-001');
  });
});
