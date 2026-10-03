/**
 * GetProfileHandler
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetProfileQuery } from './get-profile.query.js';
import { USER_PROFILE_REPOSITORY } from '@domain/repositories/user-profile.repository.interface';
import type { UserProfileRepository } from '@domain/repositories/user-profile.repository.interface';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserProfileMapper } from '../../mappers/user-profile.mapper.js';
import type { ProfileResponseDTO } from '../../dtos/responses/profile-response.dto.js';
import { ProfileNotFoundApplicationError } from '../../errors/profile.errors.js';

@QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements IQueryHandler<GetProfileQuery, ProfileResponseDTO>
{
  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly profileRepo: UserProfileRepository
  ) {}

  async execute(query: GetProfileQuery): Promise<ProfileResponseDTO> {
    const profile = await this.profileRepo.findByUserId(UserIdVO.create(query.userId));
    if (!profile) throw new ProfileNotFoundApplicationError(query.userId);
    return UserProfileMapper.toResponse(profile);
  }
}
