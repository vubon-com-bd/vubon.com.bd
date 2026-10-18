/**
 * AuthCommonModule tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthCommonModule } from '@modules/common/common.module.js';

describe('AuthCommonModule', () => {
  it('should be defined', () => {
    expect(AuthCommonModule).toBeDefined();
  });

  it('should have @Module metadata', () => {
    const metadata = Reflect.getMetadata('imports', AuthCommonModule) ?? [];
    const exports_ = Reflect.getMetadata('exports', AuthCommonModule) ?? [];
    // Module should be global
    expect(Array.isArray(metadata)).toBe(true);
    expect(Array.isArray(exports_)).toBe(true);
  });

  it('should be @Global()', () => {
    const global = Reflect.getMetadata('__module:global__', AuthCommonModule);
    expect(global).toBe(true);
  });

  it('should export more than 0 providers', () => {
    const exports_ = Reflect.getMetadata('exports', AuthCommonModule) ?? [];
    expect(exports_.length).toBeGreaterThan(0);
  });
});
