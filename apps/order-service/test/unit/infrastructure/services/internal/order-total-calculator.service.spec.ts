import { OrderTotalCalculatorService } from '../../../../../src/module/infrastructure/services/internal/order-total-calculator.service.js';
import { makeItem } from '../../../application/services/_helpers.js';

describe('OrderTotalCalculatorService', () => {
  let service: OrderTotalCalculatorService;

  beforeEach(() => {
    service = new OrderTotalCalculatorService();
  });

  it('calculate() delegates to OrderTotalService', () => {
    const items = [makeItem(2, 100)];
    const totals = service.calculate({ items, currency: 'BDT' });
    expect(totals.subtotal.amount).toBe(200);
    expect(totals.total.amount).toBe(200);
  });

  it('calculate() with tax + discount + shipping', () => {
    const items = [makeItem(2, 100)];
    const totals = service.calculate({
      items,
      currency: 'BDT',
      orderLevelDiscount: 20,
      taxRate: 0.1,
      shippingCost: 50,
    });
    // subtotal=200, discount=20, taxable=180, tax=18, shipping=50, total=248
    expect(totals.total.amount).toBe(248);
  });

  it('calculateTax()', () => {
    expect(service.calculateTax(100, 0.15)).toBe(15);
  });

  it('calculateLineSubtotal()', () => {
    expect(service.calculateLineSubtotal(100, 3)).toBe(300);
  });
});
