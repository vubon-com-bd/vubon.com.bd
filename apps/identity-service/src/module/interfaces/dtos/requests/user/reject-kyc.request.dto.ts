/**
 * Reject KYC HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class RejectKycHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  kycId!: string;

  @ApiProperty({ example: 'Document photo is unclear' })
  @IsString()
  @MinLength(5)
  @MaxLength(500)
  reason!: string;
}
