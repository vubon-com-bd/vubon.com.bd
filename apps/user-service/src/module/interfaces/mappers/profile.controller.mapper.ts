import { Injectable } from '@nestjs/common';
import type { ProfileResponseDTO } from '../../application/dtos/responses/profile-response.dto';
import type { ProfileResponseDto } from '../dtos/responses/profile.response.dto';

@Injectable()
export class ProfileControllerMapper {
  toResponse(appDto: ProfileResponseDTO): ProfileResponseDto {
    const p = appDto.profile;
    return {
      userId: p.userId,
      visibility: p.visibility,
      avatarUrl: p.avatarUrl ?? undefined,
      bio: p.bio ?? undefined,
      updatedAt: p.updatedAt,
    };
  }
}
