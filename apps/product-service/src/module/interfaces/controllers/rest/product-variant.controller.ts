/**
 * ProductVariantController
 * @module product-service/interfaces/controllers/rest
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddVariantCommand } from '../../../application/commands/variant/add-variant.command.js';
import { UpdateVariantCommand } from '../../../application/commands/variant/update-variant.command.js';
import { RemoveVariantCommand } from '../../../application/commands/variant/remove-variant.command.js';
import { ListVariantsByProductQuery } from '../../../application/queries/variant/list-variants-by-product.query.js';

import { AddVariantRequestDTO } from '../../dtos/requests/variant.request.dto.js';
import { VariantResponseDTO } from '../../dtos/responses/variant.response.dto.js';

@ApiTags('product-variants')
@ApiBearerAuth('bearer')
@Controller('products/:productId/variants')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductVariantController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add variant to product' })
  async add(
    @Param('productId') productId: string,
    @Body() dto: AddVariantRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VariantResponseDTO> {
    return this.commandBus.execute(
      new AddVariantCommand({ ...dto, productId } as never, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List variants for a product' })
  async list(@Param('productId') productId: string): Promise<readonly VariantResponseDTO[]> {
    return this.queryBus.execute(new ListVariantsByProductQuery(productId));
  }

  @Patch(':variantId')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Update a variant' })
  async update(
    @Param('variantId') variantId: string,
    @Body() dto: Record<string, unknown>,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VariantResponseDTO> {
    return this.commandBus.execute(
      new UpdateVariantCommand({ variantId, ...dto, updatedBy: user.userId } as never),
    );
  }

  @Delete(':variantId')
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a variant' })
  async remove(
    @Param('variantId') variantId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new RemoveVariantCommand(variantId, user.userId));
  }
}
