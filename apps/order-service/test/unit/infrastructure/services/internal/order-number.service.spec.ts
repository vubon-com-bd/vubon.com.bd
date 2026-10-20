import { describe, it, expect, beforeEach } from '@jest/globals';
import { OrderNumberService } from '@infrastructure/services/internal/order-number.service';

describe('OrderNumberService', () => {
  let service: OrderNumberService;

  beforeEach(() => {
    service = new OrderNumberService();
  });

  it('generate creates ORD-YYYY-NNNNNN', () => {
    const result = service.generate(2024, 1);
    expect(result).toBe('ORD-2024-000001');
  });

  it('pads sequence to 6 digits', () => {
    expect(service.generate(2024, 42)).toBe('ORD-2024-000042');
    expect(service.generate(2024, 999999)).toBe('ORD-2024-999999');
  });

  it('parse extracts year and sequence', () => {
    const result = service.parse('ORD-2024-000123');
    expect(result.year).toBe(2024);
    expect(result.sequence).toBe(123);
  });

  it('nextSequence increments', () => {
    expect(service.nextSequence('ORD-2024-000123')).toBe(124);
    expect(service.nextSequence('ORD-2024-000999')).toBe(1000);
  });

  it('nextSequence starts at 1 for null', () => {
    expect(service.nextSequence(null)).toBe(1);
  });
});
