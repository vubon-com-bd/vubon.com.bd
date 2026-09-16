'use client';
import { forwardRef, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../../primitives/Button';

export interface FileUploadProps {
  readonly accept?: string;
  readonly multiple?: boolean;
  readonly maxSizeBytes?: number;
  readonly onFiles?: (files: readonly File[]) => void;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly label?: string;
  readonly hint?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      accept,
      multiple,
      maxSizeBytes,
      onFiles,
      disabled,
      className,
      label = 'Choose files',
      hint,
    },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(0);

    const setRef = (node: HTMLInputElement | null): void => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const list = e.target.files;
      if (!list) return;
      const files = Array.from(list);
      if (maxSizeBytes !== undefined) {
        const tooBig = files.find((f) => f.size > maxSizeBytes);
        if (tooBig) {
          setError(`File too large: ${tooBig.name}`);
          return;
        }
      }
      setError(null);
      setCount(files.length);
      onFiles?.(files);
    };

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <input
          ref={setRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
        />
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            onClick={() => innerRef.current?.click()}
          >
            {label}
          </Button>
          {count > 0 && (
            <span className="text-xs text-slate-500">
              {count} file{count > 1 ? 's' : ''} selected
            </span>
          )}
        </div>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
        {error && (
          <p role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';
