import { Injectable } from '@nestjs/common';

@Injectable()
export class ClvCalculatorService {
  calculate(aov: number, frequency: number, lifespanYears: number): number {
    return aov * frequency * lifespanYears;
  }
}
