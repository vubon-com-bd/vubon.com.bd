import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import type { CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';
import { CreatePackagingCommand } from '../../../application/commands/packaging/create-packaging.command.js';
import { UpdatePackagingCommand } from '../../../application/commands/packaging/update-packaging.command.js';
import { RestockPackagingCommand } from '../../../application/commands/packaging/restock-packaging.command.js';
import { ConsumePackagingCommand } from '../../../application/commands/packaging/consume-packaging.command.js';
import { AdjustPackagingStockCommand } from '../../../application/commands/packaging/adjust-packaging-stock.command.js';
import { SelectPackagingCommand } from '../../../application/commands/packaging/select-packaging.command.js';
import { GetPackagingQuery } from '../../../application/queries/packaging/get-packaging.query.js';
import { ListPackagingsQuery } from '../../../application/queries/packaging/list-packagings.query.js';
import {
  CreatePackagingHttpDTO, UpdatePackagingHttpDTO, AdjustPackagingStockHttpDTO,
  RestockPackagingHttpDTO, ConsumePackagingHttpDTO, SelectPackagingHttpDTO, ListPackagingsHttpQueryDTO,
} from '../../dtos/requests/packaging.request.dto.js';
import { PackagingControllerMapper } from '../../mappers/packaging.controller.mapper.js';
import type { PackagingResponseDTO, PackagingListResponseDTO } from '../../../application/dtos/responses/packaging/packaging-response.dto.js';

@ApiTags('packagings')
@ApiBearerAuth('bearer')
@Controller('logistics/packagings')
@UseGuards(JwtAuthGuard)
export class PackagingController extends BaseController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { super(); }

  @Post() @HttpCode(HttpStatus.CREATED) @ApiOperation({ summary: 'Create packaging' })
  async create(@Body() dto: CreatePackagingHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<PackagingResponseDTO> {
    return this.commandBus.execute(new CreatePackagingCommand(PackagingControllerMapper.toCreateDto(dto), user.userId));
  }
  @Patch(':id') @ApiOperation({ summary: 'Update packaging' })
  async update(@Param('id') id: string, @Body() dto: UpdatePackagingHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<PackagingResponseDTO> {
    return this.commandBus.execute(new UpdatePackagingCommand(PackagingControllerMapper.toUpdateDto(id, dto), user.userId));
  }
  @Post(':id/restock') @ApiOperation({ summary: 'Restock packaging' })
  async restock(@Param('id') id: string, @Body() dto: RestockPackagingHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<PackagingResponseDTO> {
    return this.commandBus.execute(new RestockPackagingCommand(PackagingControllerMapper.toRestockDto(id, dto), user.userId));
  }
  @Post(':id/consume') @ApiOperation({ summary: 'Consume packaging stock' })
  async consume(@Param('id') id: string, @Body() dto: ConsumePackagingHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<PackagingResponseDTO> {
    return this.commandBus.execute(new ConsumePackagingCommand(PackagingControllerMapper.toConsumeDto(id, dto), user.userId));
  }
  @Patch(':id/stock') @ApiOperation({ summary: 'Adjust packaging stock' })
  async adjustStock(@Param('id') id: string, @Body() dto: AdjustPackagingStockHttpDTO, @CurrentUser() user: CurrentUserShape): Promise<PackagingResponseDTO> {
    return this.commandBus.execute(new AdjustPackagingStockCommand(PackagingControllerMapper.toAdjustDto(id, dto), user.userId));
  }
  @Post('select') @ApiOperation({ summary: 'Select suitable packagings for given load' })
  async select(@Body() dto: SelectPackagingHttpDTO): Promise<readonly PackagingResponseDTO[]> {
    return this.commandBus.execute(new SelectPackagingCommand(PackagingControllerMapper.toSelectDto(dto)));
  }
  @Get() @ApiOperation({ summary: 'List packagings' })
  async list(@Query() q: ListPackagingsHttpQueryDTO): Promise<PackagingListResponseDTO> {
    return this.queryBus.execute(new ListPackagingsQuery(PackagingControllerMapper.toListOptions(q)));
  }
  @Get(':id') @ApiOperation({ summary: 'Get packaging by id' })
  async getById(@Param('id') id: string): Promise<PackagingResponseDTO> {
    return this.queryBus.execute(new GetPackagingQuery(id));
  }
}
