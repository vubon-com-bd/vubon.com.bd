/**
 * KycValidator Unit Test
 */
import { KycValidator } from '@application/validators/kyc.validator';

describe('KycValidator', () => {
  const validSubmit = {
    documents: [
      {
        type: 'nid',
        frontUrl: 'https://cdn.example.com/nid-front.jpg',
      },
    ],
    acceptTerms: true,
  };

  describe('validateSubmit', () => {
    it('should pass valid input', () => {
      const result = KycValidator.validateSubmit(validSubmit, 'user-1');
      expect(result.success).toBe(true);
      expect(result.data?.userId).toBe('user-1');
      expect(result.data?.documents.length).toBe(1);
    });

    it('should fail when no documents', () => {
      const result = KycValidator.validateSubmit(
        { ...validSubmit, documents: [] },
        'user-1'
      );
      expect(result.success).toBe(false);
    });

    it('should fail when acceptTerms is false', () => {
      const result = KycValidator.validateSubmit(
        { ...validSubmit, acceptTerms: false },
        'user-1'
      );
      expect(result.success).toBe(false);
    });

    it('should fail on missing userId', () => {
      const result = KycValidator.validateSubmit(validSubmit, '');
      expect(result.success).toBe(false);
    });
  });

  describe('validateDocumentCount', () => {
    it('should pass valid count', () => {
      expect(KycValidator.validateDocumentCount(1).success).toBe(true);
    });

    it('should fail on 0', () => {
      expect(KycValidator.validateDocumentCount(0).success).toBe(false);
    });

    it('should fail on too many', () => {
      expect(KycValidator.validateDocumentCount(20).success).toBe(false);
    });
  });

  describe('validateRejectionReason', () => {
    it('should pass valid reason', () => {
      expect(KycValidator.validateRejectionReason('Blurry image').success).toBe(true);
    });

    it('should fail on empty', () => {
      expect(KycValidator.validateRejectionReason('').success).toBe(false);
    });

    it('should fail on too long', () => {
      expect(KycValidator.validateRejectionReason('a'.repeat(600)).success).toBe(false);
    });
  });
});
