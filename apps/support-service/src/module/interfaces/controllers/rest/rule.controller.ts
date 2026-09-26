/**
 * RuleController — HTTP adapter
 * @module support-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, CurrentUser } from '@vubon/shared-kernel/interfaces';

import { CreateRuleCommand } from '../../../application/commands/rule/create-rule.command';
import { UpdateRuleCommand } from '../../../application/commands/rule/update-rule.command';
import { ActivateRuleCommand } from '../../../application/commands/rule/activate-rule.command';
import { DeactivateRuleCommand } from '../../../application/commands/rule/deactivate-rule.command';
import { GetRuleQuery } from '../../../application/queries/rule/get-rule.query';
import { ListRulesQuery } from '../../../application/queries/rule/list-rules.query';

import { CreateRuleRequestDTO } from '../../dtos/requests/rule/create-rule.dto';
import { UpdateRuleRequestDTO } from '../../dtos/requests/rule/update-rule.dto';
import { RuleResponseDTO } from '../../dtos/responses/rule-response.dto';
import { RuleControllerMapper } from '../../mappers/rule.controller.mapper';

@ApiTags('Rules')
@ApiBearerAuth()
@Controller({ path: 'rules', version: '1' })
export class RuleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: RuleControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateRuleRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<RuleResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateRuleCommand({
        name: body.name,
        description: body.description,
        type: body.type as never,
        priority: body.priority,
        conditions: body.conditions.map((c) => ({
          field: c.field,
          operator: c.operator as never,
          value: c.value,
        })),
        actions: body.actions.map((a) => ({
          action: a.action as never,
          params: a.params,
        })),
        stopOnMatch: body.stopOnMatch,
        createdBy: userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<RuleResponseDTO> {
    const result = await this.queryBus.execute(new GetRuleQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly RuleResponseDTO[]> {
    const result = await this.queryBus.execute(new ListRulesQuery(1, 20));
    return result.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRuleRequestDTO,
  ): Promise<RuleResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateRuleCommand({
        ruleId: id,
        name: body.name,
        description: body.description,
        priority: body.priority,
        conditions: body.conditions?.map((c) => ({
          field: c.field,
          operator: c.operator as never,
          value: c.value,
        })),
        actions: body.actions?.map((a) => ({
          action: a.action as never,
          params: a.params,
        })),
        stopOnMatch: body.stopOnMatch,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/activate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async activate(@Param('id') id: string): Promise<RuleResponseDTO> {
    const result = await this.commandBus.execute(new ActivateRuleCommand(id));
    return this.mapper.toResponse(result);
  }

  @Post(':id/deactivate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async deactivate(@Param('id') id: string): Promise<RuleResponseDTO> {
    const result = await this.commandBus.execute(new DeactivateRuleCommand(id));
    return this.mapper.toResponse(result);
  }
}
