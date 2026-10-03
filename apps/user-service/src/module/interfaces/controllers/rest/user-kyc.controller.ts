/**
 * UserKycController
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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import { SubmitKycCommand } from '@application/commands/kyc/submit-kyc.command';
import { VerifyKycCommand } from '@application/commands/kyc/verify-kyc.command';
import { RejectKycCommand } from '@application/commands/kyc/reject-kyc.command';
import { GetKycStatusQuery } from '@application/queries/kyc/get-kyc-status.query';
import { ListKycDocumentsQuery } from '@application/queries/kyc/list-kyc-documents.query';
import {
  SubmitKycRequestDto,
  RejectKycRequestDto,
} from '../../dtos/requests/kyc.request.dto.js';
import { KycResponseDto, KycListResponseDto } from '../../dtos/responses/kyc.response.dto.js';
import { KycControllerMapper } from '../../mappers/kyc.controller.mapper.js';
import {
  ApiGetKycStatus,
  ApiListKycDocuments,
  ApiSubmitKyc,
  ApiVerifyKyc,
  ApiRejectKyc,
} from '../../swagger/kyc.swagger.js';

@ApiTags('user-kyc')
@Controller('users/:userId/kyc')
export class UserKycController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiGetKycStatus()
  async getStatus(@Param('userId') userId: string): Promise<KycResponseDto> {
    const appDto = await this.queryBus.execute(new GetKycStatusQuery(userId));
    return KycControllerMapper.toResponse(appDto);
  }

  @Get('documents')
  @UseGuards(JwtAuthGuard)
  @ApiListKycDocuments()
  async listDocuments(
    @Param('userId') userId: string
  ): Promise<KycListResponseDto> {
    const result = await this.queryBus.execute(new ListKycDocumentsQuery(userId));
    return KycControllerMapper.toListResponse(result.items);
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiSubmitKyc()
  async submit(
    @Param('userId') userId: string,
    @Body() body: SubmitKycRequestDto
  ): Promise<KycResponseDto> {
    const appDto = KycControllerMapper.toSubmitAppDto(userId, body);
    const result = await this.commandBus.execute(new SubmitKycCommand(appDto));
    return KycControllerMapper.toResponse(result);
  }

  @Post(':kycId/verify')
  @UseGuards(JwtAuthGuard)
  @ApiVerifyKyc()
  async verify(@Param('kycId') kycId: string): Promise<KycResponseDto> {
    const result = await this.commandBus.execute(
      new VerifyKycCommand(kycId, 'system')
    );
    return KycControllerMapper.toResponse(result);
  }

  @Post(':kycId/reject')
  @UseGuards(JwtAuthGuard)
  @ApiRejectKyc()
  async reject(
    @Param('kycId') kycId: string,
    @Body() body: RejectKycRequestDto
  ): Promise<KycResponseDto> {
    const appDto = KycControllerMapper.toRejectAppDto(kycId, body);
    const result = await this.commandBus.execute(
      new RejectKycCommand(appDto.kycId, appDto.reason, appDto.rejectedBy)
    );
    return KycControllerMapper.toResponse(result);
  }
}
