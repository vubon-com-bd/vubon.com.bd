/**
 * Auth AuthSettings Component
 * প্রমীকরণ অথ সেটিংস কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useAuth } from '@vubon/shared-hooks';
import { AuthEndpoints } from '@vubon/shared-api';
import { Card, CardHeader, CardTitle, CardDescription } from '../common/components/Card';
import { Button } from '../common/components/Button';
import { Input } from '../common/components/Input';

export interface AuthAuthSettingsProps {
  className?: string;
}

export const AuthAuthSettings: React.FC<AuthAuthSettingsProps> = ({
  className = '',
}) => {
  const authEndpoints = new AuthEndpoints({} as any);
  const { user, refetch } = useAuth(authEndpoints);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authEndpoints.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Password change failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          {!isChangingPassword ? (
            <Button
              variant="outline"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </Button>
          ) : (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <Input
                type="password"
                label="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                required
                fullWidth
              />
              <Input
                type="password"
                label="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                required
                fullWidth
              />
              <Input
                type="password"
                label="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                required
                fullWidth
              />
              <div className="flex space-x-2">
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};
