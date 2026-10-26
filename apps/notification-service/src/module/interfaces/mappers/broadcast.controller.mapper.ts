/**
 * BroadcastControllerMapper — HTTP DTO ↔ App DTO
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateBroadcastRequestDTO,
  StartBroadcastRequestDTO,
} from '@application/dtos/requests/broadcast/index.js';
import type { BroadcastListOptionsDTO } from '@application/services/interfaces/broadcast.service.interface.js';
import type {
  BroadcastResponseDTO,
  BroadcastSummaryResponseDTO,
  BroadcastListResponseDTO,
  BroadcastResultResponseDTO,
} from '@application/dtos/responses/broadcast-response.dto.js';
import {
  BroadcastHttpResponseDTO,
  BroadcastSummaryHttpResponseDTO,
  BroadcastListHttpResponseDTO,
  BroadcastResultHttpResponseDTO,
} from '@interfaces/dtos/responses/broadcast.response.dto.js';

export interface CreateBroadcastHttpDTO {
  readonly name: string;
  readonly type: string;
  readonly target: string;
  readonly channels: readonly string[];
  readonly templateId?: string;
  readonly content?: string;
  readonly recipientIds?: readonly string[];
  readonly segmentId?: string;
  readonly scheduledAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface StartBroadcastHttpDTO {
  readonly approvedBy?: string;
  readonly testMode?: boolean;
  readonly testRecipientIds?: readonly string[];
}

export interface ListBroadcastsHttpQueryDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: string;
  readonly type?: string;
  readonly target?: string;
}

export class BroadcastControllerMapper {
  static toCreateRequestDTO(dto: CreateBroadcastHttpDTO): CreateBroadcastRequestDTO {
    return {
      name: dto.name,
      type: dto.type as never,
      target: dto.target as never,
      channels: dto.channels as never,
      templateId: dto.templateId,
      content: dto.content,
      recipientIds: dto.recipientIds ? [...dto.recipientIds] : undefined,
      segmentId: dto.segmentId,
      scheduledAt: dto.scheduledAt,
      metadata: dto.metadata,
    };
  }

  static toStartRequestDTO(
    broadcastId: string,
    dto: StartBroadcastHttpDTO,
  ): StartBroadcastRequestDTO {
    return {
      broadcastId,
      approvedBy: dto.approvedBy,
      testMode: dto.testMode,
      testRecipientIds: dto.testRecipientIds ? [...dto.testRecipientIds] : undefined,
    };
  }

  static toListOptions(q: ListBroadcastsHttpQueryDTO): BroadcastListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: { status: q.status, type: q.type, target: q.target },
    };
  }

  static toHttpResponse(app: BroadcastResponseDTO): BroadcastHttpResponseDTO {
    return app as unknown as BroadcastHttpResponseDTO;
  }

  static toSummaryHttp(app: BroadcastSummaryResponseDTO): BroadcastSummaryHttpResponseDTO {
    return app as unknown as BroadcastSummaryHttpResponseDTO;
  }

  static toListHttp(app: BroadcastListResponseDTO): BroadcastListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toResultHttp(app: BroadcastResultResponseDTO): BroadcastResultHttpResponseDTO {
    return app as unknown as BroadcastResultHttpResponseDTO;
  }
}
