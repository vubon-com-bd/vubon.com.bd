/**
 * VendorVerificationController — REST endpoints for verification
 * @module vendor-service/interfaces/controllers/rest
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { SubmitVerificationCommand } from '../../../application/commands/verification/submit-verification.command.js';
import { ReverifyCommand } from '../../../application/commands/verification/reverify.command.js';

import { GetVerificationQuery } from '../../../application/queries/verification/get-verification.query.js';
import { ListDocumentsQuery } from '../../../application/queries/verification/list-documents.query.js';

import {
  SubmitVerificationHttpDTO,
  ReverifyHttpDTO,
} from '../../dtos/requests/verification.request.dto.js';
import type {
  VerificationHttpResponseDTO,
  VerificationListHttpResponseDTO,
} from '../../dtos/responses/verification.response.dto.js';

@ApiTags('vendor-verifications')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/verifications')
@UseGuards(JwtAuthGuard)
export class VendorVerificationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a verification' })
  async submit(
    @Param('vendorId') vendorId: string,
    @Body() dto: SubmitVerificationHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VerificationHttpResponseDTO> {
    return this.commandBus.execute(
      new SubmitVerificationCommand({ ...dto, vendorId, type: dto.type as never }, user.userId),
    );
  }

  @Post(':verificationId/reverify')
  @ApiOperation({ summary: 'Reverify' })
  async reverify(
    @Param('verificationId') verificationId: string,
    @Body() dto: ReverifyHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VerificationHttpResponseDTO> {
    return this.commandBus.execute(
      new ReverifyCommand(
        { verificationId, referenceId: dto.referenceId },
        user.userId,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List verifications for vendor' })
  async list(
    @Param('vendorId') vendorId: string,
  ): Promise<VerificationListHttpResponseDTO> {
    void vendorId;
    return this.queryBus.execute(new ListDocumentsQuery(vendorId));
  }

  @Get(':verificationId')
  @ApiOperation({ summary: 'Get verification by ID' })
  async getById(
    @Param('verificationId') verificationId: string,
  ): Promise<VerificationHttpResponseDTO> {
    return this.queryBus.execute(new GetVerificationQuery(verificationId));
  }
}
