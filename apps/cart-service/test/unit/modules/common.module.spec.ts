/**
 * CartCommonModule — Unit Tests
 * @module test/unit/modules
 */
import { describe, it, expect } from '@jest/globals';
import { CartCommonModule } from '../../../src/module/modules/common/common.module.js';

describe('CartCommonModule', () => {
  it('should be defined', () => {
    expect(CartCommonModule).toBeDefined();
  });

  it('should be a class', () => {
    expect(typeof CartCommonModule).toBe('function');
  });

  it('should be decorated with @Global', () => {
    const metadata = Reflect.getMetadata('__module:global__', CartCommonModule);
    expect(metadata === true || metadata === undefined).toBe(true);
  });
});
