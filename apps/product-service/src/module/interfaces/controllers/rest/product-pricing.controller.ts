import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { UpdatePriceCommand } from '../../../application/commands/pricing/update-price.command';
import { CreatePricingRuleCommand } from '../../../application/commands/pricing/create-pricing-rule.command';
import { GetPriceQuery } from '../../../application/queries/pricing/get-price.query';
import { CalculatePriceQuery } from '../../../application/queries/pricing/calculate-price.query';
import {
  UpdatePriceHttpDto,
  CreatePricingRuleHttpDto,
} from '../../dtos/requests/pricing.request.dto';
import { PricingSwagger } from '../../swagger/pricing.swagger';

@ApiTags('Product Pricing')
@Controller('products/:productId/pricing')
@UseGuards(JwtAuthGuard)
export class ProductPricingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @PricingSwagger.Get()
  async get(@Param('productId') productId: string): Promise<unknown> {
    return this.queryBus.execute(new GetPriceQuery(productId));
  }

  @Get('calculate')
  async calculate(@Param('productId') productId: string): Promise<number> {
    return this.queryBus.execute(new CalculatePriceQuery(productId));
  }

  @Patch()
  @PricingSwagger.Update()
  async update(
    @Param('productId') productId: string,
    @Body() body: UpdatePriceHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdatePriceCommand(productId, body.amount, body.currency),
    );
  }

  @Post('rules')
  async createRule(
    @Param('productId') productId: string,
    @Body() body: CreatePricingRuleHttpDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreatePricingRuleCommand(
        productId,
        body.ruleType,
        body.value,
        body.startAt,
        body.endAt,
      ),
    );
  }
}
