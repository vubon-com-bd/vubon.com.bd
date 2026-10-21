/**
 * VerificationController
 * @module payment-service/interfaces/controllers/rest
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
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';

import type {
  VerificationHttpResponseDTO as VerificationResponseDTO,
  VerificationInitiateHttpResponseDTO as VerificationInitiateResponseDTO,
} from '@interfaces/dtos/responses/verification-response.dto';

@ApiTags('verifications')
@ApiBearerAuth('bearer')
@Controller('verifications')
@UseGuards(JwtAuthGuard)
export class VerificationController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Post('payments/:paymentId')
  @HttpCode(HttpStatus.CREATED)
  async initiate(
    @Param('paymentId') paymentId: string,
    @Body() body: { method: string; ttlSeconds?: number },
  ): Promise<VerificationInitiateResponseDTO> {
    void this.commandBus;
    void body;
    // Placeholder — implement InitiateVerificationCommand
    return {
      success: true,
      verificationId: paymentId,
      status: 'pending' as never,
      expiresAt: new Date(Date.now() + 600_000).toISOString(),
    };
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.OK)
  async verify(
    @Param('id') id: string,
    @Body() body: { code: string },
  ): Promise<VerificationResponseDTO> {
    void this.queryBus;
    void body;
    // Placeholder
    throw new Error(`Verification ${id} — implementation pending`);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<VerificationResponseDTO> {
    void this.queryBus;
    throw new Error(`Verification ${id} — implementation pending`);
  }
}
