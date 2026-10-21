/**
 * PaymentGatewayController — gateway listing + health
 * @module payment-service/interfaces/controllers/rest
 */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import { ListGatewaysQuery } from '@application/queries/gateway/list-gateways.query';
import { GetGatewayHealthQuery } from '@application/queries/gateway/get-gateway-health.query';
import type { GatewayListResponseDTO, GatewayHealthDTO } from '@application/services/interfaces/payment-gateway.service.interface';

@ApiTags('payment-gateways')
@ApiBearerAuth('bearer')
@Controller('payment-gateways')
@UseGuards(JwtAuthGuard)
export class PaymentGatewayController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get()
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<GatewayListResponseDTO> {
    return this.queryBus.execute(
      new ListGatewaysQuery(Number(page) || 1, Number(limit) || 20),
    );
  }

  @Get('health')
  async health(): Promise<readonly GatewayHealthDTO[]> {
    return this.queryBus.execute(new GetGatewayHealthQuery());
  }
}
