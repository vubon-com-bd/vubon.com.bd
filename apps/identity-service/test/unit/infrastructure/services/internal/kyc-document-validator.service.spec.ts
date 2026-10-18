/**
 * KycDocumentValidatorService unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { KycDocumentValidatorService } from '@infrastructure/services/internal/kyc-document-validator.service.js';

describe('KycDocumentValidatorService', () => {
  let service: KycDocumentValidatorService;

  beforeEach(() => {
    service = new KycDocumentValidatorService();
  });

  it('validateSubmission returns result for valid docs', () => {
    const result = service.validateSubmission(
      [
        {
          type: { value: 'national_id' },
          number: '1234567890',
          frontUrl: 'https://x.com/front.jpg',
          verified: false,
        },
      ] as never,
      'individual',
    );
    expect(result).toBeDefined();
  });

  it('validateSubmission returns result for empty docs', () => {
    const result = service.validateSubmission([], 'individual');
    expect(result).toBeDefined();
  });

  it('assertValid throws on invalid docs', () => {
    expect(() => service.assertValid([], 'individual')).toThrow();
  });

  it('assertValid does not throw on valid docs', () => {
    const docs = [
      {
        type: { value: 'national_id' },
        number: '1234567890',
        frontUrl: 'https://x.com/front.jpg',
        verified: false,
      },
    ];
    expect(() => service.assertValid(docs as never, 'individual')).not.toThrow();
  });
});
