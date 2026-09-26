import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface UserPublic {
  readonly id: string;
  readonly email: string;
  readonly name: string;
}

@Injectable()
export class UserClient {
  private readonly baseUrl = getOptionalEnv('USER_SERVICE_URL', 'http://localhost:3001/api/v1');

  constructor(private readonly http: HttpService) {}

  async findById(userId: string): Promise<UserPublic | null> {
    try {
      const { data } = await firstValueFrom(
        this.http.get<UserPublic>(`${this.baseUrl}/users/${userId}`),
      );
      return data;
    } catch {
      return null;
    }
  }
}
