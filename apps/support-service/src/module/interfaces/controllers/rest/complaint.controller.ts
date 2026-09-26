/**
 * ComplaintController — HTTP adapter
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
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, CurrentUser } from '@vubon/shared-kernel/interfaces';

import { FileComplaintCommand } from '../../../application/commands/complaint/file-complaint.command';
import { ResolveComplaintCommand } from '../../../application/commands/complaint/resolve-complaint.command';
import { EscalateComplaintCommand } from '../../../application/commands/complaint/escalate-complaint.command';
import { GetComplaintQuery } from '../../../application/queries/complaint/get-complaint.query';
import { ListComplaintsQuery } from '../../../application/queries/complaint/list-complaints.query';

import { FileComplaintRequestDTO } from '../../dtos/requests/complaint/file-complaint.dto';
import { ResolveComplaintRequestDTO } from '../../dtos/requests/complaint/resolve-complaint.dto';
import { ComplaintResponseDTO } from '../../dtos/responses/complaint-response.dto';
import { ComplaintControllerMapper } from '../../mappers/complaint.controller.mapper';

@ApiTags('Complaints')
@ApiBearerAuth()
@Controller({ path: 'complaints', version: '1' })
export class ComplaintController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly mapper: ComplaintControllerMapper,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async file(
    @Body() body: FileComplaintRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<ComplaintResponseDTO> {
    const result = await this.commandBus.execute(
      new FileComplaintCommand({
        subject: body.subject,
        description: body.description,
        type: body.type as never,
        severity: body.severity as never,
        userId,
        orderId: body.orderId,
        productId: body.productId,
        attachments: body.attachments,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<ComplaintResponseDTO> {
    const result = await this.queryBus.execute(new GetComplaintQuery(id));
    return this.mapper.toResponse(result);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async list(): Promise<readonly ComplaintResponseDTO[]> {
    const result = await this.queryBus.execute(new ListComplaintsQuery(1, 20));
    return result.items.map((item: never) => this.mapper.toResponse(item));
  }

  @Post(':id/resolve')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async resolve(
    @Param('id') id: string,
    @Body() body: ResolveComplaintRequestDTO,
    @CurrentUser('userId') userId: string,
  ): Promise<ComplaintResponseDTO> {
    const result = await this.commandBus.execute(
      new ResolveComplaintCommand({
        complaintId: id,
        resolution: body.resolution,
        resolvedBy: userId,
      }),
    );
    return this.mapper.toResponse(result);
  }

  @Post(':id/escalate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async escalate(
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ): Promise<ComplaintResponseDTO> {
    const result = await this.commandBus.execute(
      new EscalateComplaintCommand({ complaintId: id, reason: body.reason }),
    );
    return this.mapper.toResponse(result);
  }
}
