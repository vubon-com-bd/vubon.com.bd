import { ApiProperty } from '@nestjs/swagger';
import type { UserProfileResponseDTO } from '../../../application/dtos/responses/user-profile-response.dto';

export class ProfileResponseDTO implements UserProfileResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      userId: { type: 'string' },
      visibility: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      displayName: { type: 'string' },
      avatarUrl: { type: 'string', nullable: true },
      bio: { type: 'string', nullable: true },
      updatedAt: { type: 'string' },
    },
  })
  profile!: UserProfileResponseDTO['profile'];
}
