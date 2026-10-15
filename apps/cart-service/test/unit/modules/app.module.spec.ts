/**
 * CartAppModule — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartAppModule, AppModule } from '../../../src/module/modules/app.module.js';

describe('CartAppModule', () => {
  it('should be defined', () => {
    expect(CartAppModule).toBeDefined();
  });

  it('should have AppModule alias', () => {
    expect(AppModule).toBe(CartAppModule);
  });

  it('should be a class', () => {
    expect(typeof CartAppModule).toBe('function');
  });
});
