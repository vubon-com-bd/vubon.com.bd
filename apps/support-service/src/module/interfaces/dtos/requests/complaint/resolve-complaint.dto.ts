/**
 * ResolveComplaintRequestDTO
 * @module support-service/interfaces/dtos/requests/complaint
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResolveComplaintRequestDTO {
  @ApiProperty({ example: 'Refund processed and vendor notified.' })
  @IsString()
  @MinLength(5)
  @MaxLength(5000)
  resolution!: string;
}
