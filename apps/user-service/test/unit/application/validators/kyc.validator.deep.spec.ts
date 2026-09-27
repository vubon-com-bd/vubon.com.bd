import { KycValidator } from '@application/validators/kyc.validator';

describe('KycValidator — deep coverage', () => {
  it('validateSubmit asserts valid userId', () => {
    const r = KycValidator.validateSubmit(
      { documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }], acceptTerms: true },
      'u-1'
    );
    expect(r.success).toBe(true);
    expect(r.data?.userId).toBe('u-1');
  });

  it('validateSubmit trims userId', () => {
    const r = KycValidator.validateSubmit(
      { documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }], acceptTerms: true },
      '  u-1  '
    );
    expect(r.data?.userId).toBe('u-1');
  });

  it('validateSubmit fails on invalid userId', () => {
    const r = KycValidator.validateSubmit(
      { documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }], acceptTerms: true },
      ''
    );
    expect(r.success).toBe(false);
  });

  it('validateSubmit fails on non-array documents', () => {
    const r = KycValidator.validateSubmit(
      { documents: 'not-array', acceptTerms: true },
      'u-1'
    );
    expect(r.success).toBe(false);
  });

  it('validateDocumentCount boundary', () => {
    expect(KycValidator.validateDocumentCount(1).success).toBe(true);
    expect(KycValidator.validateDocumentCount(10).success).toBe(true);
    expect(KycValidator.validateDocumentCount(0).success).toBe(false);
    expect(KycValidator.validateDocumentCount(11).success).toBe(false);
  });

  it('validateRejectionReason trim + length', () => {
    expect(KycValidator.validateRejectionReason('  Blurry  ').data).toBe('Blurry');
    expect(KycValidator.validateRejectionReason('a'.repeat(600)).success).toBe(false);
    expect(KycValidator.validateRejectionReason('').success).toBe(false);
    expect(KycValidator.validateRejectionReason(123 as never).success).toBe(false);
  });

  it('assertValidSubmit throws', () => {
    expect(() => KycValidator.assertValidSubmit({}, 'u-1')).toThrow();
  });

  it('assertValidSubmit succeeds', () => {
    const r = KycValidator.assertValidSubmit(
      { documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }], acceptTerms: true },
      'u-1'
    );
    expect(r.userId).toBe('u-1');
  });
});
