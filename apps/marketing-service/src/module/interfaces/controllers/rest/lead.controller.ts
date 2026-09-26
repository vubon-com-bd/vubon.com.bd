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
import { CreateLeadCommand } from '../../../application/commands/lead/create-lead.command';
import { QualifyLeadCommand } from '../../../application/commands/lead/qualify-lead.command';
import { ConvertLeadCommand } from '../../../application/commands/lead/convert-lead.command';
import { AssignLeadCommand } from '../../../application/commands/lead/assign-lead.command';
import { GetLeadQuery } from '../../../application/queries/lead/get-lead.query';
import { ListLeadsQuery } from '../../../application/queries/lead/list-leads.query';
import {
  CreateLeadRequestDTO,
  QualifyLeadRequestDTO,
  ConvertLeadRequestDTO,
  AssignLeadRequestDTO,
} from '../../dtos/requests/lead.request.dto';
import { LeadResponseDto } from '../../dtos/responses/lead.response.dto';
import { LeadSwagger } from '../../swagger/lead.swagger';

@LeadSwagger.Tag()
@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @LeadSwagger.Create()
  async create(@Body() body: CreateLeadRequestDTO): Promise<LeadResponseDto> {
    const result = await this.commandBus.execute(
      new CreateLeadCommand(body.name, body.email, body.source),
    );
    return result as LeadResponseDto;
  }

  @Get()
  async list(): Promise<readonly LeadResponseDto[]> {
    const result = await this.queryBus.execute(new ListLeadsQuery(1, 20));
    return result as readonly LeadResponseDto[];
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<LeadResponseDto | null> {
    const result = await this.queryBus.execute(new GetLeadQuery(id));
    return result as LeadResponseDto | null;
  }

  @Post('qualify')
  @HttpCode(HttpStatus.OK)
  @LeadSwagger.Qualify()
  async qualify(@Body() body: QualifyLeadRequestDTO): Promise<LeadResponseDto> {
    const result = await this.commandBus.execute(new QualifyLeadCommand(body.leadId));
    return result as LeadResponseDto;
  }

  @Post('convert')
  @HttpCode(HttpStatus.OK)
  @LeadSwagger.Convert()
  async convert(@Body() body: ConvertLeadRequestDTO): Promise<LeadResponseDto> {
    const result = await this.commandBus.execute(
      new ConvertLeadCommand(body.leadId, body.userId),
    );
    return result as LeadResponseDto;
  }

  @Post('assign')
  @HttpCode(HttpStatus.OK)
  async assign(@Body() body: AssignLeadRequestDTO): Promise<LeadResponseDto> {
    const result = await this.commandBus.execute(
      new AssignLeadCommand(body.leadId, body.assigneeId),
    );
    return result as LeadResponseDto;
  }
}
