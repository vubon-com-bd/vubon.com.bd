import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { CreatePricingRuleCommand } from '../../../application/commands/pricing/create-pricing-rule.command';
import { UpdatePricingRuleCommand } from '../../../application/commands/pricing/update-pricing-rule.command';
import { DeletePricingRuleCommand } from '../../../application/commands/pricing/delete-pricing-rule.command';
import type { CreatePricingRuleHttpDto } from '../../dtos/requests/pricing.request.dto';

@ApiTags('Product Pricing Rules')
@Controller('products/:productId/pricing-rules')
@UseGuards(JwtAuthGuard)
export class ProductPricingRuleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { value: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new UpdatePricingRuleCommand(id, body.value));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeletePricingRuleCommand(id));
  }
}
