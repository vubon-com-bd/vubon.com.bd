/**
 * PriceCalculatorService — wraps domain PriceCalculatorService for DI.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { PriceCalculatorService as DomainPriceCalculator } from '../../../domain/services/price-calculator.service.js';

export const PRICE_CALCULATOR_SERVICE = Symbol('PRICE_CALCULATOR_SERVICE');

@Injectable()
export class PriceCalculatorService extends DomainPriceCalculator {}
