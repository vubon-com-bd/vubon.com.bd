/**
 * ProductPricingRuleController — REST endpoints
 * @module product-service/interfaces/controllers/rest
 */
import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject,
  Param, Patch, Post, Query, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import {
  PRICING_RULE_SERVICE,
  type IProductPricingRuleService,
} from '../../../application/services/interfaces/product-pricing-rule.service.interface.js';

import type {
  CreatePricingRuleHttpDTO,
  UpdatePricingRuleHttpDTO,
} from '../../dtos/requests/pricing.request.dto.js';

import { ProductLoggingInterceptor } from '../../interceptors/product-logging.interceptor.js';
import { ProductTimeoutInterceptor } from '../../interceptors/product-timeout.interceptor.js';

@ApiTags('product-pricing-rules')
@ApiBearerAuth('bearer')
@Controller('product-pricing-rules')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ProductLoggingInterceptor, ProductTimeoutInterceptor)
export class ProductPricingRuleController extends BaseController {
  constructor(
    @Inject(PRICING_RULE_SERVICE)
    private readonly ruleService: IProductPricingRuleService,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create pricing rule' })
  async create(@Body() dto: CreatePricingRuleHttpDTO): Promise<unknown> {
    return this.ruleService.create({
      ...dto,
      type: dto.type as never,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pricing rule' })
  async update(@Param('id') id: string, @Body() dto: UpdatePricingRuleHttpDTO): Promise<unknown> {
    return this.ruleService.update({ ruleId: id, ...dto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete pricing rule' })
  async delete(
    @Param('id') id: string,
  ): Promise<{ readonly success: true; readonly ruleId: string }> {
    return this.ruleService.delete({ ruleId: id });
  }

  @Get('active')
  @ApiOperation({ summary: 'List active pricing rules' })
  async listActive(): Promise<readonly unknown[]> {
    return this.ruleService.listActive();
  }

  @Get()
  @ApiOperation({ summary: 'List pricing rules' })
  async list(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<unknown> {
    return this.ruleService.list(page ?? 1, limit ?? 20);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pricing rule by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.ruleService.getById(id);
  }
}
