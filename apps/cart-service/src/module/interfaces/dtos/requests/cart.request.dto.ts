/**
 * Cart HTTP Request DTOs
 * @module cart-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCartHttpDTO {
  @ApiPropertyOptional({ enum: ['guest', 'user', 'wishlist', 'saved', 'subscription'], example: 'user' })
  readonly type?: 'guest' | 'user' | 'wishlist' | 'saved' | 'subscription';

  @ApiPropertyOptional({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  readonly sessionId?: string;

  @ApiPropertyOptional({ example: 'BDT', minLength: 3, maxLength: 3 })
  readonly currency?: string;

  @ApiPropertyOptional({ example: 'gift wrapping please' })
  readonly notes?: string;

  @ApiPropertyOptional({ example: '2026-12-31T23:59:59Z' })
  readonly expiresAt?: string;
}

export class UpdateCartHttpDTO {
  @ApiPropertyOptional() readonly notes?: string;
  @ApiPropertyOptional() readonly currency?: string;
  @ApiPropertyOptional() readonly expiresAt?: string;
  @ApiPropertyOptional() readonly status?: string;
}

export class ClearCartHttpDTO {
  @ApiPropertyOptional() readonly clearedBy?: string;
}

export class DeleteCartHttpDTO {
  @ApiPropertyOptional() readonly reason?: string;
}

export class RecoverCartHttpDTO {
  @ApiPropertyOptional({ enum: ['email', 'sms', 'push'] })
  readonly channel?: 'email' | 'sms' | 'push';
}
