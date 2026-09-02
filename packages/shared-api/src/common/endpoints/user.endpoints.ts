import { ApiClient } from '../api-client';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  status: string;
  avatar?: string;
  bio?: string;
  isVerified: boolean;
  isLocked: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  fullName: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  nid?: string;
  birthRegistration?: string;
  occupation?: string;
  company?: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  profile?: Partial<UserProfile>;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division: string;
  district: string;
  upazila?: string;
  union?: string;
  isDefault: boolean;
  addressType: 'shipping' | 'billing' | 'both';
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateAddressRequest {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  division: string;
  district: string;
  upazila?: string;
  union?: string;
  isDefault?: boolean;
  addressType?: 'shipping' | 'billing' | 'both';
  landmark?: string;
  latitude?: number;
  longitude?: number;
}

export class UserEndpoints {
  constructor(private client: ApiClient) {}

  async getProfile(): Promise<User> {
    return this.client.get<User>('/users/profile');
  }

  async updateProfile(data: UpdateUserRequest): Promise<User> {
    return this.client.patch<User>('/users/profile', data);
  }

  async getAddresses(): Promise<Address[]> {
    return this.client.get<Address[]>('/users/addresses');
  }

  async createAddress(data: CreateAddressRequest): Promise<Address> {
    return this.client.post<Address>('/users/addresses', data);
  }

  async updateAddress(id: string, data: Partial<CreateAddressRequest>): Promise<Address> {
    return this.client.patch<Address>(`/users/addresses/${id}`, data);
  }

  async deleteAddress(id: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/addresses/${id}`);
  }

  async setDefaultAddress(id: string): Promise<{ success: boolean }> {
    return this.client.patch<{ success: boolean }>(`/users/addresses/${id}/default`);
  }

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/users/change-password', data);
  }

  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.client.post<{ avatar: string }>('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
