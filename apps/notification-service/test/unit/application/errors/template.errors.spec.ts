import {
  TemplateNotFoundApplicationError,
  TemplateValidationError,
  TemplateCreationError,
  TemplateUpdateError,
  TemplateRenderApplicationError,
  TemplateSlugConflictError,
  TemplateQueryError,
} from '@application/errors/template.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Template application errors', () => {
  it('all extend ApplicationError', () => {
    expect(new TemplateNotFoundApplicationError('t')).toBeInstanceOf(ApplicationError);
    expect(new TemplateValidationError('x')).toBeInstanceOf(ApplicationError);
    expect(new TemplateCreationError('c')).toBeInstanceOf(ApplicationError);
    expect(new TemplateUpdateError('t', 'u')).toBeInstanceOf(ApplicationError);
    expect(new TemplateRenderApplicationError('t', 'r')).toBeInstanceOf(ApplicationError);
    expect(new TemplateSlugConflictError('s')).toBeInstanceOf(ApplicationError);
    expect(new TemplateQueryError('q')).toBeInstanceOf(ApplicationError);
  });

  it('Slug conflict 409', () => {
    const e = new TemplateSlugConflictError('welcome-email');
    expect(e.httpStatus).toBe(409);
    expect(e.message).toContain('welcome-email');
  });

  it('NotFound 404', () => {
    expect(new TemplateNotFoundApplicationError('t').httpStatus).toBe(404);
  });

  it('Render error message', () => {
    const e = new TemplateRenderApplicationError('t-1', 'bad');
    expect(e.message).toContain('t-1');
    expect(e.message).toContain('bad');
  });
});
