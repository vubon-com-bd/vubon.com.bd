/**
 * Application verification errors — unit tests
 */
import {
  VerificationNotSubmittableError,
  DocumentUploadFailedError,
  DocumentNotFoundError,
  RequiredDocumentsMissingError,
  VerificationExpiredError,
  DocumentExpiredError,
} from '../../../../src/module/application/errors/verification.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Application verification errors', () => {
  it('VerificationNotSubmittableError has 400', () => {
    const e = new VerificationNotSubmittableError('status wrong');
    expect(e).toBeInstanceOf(ApplicationError);
    expect(e.httpStatus).toBe(400);
    expect(e.name).toBe('VerificationNotSubmittableError');
    expect(e.message).toContain('status wrong');
  });

  it('DocumentUploadFailedError has 400', () => {
    const e = new DocumentUploadFailedError('bad file');
    expect(e).toBeInstanceOf(ApplicationError);
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('bad file');
  });

  it('DocumentNotFoundError has 404', () => {
    const e = new DocumentNotFoundError('doc-1');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('doc-1');
    expect(e.name).toBe('DocumentNotFoundError');
  });

  it('RequiredDocumentsMissingError has 422', () => {
    const e = new RequiredDocumentsMissingError(['tax_id', 'license']);
    expect(e.httpStatus).toBe(422);
    expect(e.message).toContain('tax_id');
    expect(e.message).toContain('license');
  });

  it('VerificationExpiredError has 410', () => {
    const e = new VerificationExpiredError('2026-01-01T00:00:00Z');
    expect(e.httpStatus).toBe(410);
    expect(e.message).toContain('2026-01-01');
  });

  it('DocumentExpiredError has 410', () => {
    const e = new DocumentExpiredError('doc-1', '2026-01-01T00:00:00Z');
    expect(e.httpStatus).toBe(410);
    expect(e.message).toContain('doc-1');
  });
});
