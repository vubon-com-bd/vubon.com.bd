/**
 * Dashboard Controller
 */
import {
  Body,
  Controller,
  Delete,
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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateDashboardCommand } from '../../../application/commands/dashboard/create-dashboard.command.js';
import { UpdateDashboardCommand } from '../../../application/commands/dashboard/update-dashboard.command.js';
import { AddWidgetCommand } from '../../../application/commands/dashboard/add-widget.command.js';
import { RemoveWidgetCommand } from '../../../application/commands/dashboard/remove-widget.command.js';
import { GetDashboardQuery } from '../../../application/queries/dashboard/get-dashboard.query.js';
import { ListDashboardsQuery } from '../../../application/queries/dashboard/list-dashboards.query.js';
import {
  CreateDashboardRequestDto,
  UpdateDashboardRequestDto,
  AddWidgetRequestDto,
} from '../../dtos/requests/dashboard.request.dto.js';
import { DashboardResponseDto, WidgetResponseDto } from '../../dtos/responses/dashboard.response.dto.js';
import { DashboardControllerMapper } from '../../mappers/dashboard.controller.mapper.js';
import {
  ApiCreateDashboard,
  ApiUpdateDashboard,
  ApiGetDashboard,
  ApiListDashboards,
  ApiAddWidget,
  ApiRemoveWidget,
} from '../../swagger/dashboard.swagger.js';

interface RequestUser {
  readonly userId: string;
}

@ApiTags('Analytics — Dashboards')
@Controller('analytics/dashboards')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiCreateDashboard()
  async create(
    @Body() body: CreateDashboardRequestDto,
    @CurrentUser() user: RequestUser
  ): Promise<DashboardResponseDto> {
    const result = await this.commandBus.execute(
      new CreateDashboardCommand(body, user.userId)
    );
    return DashboardControllerMapper.toHttp(result);
  }

  @Patch(':id')
  @ApiUpdateDashboard()
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDashboardRequestDto,
    @CurrentUser() user: RequestUser
  ): Promise<DashboardResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateDashboardCommand(id, body, user.userId)
    );
    return DashboardControllerMapper.toHttp(result);
  }

  @Get()
  @ApiListDashboards()
  async list(
    @CurrentUser() user: RequestUser,
    @Query('onlyOwned') onlyOwned?: string
  ): Promise<DashboardResponseDto[]> {
    const result = await this.queryBus.execute(
      new ListDashboardsQuery(user.userId, onlyOwned === 'true')
    );
    return DashboardControllerMapper.toHttpList(result);
  }

  @Get(':id')
  @ApiGetDashboard()
  async getOne(
    @Param('id') id: string,
    @CurrentUser() user: RequestUser
  ): Promise<DashboardResponseDto> {
    const result = await this.queryBus.execute(
      new GetDashboardQuery(id, user.userId)
    );
    return DashboardControllerMapper.toHttp(result);
  }

  @Post(':id/widgets')
  @ApiAddWidget()
  async addWidget(
    @Param('id') id: string,
    @Body() body: AddWidgetRequestDto,
    @CurrentUser() user: RequestUser
  ): Promise<DashboardResponseDto> {
    const result = await this.commandBus.execute(
      new AddWidgetCommand(id, body, user.userId)
    );
    return DashboardControllerMapper.toHttp(result);
  }

  @Delete(':id/widgets/:widgetId')
  @HttpCode(HttpStatus.OK)
  @ApiRemoveWidget()
  async removeWidget(
    @Param('id') id: string,
    @Param('widgetId') widgetId: string,
    @CurrentUser() user: RequestUser
  ): Promise<DashboardResponseDto> {
    const result = await this.commandBus.execute(
      new RemoveWidgetCommand(id, widgetId, user.userId)
    );
    return DashboardControllerMapper.toHttp(result);
  }
}
