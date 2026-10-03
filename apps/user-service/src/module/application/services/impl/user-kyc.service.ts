/**
 * UserKycService
 */
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { UserKycServiceInterface } from '../interfaces/user-kyc.service.interface.js';
import { SubmitKycCommand } from '../../commands/kyc/submit-kyc.command.js';
import { VerifyKycCommand } from '../../commands/kyc/verify-kyc.command.js';
import { RejectKycCommand } from '../../commands/kyc/reject-kyc.command.js';
import { ReverifyKycCommand } from '../../commands/kyc/reverify-kyc.command.js';
import { GetKycStatusQuery } from '../../queries/kyc/get-kyc-status.query.js';
import { ListKycDocumentsQuery } from '../../queries/kyc/list-kyc-documents.query.js';
import type { SubmitKycRequestDTO } from '../../dtos/requests/kyc/index.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';
import type { ListKycDocumentsResult } from '../../queries/kyc/list-kyc-documents.handler.js';

@Injectable()
export class UserKycService implements UserKycServiceInterface {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  getStatus(userId: string): Promise<KycResponseDTO> {
    return this.queryBus.execute(new GetKycStatusQuery(userId));
  }

  listDocuments(userId: string): Promise<ListKycDocumentsResult> {
    return this.queryBus.execute(new ListKycDocumentsQuery(userId));
  }

  submit(input: SubmitKycRequestDTO): Promise<KycResponseDTO> {
    return this.commandBus.execute(new SubmitKycCommand(input));
  }

  verify(kycId: string, verifiedBy: string): Promise<KycResponseDTO> {
    return this.commandBus.execute(new VerifyKycCommand(kycId, verifiedBy));
  }

  reject(
    kycId: string,
    reason: string,
    rejectedBy: string
  ): Promise<KycResponseDTO> {
    return this.commandBus.execute(new RejectKycCommand(kycId, reason, rejectedBy));
  }

  reverify(kycId: string, userId: string): Promise<KycResponseDTO> {
    return this.commandBus.execute(new ReverifyKycCommand(kycId, userId));
  }
}
