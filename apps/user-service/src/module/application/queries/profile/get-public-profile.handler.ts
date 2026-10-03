/**
 * GetPublicProfileHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPublicProfileQuery } from './get-public-profile.query.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import { ProfileNotFoundApplicationError } from '../../errors/profile.errors.js';

@QueryHandler(GetPublicProfileQuery)
export class GetPublicProfileHandler
  implements IQueryHandler<GetPublicProfileQuery, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository
  ) {}

  async execute(query: GetPublicProfileQuery): Promise<ProfileResponseDTO> {
    const profile = await this.profileRepo.findByUserId(UserIdVO.create(query.userId));
    if (!profile) throw new ProfileNotFoundApplicationError(query.userId);
    // Public response could filter sensitive fields; here return same shape
    return UserProfileMapper.toResponse(profile);
  }
}
