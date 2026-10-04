import { TransactionReferenceVO } from '../../../../../src/module/domain/value-objects/primitives/transaction-reference.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TransactionReferenceVO', () => {
  it('creates valid', () => {
    expect(TransactionReferenceVO.create('ref-123').value).toBe('ref-123');
  });
  it('trims', () => {
    expect(TransactionReferenceVO.create('  ref  ').value).toBe('ref');
  });
  it('rejects empty', () => {
    expect(() => TransactionReferenceVO.create('')).toThrow(ValidationError);
  });
  it('rejects too long (>128)', () => {
    expect(() => TransactionReferenceVO.create('a'.repeat(129))).toThrow(ValidationError);
  });
});
