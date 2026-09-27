import { KycValidator } from '@interfaces/validators/kyc.validator';

describe('Interface KycValidator', () => {
  it('should pass valid submit', () => {
    const r = KycValidator.validateSubmit({
      documents: [{ type: 'nid', frontUrl: 'https://x.com/a.jpg' }],
      acceptTerms: true,
    });
    expect(r.success).toBe(true);
  });

  it('should fail empty documents', () => {
    const r = KycValidator.validateSubmit({
      documents: [],
      acceptTerms: true,
    });
    expect(r.success).toBe(false);
  });

  it('should pass valid document count', () => {
    expect(KycValidator.validateDocumentCount(3).success).toBe(true);
  });

  it('should fail zero document count', () => {
    expect(KycValidator.validateDocumentCount(0).success).toBe(false);
  });

  it('should fail too many documents', () => {
    expect(KycValidator.validateDocumentCount(20).success).toBe(false);
  });

  it('should pass valid rejection reason', () => {
    expect(KycValidator.validateRejectionReason('Blurry image').success).toBe(true);
  });

  it('should fail empty rejection reason', () => {
    expect(KycValidator.validateRejectionReason('').success).toBe(false);
  });
});
