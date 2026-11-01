/**
 * Team HTTP Response DTOs
 * @module vendor-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamMemberHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly vendorId!: string;
  @ApiProperty() readonly userId!: string;
  @ApiProperty() readonly role!: string;
  @ApiProperty() readonly status!: string;
  @ApiPropertyOptional() readonly inviteStatus?: string;
  @ApiProperty() readonly email!: string;
  @ApiProperty() readonly fullName!: string;
  @ApiProperty({ type: [String] })
  readonly permissions!: readonly string[];
  @ApiProperty() readonly invitedAt!: string;
  @ApiPropertyOptional() readonly invitedBy?: string;
  @ApiPropertyOptional() readonly joinedAt?: string;
  @ApiPropertyOptional() readonly lastActiveAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}

export class TeamInviteHttpResponseDTO {
  @ApiProperty() readonly success!: true;
  @ApiProperty() readonly inviteId!: string;
  @ApiProperty() readonly email!: string;
  @ApiProperty() readonly role!: string;
  @ApiProperty() readonly expiresAt!: string;
}

export class TeamMemberSummaryHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly fullName!: string;
  @ApiProperty() readonly email!: string;
  @ApiProperty() readonly role!: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly isActive!: boolean;
}

export class TeamListHttpResponseDTO {
  @ApiProperty({ type: [TeamMemberSummaryHttpResponseDTO] })
  readonly items!: readonly TeamMemberSummaryHttpResponseDTO[];
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly activeCount!: number;
}

export class TeamStatsHttpResponseDTO {
  @ApiProperty() readonly total!: number;
  @ApiProperty() readonly active!: number;
  @ApiProperty() readonly invited!: number;
  @ApiProperty() readonly suspended!: number;
  @ApiProperty() readonly removed!: number;
  @ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
  readonly byRole!: Readonly<Record<string, number>>;
}
