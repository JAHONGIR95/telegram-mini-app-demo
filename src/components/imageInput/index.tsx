import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type ImageFileInputProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  rounded?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  editable?: boolean; // edit tugma
  height?: number;
};

const ImageFileInput: React.FC<ImageFileInputProps> = ({
  value,
  onChange,
  accept = "image/*",
  rounded = "rounded-2xl",
  className,
  placeholder = "Rasm yuklang yoki tashlang",
  disabled,
  editable = true,
  height = 160,
}) => {
  const [file, setFile] = useState<File | null>(value ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value !== undefined) setFile(value);
  }, [value]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handlePick = () => {
    if (disabled) return;

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    inputRef.current?.click();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    if (f) {
      setFile(f);
      onChange?.(f);
    }
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (disabled) return;
    const f = e.dataTransfer.files?.[0] || null;
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      onChange?.(f);
    }
  };

  const handleEdit = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disabled) return;
    inputRef.current?.click(); // edit tugma → input ni ochadi
  };

  return (
    <div
      className={clsx(
        "relative w-fit cursor-pointer select-none",
        rounded,
        className
      )}
      style={{ height }}
      onClick={!previewUrl ? handlePick : undefined}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      role="button"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handlePick();
      }}
    >
      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />

      {/* Preview / Placeholder */}
      <div
        className={clsx(
          "overflow-hidden bg-islandInner w-[125px] h-[125px]",
          rounded,
          disabled && "opacity-60 pointer-events-none",
          dragOver && "ring-2 ring-offset-0 ring-main",
          !previewUrl && "border border-inputDefault"
        )}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full border border-inputDefault flex items-center justify-center">
              <span className="text-xl leading-none">＋</span>
            </div>
            <p className="text-[10px] font-semibold text-tertiary text-center px-3">
              {placeholder}
            </p>
            <p className="text-[10px] text-tertiary">PNG, JPG, JPEG</p>
          </div>
        )}
      </div>

      {/* Edit tugma */}
      {editable && previewUrl && !disabled && (
        <button
          type="button"
          onClick={handleEdit}
          className={clsx(
            "absolute top-2 right-2 bg-primaryDefault text-white w-6.5 h-6.5 flex items-center justify-center",
            "rounded-full shadow"
          )}
          aria-label="Rasmni tahrirlash"
        >
          <img src="icons/editable-pen.svg" alt="" />
        </button>
      )}
    </div>
  );
};

export default ImageFileInput;
