/**
 * AdminBiometricSetup Component
 * অ্যাডমিন বায়োমেট্রিক সেটআপ কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { Card } from '../../common/components/Card';
import { Button } from '../../common/components/Button';

export interface AdminBiometricSetupProps {
  onRegister: (data: any) => Promise<void>;
  onVerify: (data: any) => Promise<boolean>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  className?: string;
  supportedTypes?: string[];
}

export const AdminBiometricSetup: React.FC<AdminBiometricSetupProps> = ({
  onRegister,
  onVerify,
  onSuccess,
  onError,
  className = '',
  supportedTypes = ['fingerprint', 'face', 'iris'],
}) => {
  const [type, setType] = useState<'fingerprint' | 'face' | 'iris' | 'webauthn'>('fingerprint');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleRegister = async () => {
    try {
      await onRegister({ type });
      setIsRegistered(true);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await onVerify({ type });
      if (result) {
        setVerified(true);
        onSuccess?.();
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (verified) {
    return (
      <Card className={`p-6 text-center ${className}`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Biometric Verified!</h3>
        <p className="text-sm text-gray-500">Biometric authentication has been set up successfully.</p>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">
        {isRegistered ? 'Verify Biometric' : 'Set up Biometric'}
      </h3>
      <p className="text-sm text-gray-500">
        {isRegistered
          ? 'Verify your biometric to complete setup.'
          : 'Register your biometric for secure authentication.'}
      </p>

      <div className="mt-4 space-y-4">
        {!isRegistered ? (
          <>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {supportedTypes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            <Button variant="primary" fullWidth onClick={handleRegister}>
              Register Biometric
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            fullWidth
            onClick={handleVerify}
            loading={isVerifying}
          >
            Verify Biometric
          </Button>
        )}
      </div>
    </Card>
  );
};
