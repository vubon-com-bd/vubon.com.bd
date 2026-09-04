/**
 * UserProfileForm Component
 * ইউজার প্রোফাইল ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { UserProfile as UserProfileType } from '@vubon/shared-types';
import { USER_PROFILE } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface UserProfileFormProps {
  profile?: Partial<UserProfileType>;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  profile,
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    website: profile?.website || '',
    company: profile?.company || '',
    position: profile?.position || '',
    gender: profile?.gender || USER_PROFILE.GENDER.PREFER_NOT_TO_SAY,
    relationship: profile?.relationship || '',
    education: profile?.education || '',
    employment: profile?.employment || '',
    visibility: profile?.visibility || USER_PROFILE.VISIBILITY.PUBLIC,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (formData.fullName && formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    if (formData.website && !/^https?:\/\/[^\s]+$/.test(formData.website)) {
      newErrors.website = 'Invalid website URL';
    }
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const genderOptions = Object.values(USER_PROFILE.GENDER).map((gender) => ({
    value: gender,
    label: gender.charAt(0).toUpperCase() + gender.slice(1).replace('_', ' '),
  }));

  const visibilityOptions = Object.values(USER_PROFILE.VISIBILITY).map((visibility) => ({
    value: visibility,
    label: visibility.charAt(0).toUpperCase() + visibility.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          fullWidth
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          fullWidth
        />
      </div>

      <Input
        label="Display Name"
        value={formData.displayName}
        onChange={(e) => handleChange('displayName', e.target.value)}
        fullWidth
      />

      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange('fullName', e.target.value)}
        error={errors.fullName}
        fullWidth
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={3}
          className={`block w-full rounded-lg border ${
            errors.bio ? 'border-red-500' : 'border-gray-300'
          } bg-white px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Tell us about yourself"
        />
        {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
      </div>

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        fullWidth
      />

      <Input
        label="Website"
        value={formData.website}
        onChange={(e) => handleChange('website', e.target.value)}
        error={errors.website}
        fullWidth
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          fullWidth
        />
        <Input
          label="Position"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
          fullWidth
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Gender"
          options={genderOptions}
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          fullWidth
        />
        <Select
          label="Profile Visibility"
          options={visibilityOptions}
          value={formData.visibility}
          onChange={(e) => handleChange('visibility', e.target.value)}
          fullWidth
        />
      </div>

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          Update Profile
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
