/**
 * VendorCommissionController — REST endpoints for commission
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { UpdateCommissionCommand } from '../../../application/commands/commission/update-commission.command.js';
import { CalculateCommissionCommand } from '../../../application/commands/commission/calculate-commission.command.js';
import { GetCommissionQuery } from '../../../application/queries/commission/get-commission.query.js';
import { ListCommissionsQuery } from '../../../application/queries/commission/list-commissions.query.js';
import { GetCommissionSummaryQuery } from '../../../application/queries/commission/get-commission-summary.query.js';

import {
  UpdateCommissionHttpDTO,
  CalculateCommissionHttpDTO,
} from '../../dtos/requests/commission.request.dto.js';
import type {
  CommissionHttpResponseDTO,
  CommissionCalculationHttpResponseDTO,
  CommissionListHttpResponseDTO,
} from '../../dtos/responses/commission.response.dto.js';

import { CommissionControllerMapper } from '../../mappers/commission.controller.mapper.js';
import { CommissionCacheInterceptor } from '../../interceptors/commission-cache.interceptor.js';

@ApiTags('vendor-commissions')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/commissions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(CommissionCacheInterceptor)
export class VendorCommissionController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Patch()
  @ApiOperation({ summary: 'Update commission configuration' })
  async update(
    @Param('vendorId') vendorId: string,
    @Body() dto: UpdateCommissionHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<CommissionHttpResponseDTO> {
    const appDto = { ...CommissionControllerMapper.toUpdateAppDto(dto), vendorId };
    return this.commandBus.execute(new UpdateCommissionCommand(appDto, user.userId));
  }

  @Post('calculate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculate commission for an order' })
  async calculate(
    @Param('vendorId') vendorId: string,
    @Body() dto: CalculateCommissionHttpDTO,
  ): Promise<CommissionCalculationHttpResponseDTO> {
    const appDto = { ...CommissionControllerMapper.toCalculateAppDto(dto), vendorId };
    return this.commandBus.execute(new CalculateCommissionCommand(appDto));
  }

  @Get()
  @ApiOperation({ summary: 'List commissions for vendor' })
  async list(
    @Param('vendorId') vendorId: string,
  ): Promise<CommissionListHttpResponseDTO> {
    return this.queryBus.execute(new ListCommissionsQuery(vendorId));
  }

  @Get('summary')
  @ApiOperation({ summary: 'Commission stats for vendor' })
  async summary(
    @Param('vendorId') vendorId: string,
  ): Promise<import('../../dtos/responses/commission.response.dto.js').CommissionListHttpResponseDTO> {
    return this.queryBus.execute(new GetCommissionSummaryQuery(vendorId)) as never;
  }

  @Get(':commissionId')
  @ApiOperation({ summary: 'Get commission by ID' })
  async getById(
    @Param('commissionId') commissionId: string,
  ): Promise<CommissionHttpResponseDTO> {
    return this.queryBus.execute(new GetCommissionQuery(commissionId));
  }
}
