import { Injectable } from '@nestjs/common';
import type { UserResponseDTO } from '../../application/dtos/responses/user-response.dto';
import type { UserResponseDTO_ } from '../dtos/responses/user.response.dto';

@Injectable()
export class UserControllerMapper {
  toUserResponse(dto: UserResponseDTO): UserResponseDTO_ {
    return {
      success: dto.success,
      user: dto.user,
    };
  }
}
