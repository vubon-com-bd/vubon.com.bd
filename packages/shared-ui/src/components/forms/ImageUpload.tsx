'use client';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ImageUploadProps {
  readonly onFile?: (file: File) => void;
  readonly accept?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly size?: number;
}

export const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  function ImageUpload(
    { onFile, accept = 'image/*', disabled, className, size = 96 },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const setRef = (node: HTMLInputElement | null): void => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, [preview]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
      onFile?.(file);
    };

    return (
      <div className={cn('inline-flex flex-col items-center gap-2', className)}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => innerRef.current?.click()}
          aria-label="Upload image"
          style={{
            width: size,
            height: size,
            backgroundImage: preview ? `url("${preview}")` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 hover:border-slate-400 disabled:opacity-50"
        >
          {!preview && (
            <span aria-hidden="true" className="text-2xl">
              +
            </span>
          )}
        </button>
        <input
          ref={setRef}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
        />
      </div>
    );
  },
);

ImageUpload.displayName = 'ImageUpload';
