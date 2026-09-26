import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Permissions } from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateSettlementCommand } from '../../../application/commands/settlement';
import { CompleteSettlementCommand } from '../../../application/commands/settlement';
import { ListSettlementsQuery } from '../../../application/queries/settlement';
import { GetSettlementQuery } from '../../../application/queries/settlement';

interface CreateSettlementBody {
  vendorId: string;
  periodStart: string;
  periodEnd: string;
}

interface CompleteSettlementBody {
  settlementId: string;
  notes?: string;
}

@ApiTags('Vendor Settlements')
@ApiBearerAuth()
@Controller('vendors/settlements')
@UseGuards(JwtAuthGuard)
export class VendorSettlementController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':vendorId')
  async list(@Param('vendorId') vendorId: string): Promise<unknown> {
    return this.queryBus.execute(new ListSettlementsQuery(vendorId));
  }

  @Get('detail/:settlementId')
  async get(@Param('settlementId') settlementId: string): Promise<unknown> {
    return this.queryBus.execute(new GetSettlementQuery(settlementId));
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async create(@Body() body: CreateSettlementBody): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSettlementCommand(body.vendorId, body.periodStart, body.periodEnd),
    );
  }

  @Post('complete')
  @HttpCode(HttpStatus.OK)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async complete(@Body() body: CompleteSettlementBody): Promise<unknown> {
    return this.commandBus.execute(
      new CompleteSettlementCommand(body.settlementId, body.notes),
    );
  }
}
