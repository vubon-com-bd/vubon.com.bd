import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CurrentUser,
  JwtAuthGuard,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { CreateReportCommand } from '../../../application/commands/report/create-report.command';
import { GenerateReportCommand } from '../../../application/commands/report/generate-report.command';
import { ScheduleReportCommand } from '../../../application/commands/report/schedule-report.command';
import { ExportReportCommand } from '../../../application/commands/report/export-report.command';
import { ListReportsQuery } from '../../../application/queries/report/list-reports.query';
import { GetReportQuery } from '../../../application/queries/report/get-report.query';
import { ListScheduledReportsQuery } from '../../../application/queries/report/list-scheduled-reports.query';
import {
  CreateReportRequestDTO,
  GenerateReportRequestDTO,
  ScheduleReportRequestDTO,
  ExportReportRequestDTO,
} from '../../dtos/requests';
import { ReportSwagger } from '../../swagger/report.swagger';
import { ReportOwnerGuard } from '../../guards/report-owner.guard';

@ReportSwagger.Tag()
@Controller('analytics/reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ReportSwagger.Create()
  async create(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: CreateReportRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new CreateReportCommand(body.type, body.format, user.userId),
    );
  }

  @Get()
  @ReportSwagger.List()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListReportsQuery(user.userId));
  }

  @Get('scheduled')
  @ReportSwagger.List()
  async listScheduled(@Query('beforeDate') beforeDate: string): Promise<unknown> {
    return this.queryBus.execute(
      new ListScheduledReportsQuery(beforeDate ?? new Date().toISOString()),
    );
  }

  @Get(':id')
  @ReportSwagger.Get()
  @UseGuards(ReportOwnerGuard)
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetReportQuery(id));
  }

  @Post(':id/generate')
  @HttpCode(HttpStatus.OK)
  @ReportSwagger.Generate()
  @UseGuards(ReportOwnerGuard)
  async generate(
    @Param('id') id: string,
    @Body() body: GenerateReportRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateReportCommand(id, body.fromDate, body.toDate, body.filters),
    );
  }

  @Post(':id/schedule')
  @HttpCode(HttpStatus.OK)
  @ReportSwagger.Schedule()
  @UseGuards(ReportOwnerGuard)
  async schedule(
    @Param('id') id: string,
    @Body() body: ScheduleReportRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ScheduleReportCommand(
        id,
        body.frequency,
        body.cronExpression,
        body.recipients,
      ),
    );
  }

  @Post(':id/export')
  @HttpCode(HttpStatus.OK)
  @ReportSwagger.Export()
  @UseGuards(ReportOwnerGuard)
  async export(
    @Param('id') id: string,
    @Body() body: ExportReportRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new ExportReportCommand(id, body.format, body.filename),
    );
  }
}
