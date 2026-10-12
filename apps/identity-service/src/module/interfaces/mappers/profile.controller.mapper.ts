import type { UserProfileResponseDTO } from '../../application/dtos/responses/user-profile-response.dto.js';
import type { ProfileHttpResponseDTO } from '../dtos/responses/profile.response.dto.js';

export class ProfileControllerMapper {
  static toHttpResponse(app: UserProfileResponseDTO): ProfileHttpResponseDTO {
    return {
      userId: app.userId,
      firstName: app.firstName,
      lastName: app.lastName,
      displayName: app.displayName,
      bio: app.bio,
      avatarUrl: app.avatarUrl,
      coverUrl: app.coverUrl,
      gender: app.gender,
      dateOfBirth: app.dateOfBirth,
      website: app.website,
      language: app.language,
      locale: app.locale,
      timezone: app.timezone,
      visibility: app.visibility,
      completionPercent: app.completionPercent,
      updatedAt: app.updatedAt,
    };
  }
}
