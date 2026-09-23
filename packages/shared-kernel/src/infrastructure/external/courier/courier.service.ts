/**
 * Base Courier Service
 * @module shared-kernel/infrastructure/external/courier
 */
import { Injectable } from '@nestjs/common';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from './courier.client';

@Injectable()
export abstract class BaseCourierService {
  abstract readonly name: string;

  abstract createShipment(
    input: CourierCreateShipmentInput,
  ): Promise<CourierCreateShipmentResult>;

  abstract track(trackingNumber: string): Promise<CourierTrackResult>;

  abstract cancel(trackingNumber: string): Promise<CourierCancelResult>;
}
