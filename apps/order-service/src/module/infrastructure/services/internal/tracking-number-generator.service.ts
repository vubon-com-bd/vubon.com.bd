/**
 * TrackingNumberGeneratorService — generate tracking numbers (TRK-XXXXXXXX)
 * @module order-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  TRACKING_NUMBER_PREFIX,
  TRACKING_NUMBER_MIN_LENGTH,
} from '@vubon/shared-constants/business/order';
import { TrackingNumberVO } from '../../../domain/value-objects/primitives/tracking-number.vo.js';

export const TRACKING_NUMBER_GENERATOR = Symbol('TRACKING_NUMBER_GENERATOR');

export interface ITrackingNumberGeneratorService {
  generate(): Promise<TrackingNumberVO>;
  isValid(value: string): boolean;
}

@Injectable()
export class TrackingNumberGeneratorService implements ITrackingNumberGeneratorService {
  private readonly logger = new Logger(TrackingNumberGeneratorService.name);

  async generate(): Promise<TrackingNumberVO> {
    // Generate: TRK-<8 hex chars> (uppercase, alnum)
    const random = Math.random().toString(36).slice(2, 10).toUpperCase();
    const suffix = random.padEnd(8, '0').slice(0, 8);
    const value = `${TRACKING_NUMBER_PREFIX}-${suffix}`;
    const vo = TrackingNumberVO.create(value);
    this.logger.debug?.(`Generated tracking number: ${vo.value}`);
    return vo;
  }

  isValid(value: string): boolean {
    if (!value) return false;
    return value.length >= TRACKING_NUMBER_MIN_LENGTH && /^TRK-[A-Z0-9]{8,20}$/.test(value);
  }
}
