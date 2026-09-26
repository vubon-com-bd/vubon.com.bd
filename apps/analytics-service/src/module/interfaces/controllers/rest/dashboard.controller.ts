import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateDashboardCommand } from '../../../application/commands/dashboard/create-dashboard.command';
import { UpdateDashboardCommand } from '../../../application/commands/dashboard/update-dashboard.command';
import { AddWidgetCommand } from '../../../application/commands/dashboard/add-widget.command';
import { RemoveWidgetCommand } from '../../../application/commands/dashboard/remove-widget.command';
import { ListDashboardsQuery } from '../../../application/queries/dashboard/list-dashboards.query';
import { GetDashboardQuery } from '../../../application/queries/dashboard/get-dashboard.query';
import { GetDashboardDataQuery } from '../../../application/queries/dashboard/get-dashboard-data.query';
import {
  CreateDashboardRequestDTO,
  UpdateDashboardRequestDTO,
  AddWidgetRequestDTO,
} from '../../dtos/requests';
import { DashboardSwagger } from '../../swagger/dashboard.swagger';
import { DashboardOwnerGuard } from '../../guards/dashboard-owner.guard';

@DashboardSwagger.Tag()
@Controller('analytics/dashboards')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @DashboardSwagger.Create()
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateDashboardRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateDashboardCommand(body.name, user.userId, body.layout),
    );
  }

  @Get()
  @DashboardSwagger.List()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListDashboardsQuery(user.userId));
  }

  @Get(':id')
  @DashboardSwagger.Get()
  @UseGuards(DashboardOwnerGuard)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetDashboardQuery(id));
  }

  @Put(':id')
  @DashboardSwagger.Update()
  @UseGuards(DashboardOwnerGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateDashboardRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new UpdateDashboardCommand(id, body.name, body.layout),
    );
  }

  @Post(':id/widgets')
  @HttpCode(HttpStatus.CREATED)
  @DashboardSwagger.AddWidget()
  @UseGuards(DashboardOwnerGuard)
  async addWidget(
    @Param('id') id: string,
    @Body() body: AddWidgetRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddWidgetCommand(
        id,
        body.widgetType,
        body.metricName,
        body.config ?? {},
        body.position,
      ),
    );
  }

  @Delete(':id/widgets/:widgetId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DashboardSwagger.RemoveWidget()
  @UseGuards(DashboardOwnerGuard)
  async removeWidget(
    @Param('id') id: string,
    @Param('widgetId') widgetId: string,
  ): Promise<void> {
    return this.commandBus.execute(new RemoveWidgetCommand(id, widgetId));
  }

  @Get(':id/data')
  @DashboardSwagger.GetData()
  @UseGuards(DashboardOwnerGuard)
  async getData(
    @Param('id') id: string,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetDashboardDataQuery(id, fromDate, toDate));
  }
}
