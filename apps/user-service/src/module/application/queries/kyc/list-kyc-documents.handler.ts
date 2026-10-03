/**
 * ListKycDocumentsHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListKycDocumentsQuery } from './list-kyc-documents.query.js';
import { USER_KYC_REPOSITORY } from '@domain/repositories/user-kyc.repository.interface';
import type { UserKycRepository } from '@domain/repositories/user-kyc.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserKycMapper } from '../../mappers/user-kyc.mapper.js';
import type { KycResponseDTO } from '../../dtos/responses/kyc-response.dto.js';

export interface ListKycDocumentsResult {
  readonly items: readonly KycResponseDTO[];
  readonly total: number;
}

@QueryHandler(ListKycDocumentsQuery)
export class ListKycDocumentsHandler
  implements IQueryHandler<ListKycDocumentsQuery, ListKycDocumentsResult>
{
  constructor(
    @Inject(USER_KYC_REPOSITORY)
    private readonly kycRepo: UserKycRepository
  ) {}

  async execute(query: ListKycDocumentsQuery): Promise<ListKycDocumentsResult> {
    const items = await this.kycRepo.findAllByUserId(UserIdVO.create(query.userId));
    return {
      items: UserKycMapper.toResponseList(items),
      total: items.length,
    };
  }
}
