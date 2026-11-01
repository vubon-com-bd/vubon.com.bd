/**
 * PublicTrackingController — unauthenticated tracking by number
 * @module logistics-service/modules/public-logistics/controllers
 *
 * GET /public/tracking/:trackingNumber
 */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { GetShipmentByTrackingQuery } from '@application/queries/shipment/get-shipment-by-tracking.query.js';

interface TrackingResponse {
  readonly trackingNumber: string;
  readonly status: string;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
}

@ApiTags('public-tracking')
@Public()
@Controller('public/tracking')
export class PublicTrackingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':trackingNumber')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Public tracking by tracking number (no auth)' })
  @ApiResponse({ status: 200, description: 'Tracking info returned' })
  @ApiResponse({ status: 404, description: 'Tracking not found' })
  async track(@Param('trackingNumber') trackingNumber: string): Promise<TrackingResponse> {
    const result = await this.queryBus.execute<
      GetShipmentByTrackingQuery,
      {
        trackingNumber: string;
        status: string;
        estimatedDeliveryAt?: string;
        deliveredAt?: string;
      } | null
    >(new GetShipmentByTrackingQuery(trackingNumber));

    if (!result) {
      throw new Error(`Tracking ${trackingNumber} not found`);
    }

    return {
      trackingNumber: result.trackingNumber,
      status: result.status,
      estimatedDeliveryAt: result.estimatedDeliveryAt,
      deliveredAt: result.deliveredAt,
    };
  }
}
