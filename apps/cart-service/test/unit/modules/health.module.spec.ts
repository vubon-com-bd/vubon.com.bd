/**
 * HealthModule — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { HealthModule } from '../../../src/module/modules/health/health.module.js';
import { CartHealthIndicator } from '../../../src/module/modules/health/cart.health.js';

describe('HealthModule', () => {
  it('should be defined', () => {
    expect(HealthModule).toBeDefined();
  });

  it('should export CartHealthIndicator class', () => {
    expect(CartHealthIndicator).toBeDefined();
    expect(typeof CartHealthIndicator).toBe('function');
  });
});
