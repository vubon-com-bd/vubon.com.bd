import { describe, it, expect } from '@jest/globals';
import { ActionUrlVO } from '../../../../src/module/domain/value-objects/primitives/action-url.vo.js';

describe('ActionUrlVO', () => {
  it('create http URL', () => {
    const vo = ActionUrlVO.create('https://vubon.com.bd/x');
    expect(vo.isHttp()).toBe(true);
  });
  it('create deep link', () => {
    const vo = ActionUrlVO.create('vubon://orders/123');
    expect(vo.isDeepLink()).toBe(true);
    expect(vo.scheme).toBe('vubon');
  });
  it('rejects empty', () => {
    expect(() => ActionUrlVO.create('')).toThrow();
  });
  it('rejects invalid', () => {
    expect(() => ActionUrlVO.create('not-a-url')).toThrow();
  });
  it('reconstitute', () => {
    expect(ActionUrlVO.reconstitute('any').value).toBe('any');
  });
});
