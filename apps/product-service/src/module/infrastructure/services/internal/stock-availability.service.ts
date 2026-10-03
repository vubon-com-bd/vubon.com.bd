/**
 * StockAvailabilityService — infra adapter for stock calculations.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { StockAvailabilityService as DomainStockAvailability } from '../../../domain/services/stock-availability.service.js';

export const STOCK_AVAILABILITY_SERVICE = Symbol('STOCK_AVAILABILITY_SERVICE');

@Injectable()
export class StockAvailabilityService extends DomainStockAvailability {}
