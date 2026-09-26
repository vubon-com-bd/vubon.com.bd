import { Injectable } from '@nestjs/common';

@Injectable()
export class CacCalculatorService {
  calculate(totalSpend: number, acquiredCustomers: number): number {
    if (acquiredCustomers === 0) return 0;
    return totalSpend / acquiredCustomers;
  }
}
