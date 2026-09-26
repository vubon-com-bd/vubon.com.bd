import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';
import { PurchaseInsuranceCommand } from '../../../application/commands/insurance/purchase-insurance.command';
import { ClaimInsuranceCommand } from '../../../application/commands/insurance/claim-insurance.command';
import { GetInsuranceQuery } from '../../../application/queries/insurance/get-insurance.query';
import { ListInsuranceQuery } from '../../../application/queries/insurance/list-insurance.query';
import type { PurchaseInsuranceRequestDTO } from '../../dtos/requests/insurance.request.dto';

@Controller('logistics/insurance')
@UseGuards(JwtAuthGuard)
export class InsuranceController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Permissions(LOGISTICS_PERMISSION.INSURANCE_MANAGE)
  async purchase(@Body() body: PurchaseInsuranceRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new PurchaseInsuranceCommand(
        body.shipmentId,
        body.provider,
        body.coverage,
        body.declaredValue,
        body.currency,
      ),
    );
  }

  @Get()
  @Permissions(LOGISTICS_PERMISSION.INSURANCE_VIEW)
  async list(@Query('shipmentId') shipmentId?: string): Promise<unknown> {
    return this.queryBus.execute(new ListInsuranceQuery(shipmentId));
  }

  @Get(':id')
  @Permissions(LOGISTICS_PERMISSION.INSURANCE_VIEW)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetInsuranceQuery(id));
  }

  @Post(':id/claim')
  @HttpCode(HttpStatus.OK)
  @Permissions(LOGISTICS_PERMISSION.INSURANCE_MANAGE)
  async claim(
    @Param('id') insuranceId: string,
    @Body() body: { amount: number; reason: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ClaimInsuranceCommand(insuranceId, body.amount, body.reason),
    );
  }
}
