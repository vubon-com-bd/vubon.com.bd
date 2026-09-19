import { ApiProperty } from '@nestjs/swagger';
import type { UserKycResponseDTO } from '../../../application/dtos/responses/user-kyc-response.dto';

export class KycResponseDTO implements UserKycResponseDTO {
  @ApiProperty()
  success!: true;

  @ApiProperty({
    type: 'object',
    properties: {
      userId: { type: 'string' },
      status: { type: 'string' },
      level: { type: 'number' },
      documents: { type: 'array', items: { type: 'object' } },
      submittedAt: { type: 'string', nullable: true },
      reviewedAt: { type: 'string', nullable: true },
      rejectionReason: { type: 'string', nullable: true },
      updatedAt: { type: 'string' },
    },
  })
  kyc!: UserKycResponseDTO['kyc'];
}
