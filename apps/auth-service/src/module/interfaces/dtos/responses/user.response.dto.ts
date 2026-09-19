import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { UserResponseDTO } from '../../../application/dtos/responses/user-response.dto';

export class UserResponseDTO_ implements UserResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      email: { type: 'string' },
      type: { type: 'string' },
      status: { type: 'string' },
      roles: { type: 'array', items: { type: 'string' } },
      isMfaEnabled: { type: 'boolean' },
      emailVerified: { type: 'boolean' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      deletedAt: { type: 'string', nullable: true },
    },
  })
  user!: UserResponseDTO['user'];
}
