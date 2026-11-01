/**
 * Verify Backup Code HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/auth
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class VerifyBackupCodeHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  challengeId!: string;

  @ApiProperty({ example: 'ABCD1234EF' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  code!: string;
}
