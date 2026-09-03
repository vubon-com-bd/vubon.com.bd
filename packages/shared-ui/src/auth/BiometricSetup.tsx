/**
 * Auth BiometricSetup Component
 * প্রমীকরণ বায়োমেট্রিক সেটআপ কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { useBiometric } from '@vubon/shared-auth';
import { AuthBiometricEndpoints } from '@vubon/shared-api';
import { AuthBiometricCreateInput } from '@vubon/shared-types';
import { Button } from '../common/components/Button';
import { Card } from '../common/components/Card';

export interface AuthBiometricSetupProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  userId: string;
  className?: string;
}

export const AuthBiometricSetup: React.FC<AuthBiometricSetupProps> = ({
  onSuccess,
  onError,
  userId,
  className = '',
}) => {
  const [type, setType] = useState<'fingerprint' | 'face' | 'iris' | 'voice' | 'webauthn'>('fingerprint');
  const [isRegistered, setIsRegistered] = useState(false);

  const biometricEndpoints = new AuthBiometricEndpoints({} as any);
  const { registerDevice, supportedTypes, refreshDevices } = useBiometric(biometricEndpoints);

  const handleRegister = async () => {
    try {
      const deviceData: AuthBiometricCreateInput = {
        userId,
        deviceId: `device_${Date.now()}`,
        type: type,
        identifier: `device_${Date.now()}`,
        credentialId: `cred_${Date.now()}`,
        publicKey: undefined,
        metadata: undefined,
      };
      const device = await registerDevice(deviceData);
      setIsRegistered(true);
      await refreshDevices();
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {isRegistered ? 'Biometric Registered!' : 'Set up Biometric'}
          </h2>
          <p className="text-sm text-gray-500">
            {isRegistered
              ? 'Your biometric authentication has been set up successfully.'
              : 'Register your biometric for secure authentication.'}
          </p>
        </div>

        {isRegistered ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Biometric Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {supportedTypes.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="primary"
              fullWidth
              onClick={handleRegister}
            >
              Register Biometric
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
