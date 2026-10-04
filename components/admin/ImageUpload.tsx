"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  defaultValue?: string | null;
}

export default function ImageUpload({ defaultValue }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue || "");

  const onUpload = (result: { info?: { secure_url?: string } }) => {
    if (result?.info?.secure_url) {
      setImageUrl(result.info.secure_url);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden input to pass the URL to the server action */}
      <input type="hidden" name="coverImage" value={imageUrl} />

      {!imageUrl ? (
        <CldUploadWidget uploadPreset="digital_world_preset" onSuccess={onUpload}>
          {({ open }) => {
            return (
              <button
                type="button"
                onClick={() => open()}
                className="border-2 border-dashed border-border hover:border-green-bright/60 transition-colors p-8 rounded-sm text-center bg-base/40 flex flex-col items-center justify-center gap-2 group w-full"
              >
                <span className="text-green-bright/40 group-hover:text-green-bright text-3xl transition-colors">
                  ✧
                </span>
                <span className="text-text-muted font-mono text-xs uppercase tracking-widest group-hover:text-text-primary transition-colors">
                  Upload Cover Image
                </span>
              </button>
            );
          }}
        </CldUploadWidget>
      ) : (
        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-border group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="Upload preview" className="object-cover w-full h-full" />
          
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="btn-secondary py-2 px-4 text-xs bg-red-900/80 hover:bg-red-900 text-white border-red-500/50"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
