/**
 * AutomationController — HTTP adapter
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

import { CreateAutomationCommand } from '../../../application/commands/automation/create-automation.command';
import { UpdateAutomationCommand } from '../../../application/commands/automation/update-automation.command';
import { EnableAutomationCommand } from '../../../application/commands/automation/enable-automation.command';
import { DisableAutomationCommand } from '../../../application/commands/automation/disable-automation.command';
import { TriggerAutomationCommand } from '../../../application/commands/automation/trigger-automation.command';
import { GetAutomationQuery } from '../../../application/queries/automation/get-automation.query';
import { ListAutomationsQuery } from '../../../application/queries/automation/list-automations.query';

import { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';
import { UpdateAutomationRequestDTO } from '../../dtos/requests/automation/update-automation.dto';
import { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import { AutomationControllerMapper } from '../../mappers/automation.controller.mapper';

@ApiTags('Automations')
@ApiBearerAuth()
@Controller({ path: 'automations', version: '1' })
export class AutomationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: AutomationControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: CreateAutomationRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<AutomationResponseDTO> {
    const result = await this.commandBus.execute(
      new CreateAutomationCommand({
        name: body.name,
        description: body.description,
        type: body.type as never,
        trigger: {
          type: body.triggerType as never,
        },
        steps: body.steps.map((s) => ({
          id: s.id,
          order: s.order,
          action: s.action,
          params: s.params ?? {},
          delayMinutes: s.delayMinutes,
        })),
        createdBy: userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<AutomationResponseDTO> {
    const result = await this.queryBus.execute(new GetAutomationQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly AutomationResponseDTO[]> {
    const result = await this.queryBus.execute(new ListAutomationsQuery(1, 20));
    return result.map((item: never) => this.mapper.toResponse(item));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAutomationRequestDTO,
  ): Promise<AutomationResponseDTO> {
    const result = await this.commandBus.execute(
      new UpdateAutomationCommand({
        automationId: id,
        name: body.name,
        description: body.description,
        steps: body.steps?.map((s) => ({
          id: s.id,
          order: s.order,
          action: s.action,
          params: s.params ?? {},
          delayMinutes: s.delayMinutes,
        })),
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/enable')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async enable(@Param('id') id: string): Promise<AutomationResponseDTO> {
    const result = await this.commandBus.execute(new EnableAutomationCommand(id));
    return this.mapper.toResponse(result);
  }

  @Post(':id/disable')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async disable(@Param('id') id: string): Promise<AutomationResponseDTO> {
    const result = await this.commandBus.execute(new DisableAutomationCommand(id));
    return this.mapper.toResponse(result);
  }

  @Post(':id/trigger')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async trigger(
    @Param('id') id: string,
    @Body() body: { outcome: 'success' | 'failure' | 'partial'; errorMessage?: string },
  ): Promise<AutomationResponseDTO> {
    const result = await this.commandBus.execute(
      new TriggerAutomationCommand(id, body.outcome, body.errorMessage),
    );
    return this.mapper.toResponse(result);
  }
}
