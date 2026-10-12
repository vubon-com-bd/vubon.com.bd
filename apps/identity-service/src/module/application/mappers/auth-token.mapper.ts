import type { TokenEntity } from '../../domain/entities/token.entity.js';

export interface AuthTokenDTO {
  readonly id: string;
  readonly type: string;
  readonly jti: string;
  readonly expiresAt: number;
  readonly revoked: boolean;
  readonly used: boolean;
}

export class AuthTokenMapper {
  static toDTO(entity: TokenEntity): AuthTokenDTO {
    return {
      id: entity.id,
      type: entity.type.value,
      jti: entity.jti,
      expiresAt: entity.expiry.expiresAt,
      revoked: entity.isRevoked(),
      used: entity.isUsed(),
    };
  }
  static toDTOList(entities: readonly TokenEntity[]): readonly AuthTokenDTO[] {
    return entities.map((e) => this.toDTO(e));
  }
}
