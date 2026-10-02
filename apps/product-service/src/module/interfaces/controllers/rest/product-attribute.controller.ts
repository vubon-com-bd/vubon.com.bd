/**
 * ProductAttributeController
 */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public, Roles, CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { AddAttributeCommand } from '../../../application/commands/attribute/add-attribute.command.js';
import { UpdateAttributeCommand } from '../../../application/commands/attribute/update-attribute.command.js';
import { RemoveAttributeCommand } from '../../../application/commands/attribute/remove-attribute.command.js';
import { ListAttributesByProductQuery } from '../../../application/queries/attribute/list-attributes-by-product.query.js';

import { AddAttributeRequestDTO, UpdateAttributeRequestDTO } from '../../dtos/requests/attribute.request.dto.js';
import { AttributeResponseDTO } from '../../dtos/responses/attribute.response.dto.js';

@ApiTags('product-attributes')
@ApiBearerAuth('bearer')
@Controller('products/:productId/attributes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductAttributeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add attribute to product' })
  async add(
    @Param('productId') productId: string,
    @Body() dto: AddAttributeRequestDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<AttributeResponseDTO> {
    return this.commandBus.execute(
      new AddAttributeCommand({ ...dto, productId } as never, user.userId),
    );
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'List attributes for product' })
  async list(@Param('productId') productId: string): Promise<readonly AttributeResponseDTO[]> {
    return this.queryBus.execute(new ListAttributesByProductQuery(productId));
  }

  @Patch(':attributeId')
  @Roles('admin', 'vendor')
  @ApiOperation({ summary: 'Update attribute' })
  async update(
    @Param('attributeId') attributeId: string,
    @Body() dto: UpdateAttributeRequestDTO,
  ): Promise<AttributeResponseDTO> {
    return this.commandBus.execute(new UpdateAttributeCommand({ ...dto, attributeId } as never));
  }

  @Delete(':attributeId')
  @Roles('admin', 'vendor')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove attribute' })
  async remove(
    @Param('attributeId') attributeId: string,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(new RemoveAttributeCommand(attributeId, user.userId));
  }
}
