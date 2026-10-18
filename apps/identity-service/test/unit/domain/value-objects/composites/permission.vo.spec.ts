/**
 * PermissionVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PermissionVO } from '@domain/value-objects/composites/permission.vo.js';
import { PermissionNameVO } from '@domain/value-objects/primitives/permission-name.vo.js';
import { TEST_DATES } from '@fixtures/index';

const makeProps = (overrides: Record<string, unknown> = {}) => ({
  name: PermissionNameVO.create('auth:login'),
  description: 'User can login',
  category: 'auth',
  isSensitive: false,
  createdAt: TEST_DATES.NOW,
  ...overrides,
});

describe('PermissionVO', () => {
  it('should create valid', () => {
    const vo = PermissionVO.create(makeProps());
    expect(vo.name.value).toBe('auth:login');
    expect(vo.category).toBe('auth');
    expect(vo.isSensitive).toBe(false);
  });

  it('should freeze', () => {
    expect(Object.isFrozen(PermissionVO.create(makeProps()))).toBe(true);
  });

  it('should expose all getters', () => {
    const vo = PermissionVO.create(
      makeProps({ isSensitive: true, category: 'admin' }),
    );
    expect(vo.isSensitive).toBe(true);
    expect(vo.category).toBe('admin');
    expect(vo.description).toBe('User can login');
  });

  it('reconstitute should skip validation', () => {
    const vo = PermissionVO.reconstitute(makeProps());
    expect(vo.name.value).toBe('auth:login');
  });
});
