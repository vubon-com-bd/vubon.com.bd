/**
 * DigestControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateDigestHttpDTO,
  UpdateDigestHttpDTO,
  GenerateDigestHttpDTO,
  SendDigestHttpDTO,
  DigestPreviewHttpQueryDTO,
  ListDigestsHttpQueryDTO,
} from '../dtos/requests/digest/digest.http-dto.js';
import type {
  CreateDigestRequestDTO,
  UpdateDigestRequestDTO,
  GenerateDigestRequestDTO,
  SendDigestRequestDTO,
  DigestPreviewRequestDTO,
  ListDigestsRequestDTO,
} from '../../application/dtos/requests/digest/digest.dto.js';

export class DigestControllerMapper {
  static toCreateAppDto(dto: CreateDigestHttpDTO): CreateDigestRequestDTO {
    return {
      userId: dto.userId,
      frequency: dto.frequency as never,
      type: dto.type as never,
      periodStart: dto.periodStart,
      periodEnd: dto.periodEnd,
      itemIds: dto.itemIds,
      channel: dto.channel,
    };
  }

  static toUpdateAppDto(digestId: string, dto: UpdateDigestHttpDTO): UpdateDigestRequestDTO {
    return {
      digestId,
      frequency: dto.frequency as never,
      type: dto.type as never,
    };
  }

  static toGenerateAppDto(dto: GenerateDigestHttpDTO): GenerateDigestRequestDTO {
    return {
      userId: dto.userId,
      frequency: dto.frequency as never,
      type: dto.type as never,
      periodStart: dto.periodStart,
      periodEnd: dto.periodEnd,
    };
  }

  static toSendAppDto(digestId: string, dto: SendDigestHttpDTO): SendDigestRequestDTO {
    return { digestId, channel: dto.channel };
  }

  static toPreviewAppDto(q: DigestPreviewHttpQueryDTO): DigestPreviewRequestDTO {
    return { userId: q.userId, frequency: q.frequency as never };
  }

  static toListAppDto(q: ListDigestsHttpQueryDTO): ListDigestsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: 'createdAt',
      sortDir: 'desc',
      filter: {
        userId: q.userId,
        status: q.status,
        frequency: q.frequency,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
