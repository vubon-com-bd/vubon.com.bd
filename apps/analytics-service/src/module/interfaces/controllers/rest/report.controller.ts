/**
 * Report Controller
 */
import {
  Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query,
  UseGuards, UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser } from '@vubon/shared-kernel/interfaces/decorators';
import { CreateReportCommand } from '../../../application/commands/report/create-report.command.js';
import { GenerateReportCommand } from '../../../application/commands/report/generate-report.command.js';
import { ScheduleReportCommand } from '../../../application/commands/report/schedule-report.command.js';
import { GetReportQuery } from '../../../application/queries/report/get-report.query.js';
import { ListReportsQuery } from '../../../application/queries/report/list-reports.query.js';
import { ListScheduledReportsQuery } from '../../../application/queries/report/list-scheduled-reports.query.js';
import {
  CreateReportRequestDto, GenerateReportRequestDto, ScheduleReportRequestDto,
} from '../../dtos/requests/report.request.dto.js';
import { ReportResponseDto } from '../../dtos/responses/report.response.dto.js';
import { ReportControllerMapper } from '../../mappers/report.controller.mapper.js';
import { QueryTimeoutInterceptor } from '../../interceptors/query-timeout.interceptor.js';
import {
  ApiCreateReport, ApiGenerateReport, ApiScheduleReport,
  ApiGetReport, ApiListReports, ApiListScheduledReports,
} from '../../swagger/report.swagger.js';

interface RequestUser { readonly userId: string; }

@ApiTags('Analytics — Reports')
@Controller('analytics/reports')
@UseGuards(JwtAuthGuard)
@UseInterceptors(QueryTimeoutInterceptor)
export class ReportController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @ApiCreateReport()
  async create(
    @Body() body: CreateReportRequestDto,
    @CurrentUser() user: RequestUser
  ): Promise<ReportResponseDto> {
    const result = await this.commandBus.execute(new CreateReportCommand(body, user.userId));
    return ReportControllerMapper.toHttp(result);
  }

  @Post(':id/generate')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiGenerateReport()
  async generate(
    @Param('id') id: string,
    @Body() body: GenerateReportRequestDto
  ): Promise<ReportResponseDto> {
    const result = await this.commandBus.execute(new GenerateReportCommand(id, body));
    return ReportControllerMapper.toHttp(result);
  }

  @Post(':id/schedule')
  @HttpCode(HttpStatus.OK)
  @ApiScheduleReport()
  async schedule(
    @Param('id') id: string,
    @Body() body: ScheduleReportRequestDto
  ): Promise<ReportResponseDto> {
    const result = await this.commandBus.execute(new ScheduleReportCommand(id, body));
    return ReportControllerMapper.toHttp(result);
  }

  @Get('scheduled')
  @ApiListScheduledReports()
  async listScheduled(): Promise<ReportResponseDto[]> {
    const result = await this.queryBus.execute(new ListScheduledReportsQuery());
    return ReportControllerMapper.toHttpList(result);
  }

  @Get()
  @ApiListReports()
  async list(@CurrentUser() user: RequestUser): Promise<ReportResponseDto[]> {
    const result = await this.queryBus.execute(new ListReportsQuery(user.userId));
    return ReportControllerMapper.toHttpList(result);
  }

  @Get(':id')
  @ApiGetReport()
  async getOne(@Param('id') id: string): Promise<ReportResponseDto> {
    const result = await this.queryBus.execute(new GetReportQuery(id));
    return ReportControllerMapper.toHttp(result);
  }
}
