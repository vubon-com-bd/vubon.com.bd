import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { GenerateReportCommand } from '../../../application/commands/report/generate-report.command';
import { GetReportQuery } from '../../../application/queries/report/get-report.query';
import { ListReportsQuery } from '../../../application/queries/report/list-reports.query';
import { MarketingReportResponseDto } from '../../dtos/responses/marketing-report.response.dto';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class MarketingReportController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  async generate(
    @Body() body: { name: string; reportType: string; format?: string },
  ): Promise<unknown> {
    return this.commandBus.execute(
      new GenerateReportCommand(body.name, body.reportType, body.format),
    );
  }

  @Get()
  async list(): Promise<readonly MarketingReportResponseDto[]> {
    const result = await this.queryBus.execute(new ListReportsQuery(1, 20));
    return result as readonly MarketingReportResponseDto[];
  }

  @Get(':id')
  async get(@Param('id', new ParseUUIDPipe()) id: string): Promise<unknown> {
    return this.queryBus.execute(new GetReportQuery(id));
  }
}
