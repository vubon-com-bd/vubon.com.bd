/**
 * UserKYCForm Component
 * ইউজার KYC ফর্ম কম্পোনেন্ট
 */

import React, { useState } from 'react';
import { USER_KYC } from '@vubon/shared-constants';
import { Input } from '../../common/components/Input';
import { Button } from '../../common/components/Button';
import { Select } from '../../common/components/Select';

export interface UserKYCFormProps {
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
  initialData?: {
    type?: string;
    documentType?: string;
    documentNumber?: string;
  };
}

export const UserKYCForm: React.FC<UserKYCFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
  initialData,
}) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || USER_KYC.TYPES.NID,
    documentType: initialData?.documentType || USER_KYC.DOCUMENT_TYPES.IDENTITY,
    documentNumber: initialData?.documentNumber || '',
    documentFront: null as File | null,
    documentBack: null as File | null,
    selfie: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.documentNumber || formData.documentNumber.length < 5) {
      newErrors.documentNumber = 'Document number must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('type', formData.type);
    formDataToSubmit.append('documentType', formData.documentType);
    formDataToSubmit.append('documentNumber', formData.documentNumber);
    if (formData.documentFront) {
      formDataToSubmit.append('documentFront', formData.documentFront);
    }
    if (formData.documentBack) {
      formDataToSubmit.append('documentBack', formData.documentBack);
    }
    if (formData.selfie) {
      formDataToSubmit.append('selfie', formData.selfie);
    }

    onSubmit(formDataToSubmit);
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[field];
        return newPreviews;
      });
    }

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const typeOptions = Object.values(USER_KYC.TYPES).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
  }));

  const documentTypeOptions = Object.values(USER_KYC.DOCUMENT_TYPES).map((docType) => ({
    value: docType,
    label: docType.charAt(0).toUpperCase() + docType.slice(1),
  }));

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <Select
        label="KYC Type"
        options={typeOptions}
        value={formData.type}
        onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
        fullWidth
      />

      <Select
        label="Document Type"
        options={documentTypeOptions}
        value={formData.documentType}
        onChange={(e) => setFormData((prev) => ({ ...prev, documentType: e.target.value }))}
        fullWidth
      />

      <Input
        label="Document Number"
        value={formData.documentNumber}
        onChange={(e) => setFormData((prev) => ({ ...prev, documentNumber: e.target.value }))}
        error={errors.documentNumber}
        required
        fullWidth
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Document Front</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleFileChange('documentFront', file);
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
        />
        {previews.documentFront && (
          <div className="mt-2">
            <img
              src={previews.documentFront}
              alt="Document Front"
              className="h-32 w-auto rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Document Back</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleFileChange('documentBack', file);
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
        />
        {previews.documentBack && (
          <div className="mt-2">
            <img
              src={previews.documentBack}
              alt="Document Back"
              className="h-32 w-auto rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Selfie</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleFileChange('selfie', file);
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
        />
        {previews.selfie && (
          <div className="mt-2">
            <img
              src={previews.selfie}
              alt="Selfie"
              className="h-32 w-auto rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex space-x-3 pt-2">
        <Button type="submit" variant="primary" loading={isLoading}>
          Submit KYC
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
