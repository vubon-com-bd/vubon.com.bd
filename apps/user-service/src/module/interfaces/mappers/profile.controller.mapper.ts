/**
 * ProfileControllerMapper
 */
import type {
  UpdateProfileRequestDto,
  UpdateAvatarRequestDto,
  UpdateBioRequestDto,
  UpdateVisibilityRequestDto,
} from '../dtos/requests/profile.request.dto.js';
import { ProfileResponseDto } from '../dtos/responses/profile.response.dto.js';
import type { UpdateProfileRequestDTO } from '@application/dtos/requests/profile';
import type { ProfileResponseDTO } from '@application/dtos/responses/profile-response.dto';

export class ProfileControllerMapper {
  static toUpdateAppDto(
    userId: string,
    dto: UpdateProfileRequestDto
  ): UpdateProfileRequestDTO {
    return {
      userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      displayName: dto.displayName,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
      coverUrl: dto.coverUrl,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      website: dto.website,
      company: dto.company,
      designation: dto.designation,
      visibility: dto.visibility,
    };
  }

  static toAvatarAppDto(userId: string, dto: UpdateAvatarRequestDto) {
    return {
      userId,
      avatarUrl: dto.avatarUrl,
    };
  }

  static toBioAppDto(userId: string, dto: UpdateBioRequestDto) {
    return {
      userId,
      bio: dto.bio,
    };
  }

  static toVisibilityAppDto(userId: string, dto: UpdateVisibilityRequestDto) {
    return {
      userId,
      visibility: dto.visibility,
    };
  }

  static toResponse(app: ProfileResponseDTO): ProfileResponseDto {
    const res = new ProfileResponseDto();
    res.userId = app.userId;
    res.firstName = app.firstName;
    res.lastName = app.lastName;
    res.displayName = app.displayName;
    res.bio = app.bio;
    res.avatarUrl = app.avatarUrl;
    res.coverUrl = app.coverUrl;
    res.gender = app.gender;
    res.dateOfBirth = app.dateOfBirth;
    res.website = app.website;
    res.company = app.company;
    res.designation = app.designation;
    res.visibility = app.visibility;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
