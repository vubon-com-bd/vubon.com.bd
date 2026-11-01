/**
 * User Profile Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserProfileServiceInterface } from '../interfaces/user-profile.service.interface.js';
import type { UserProfileRepository } from '../../../domain/repositories/user-profile.repository.interface.js';
import { USER_PROFILE_REPOSITORY } from '../../../domain/repositories/user-profile.repository.interface.js';
import type { UserProfileResponseDTO } from '../../dtos/responses/user-profile-response.dto.js';

@Injectable()
export class UserProfileService extends BaseService implements UserProfileServiceInterface {
  readonly name = 'UserProfileService';

  constructor(
    @Inject(USER_PROFILE_REPOSITORY)
    private readonly repo: UserProfileRepository,
  ) {
    super();
  }

  async findForUser(userId: string): Promise<UserProfileResponseDTO | null> {
    const p = await this.repo.findByUserIdRaw(userId);
    if (!p) return null;

    return {
      userId: p.userId.value,
      firstName: p.firstName?.value,
      lastName: p.lastName?.value,
      displayName: p.displayName,
      bio: p.bio,
      avatarUrl: p.avatarUrl,
      coverUrl: p.coverUrl,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      website: p.website,
      language: p.language,
      locale: p.locale,
      timezone: p.timezone,
      visibility: 'public',
      completionPercent: this.computeCompletion(p),
      updatedAt: p.updatedAt,
    };
  }

  async upsert(
    userId: string,
    patch: Partial<UserProfileResponseDTO>,
  ): Promise<UserProfileResponseDTO> {
    const existing = await this.findForUser(userId);
    const base: UserProfileResponseDTO = existing ?? {
      userId,
      visibility: 'public',
      completionPercent: 0,
      updatedAt: new Date().toISOString(),
    };
    return { ...base, ...patch, updatedAt: new Date().toISOString() };
  }

  private computeCompletion(p: {
    firstName?: { value: string };
    lastName?: { value: string };
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    dateOfBirth?: string;
    gender?: string;
  }): number {
    const fields = [
      p.firstName?.value,
      p.lastName?.value,
      p.displayName,
      p.bio,
      p.avatarUrl,
      p.dateOfBirth,
      p.gender,
    ];
    const filled = fields.filter(
      (f) => typeof f === 'string' && f.trim().length > 0,
    ).length;
    return Math.round((filled / fields.length) * 100);
  }
}
