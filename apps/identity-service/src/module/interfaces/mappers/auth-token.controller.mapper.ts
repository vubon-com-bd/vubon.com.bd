/**
 * AuthTokenControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type {
  AuthTokenListItem,
} from '../../application/queries/auth/list-auth-tokens.handler.js';
import type {
  TokenListHttpResponseDTO,
  TokenSummaryHttpResponseDTO,
} from '../dtos/responses/token/token-list.response.dto.js';

export class AuthTokenControllerMapper {
  static toSummaryHttp(item: AuthTokenListItem): TokenSummaryHttpResponseDTO {
    return {
      id: item.id,
      type: item.type,
      issuedAt: item.issuedAt,
      expiresAt: item.expiresAt,
      revoked: item.revoked,
    };
  }

  static toHttpList(items: readonly AuthTokenListItem[]): TokenListHttpResponseDTO {
    return {
      success: true,
      tokens: items.map((i) => this.toSummaryHttp(i)),
      total: items.length,
    };
  }
}
