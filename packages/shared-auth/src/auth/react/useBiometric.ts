/**
 * Auth useBiometric Hook
 * প্রমীকরণ বায়োমেট্রিক হুক
 */

import { useState, useCallback } from 'react';
import { AuthBiometricEndpoints } from '@vubon/shared-api';
import {
  AuthBiometric,
  AuthBiometricCreateInput,
  AuthBiometricVerifyInput,
} from '@vubon/shared-types';
import { AuthDeviceFingerprintClient } from '../client/device-fingerprint.client';

export interface AuthBiometricState {
  devices: AuthBiometric[];
  supportedTypes: string[];
  isLoading: boolean;
  error: Error | null;
}

export interface AuthBiometricActions {
  registerDevice: (data: AuthBiometricCreateInput) => Promise<AuthBiometric>;
  verifyBiometric: (data: AuthBiometricVerifyInput) => Promise<boolean>;
  enableBiometric: (deviceId: string) => Promise<void>;
  disableBiometric: (deviceId: string) => Promise<void>;
  deleteDevice: (deviceId: string) => Promise<void>;
  refreshDevices: () => Promise<void>;
  getFingerprint: () => Promise<string>;
}

export const useBiometric = (
  biometricEndpoints: AuthBiometricEndpoints
): AuthBiometricState & AuthBiometricActions => {
  const [state, setState] = useState<AuthBiometricState>({
    devices: [],
    supportedTypes: [],
    isLoading: true,
    error: null,
  });

  const fingerprintClient = new AuthDeviceFingerprintClient();

  const refreshDevices = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const [devices, types] = await Promise.all([
        biometricEndpoints.getBiometricDevices(),
        biometricEndpoints.getSupportedBiometricTypes(),
      ]);
      setState({
        devices,
        supportedTypes: types.types,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error as Error,
      }));
    }
  }, [biometricEndpoints]);

  const registerDevice = useCallback(
    async (data: AuthBiometricCreateInput) => {
      try {
        const fingerprint = fingerprintClient.getFromBrowser();
        const deviceData = {
          ...data,
          fingerprint: fingerprintClient.generate(fingerprint).fingerprint,
        };
        const response = await biometricEndpoints.registerBiometricDevice(deviceData);
        await refreshDevices();
        return response;
      } catch (error) {
        throw error;
      }
    },
    [biometricEndpoints, refreshDevices]
  );

  const verifyBiometric = useCallback(
    async (data: AuthBiometricVerifyInput) => {
      try {
        const response = await biometricEndpoints.verifyBiometric(data);
        return response.verified;
      } catch (error) {
        throw error;
      }
    },
    [biometricEndpoints]
  );

  const enableBiometric = useCallback(
    async (deviceId: string) => {
      try {
        await biometricEndpoints.enableBiometric(deviceId);
        await refreshDevices();
      } catch (error) {
        throw error;
      }
    },
    [biometricEndpoints, refreshDevices]
  );

  const disableBiometric = useCallback(
    async (deviceId: string) => {
      try {
        await biometricEndpoints.disableBiometric(deviceId);
        await refreshDevices();
      } catch (error) {
        throw error;
      }
    },
    [biometricEndpoints, refreshDevices]
  );

  const deleteDevice = useCallback(
    async (deviceId: string) => {
      try {
        await biometricEndpoints.deleteBiometricDevice(deviceId);
        await refreshDevices();
      } catch (error) {
        throw error;
      }
    },
    [biometricEndpoints, refreshDevices]
  );

  const getFingerprint = useCallback(async () => {
    try {
      const data = fingerprintClient.getFromBrowser();
      return fingerprintClient.generate(data).fingerprint;
    } catch (error) {
      throw error;
    }
  }, []);

  // Initialize
  useState(() => {
    refreshDevices();
  });

  return {
    ...state,
    registerDevice,
    verifyBiometric,
    enableBiometric,
    disableBiometric,
    deleteDevice,
    refreshDevices,
    getFingerprint,
  };
};
