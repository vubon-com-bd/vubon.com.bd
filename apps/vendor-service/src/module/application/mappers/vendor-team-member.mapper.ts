/**
 * VendorTeamMemberMapper
 * @module vendor-service/application/mappers
 */
import type { VendorTeamMemberEntity } from '../../domain/entities/vendor-team-member.entity.js';
import type {
  VendorTeamMemberResponseDto,
  VendorTeamMemberPublicDto,
} from '../dtos/responses/vendor-team-member-response.dto.js';

export class VendorTeamMemberMapper {
  static toResponse(entity: VendorTeamMemberEntity): VendorTeamMemberResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      userId: entity.userId,
      email: entity.email.value,
      name: entity.name.value,
      role: entity.role.value as VendorTeamMemberResponseDto['role'],
      status: entity.status.value as VendorTeamMemberResponseDto['status'],
      permissions: entity.permissions.map((p) => p.value),
      joinedAt: entity.joinedAt,
      lastActiveAt: entity.lastActiveAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublic(entity: VendorTeamMemberEntity): VendorTeamMemberPublicDto {
    return {
      userId: entity.userId,
      name: entity.name.value,
      email: entity.email.value,
      role: entity.role.value as VendorTeamMemberPublicDto['role'],
      status: entity.status.value as VendorTeamMemberPublicDto['status'],
      joinedAt: entity.joinedAt,
    };
  }

  static toResponseList(
    entities: readonly VendorTeamMemberEntity[],
  ): readonly VendorTeamMemberResponseDto[] {
    return entities.map((e) => VendorTeamMemberMapper.toResponse(e));
  }

  static toPublicList(
    entities: readonly VendorTeamMemberEntity[],
  ): readonly VendorTeamMemberPublicDto[] {
    return entities.map((e) => VendorTeamMemberMapper.toPublic(e));
  }
}
