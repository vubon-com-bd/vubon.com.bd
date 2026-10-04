/**
 * FeeCalculatorService — façade for domain PaymentFeeService
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import {
  PaymentFeeService,
  type FeeBreakdown,
} from '../../../domain/services/payment-fee.service.js';
import type { PaymentGatewayVO } from '../../../domain/value-objects/primitives/payment-gateway.vo.js';

@Injectable()
export class FeeCalculatorService {
  calculate(input: {
    readonly amount: number;
    readonly currency: string;
    readonly gateway?: PaymentGatewayVO | null;
  }): FeeBreakdown {
    return PaymentFeeService.calculate(input);
  }
}
