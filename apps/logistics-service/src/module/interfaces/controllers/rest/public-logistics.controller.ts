/**
 * PublicLogisticsController — Public tracking/shipment lookup (no auth)
 * @module logistics-service/interfaces/controllers/rest
 */
import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { GetPublicTrackingQuery } from '../../../application/queries/tracking/get-public-tracking.query.js';
import { GetPublicShipmentQuery } from '../../../application/queries/shipment/get-public-shipment.query.js';
import type { TrackingPublicResponseDTO } from '../../../application/dtos/responses/tracking/tracking-response.dto.js';
import type { ShipmentPublicResponseDTO } from '../../../application/dtos/responses/shipment/shipment-response.dto.js';

@ApiTags('public-logistics')
@Controller('public/logistics')
export class PublicLogisticsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('track/:trackingNumber')
  @Public()
  @ApiOperation({ summary: 'Public tracking lookup (no auth required)' })
  async track(@Param('trackingNumber') tn: string): Promise<TrackingPublicResponseDTO> {
    return this.queryBus.execute(new GetPublicTrackingQuery(tn));
  }

  @Get('shipments/:id')
  @Public()
  @ApiOperation({ summary: 'Public shipment view by id (no auth required)' })
  async shipment(@Param('id') id: string): Promise<ShipmentPublicResponseDTO> {
    return this.queryBus.execute(new GetPublicShipmentQuery(id));
  }
}
