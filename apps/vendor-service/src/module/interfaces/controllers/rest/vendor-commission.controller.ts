import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CalculateCommissionCommand } from '../../../application/commands/commission';
import { UpdateCommissionCommand } from '../../../application/commands/commission';
import { GetCommissionSummaryQuery } from '../../../application/queries/commission';
import { ListCommissionsQuery } from '../../../application/queries/commission';
import {
  CalculateCommissionRequestDto,
  UpdateCommissionRequestDto,
} from '../../dtos/requests/commission.request.dto';

@ApiTags('Vendor Commission')
@ApiBearerAuth()
@Controller('vendors/commission')
@UseGuards(JwtAuthGuard)
export class VendorCommissionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new ListCommissionsQuery(vendorId));
  }

  @Get(':vendorId/summary')
  async summary(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new GetCommissionSummaryQuery(vendorId));
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async calculate(@Body() body: CalculateCommissionRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CalculateCommissionCommand(
        body.vendorId,
        body.orderId,
        body.orderAmount,
        body.currency,
      ),
    );
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async update(@Body() body: UpdateCommissionRequestDto): Promise<void> {
    return this.commandBus.execute(
      new UpdateCommissionCommand(body.vendorId, body.rate, body.type),
    );
  }
}
