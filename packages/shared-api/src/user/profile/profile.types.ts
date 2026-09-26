export interface UserProfile {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone?: string;
  readonly avatarUrl?: string;
  readonly bio?: string;
  readonly createdAt: string;
}

export interface UpdateProfileRequest {
  readonly name?: string;
  readonly phone?: string;
  readonly bio?: string;
  readonly avatarUrl?: string;
}
