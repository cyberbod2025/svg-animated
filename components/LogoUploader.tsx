
import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface LogoUploaderProps {
  onLogoUpload: (file: File) => void;
  logoPreview: string;
}

export const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoUpload, logoPreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-sky-400">1. Import Your Logo</h2>
      <p className="text-gray-400 mb-4 text-sm">Upload your logo in SVG, PNG, or JPG format. This will be used as a visual reference for the AI.</p>
      <div 
        className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-sky-500 hover:bg-gray-700/50 transition-colors"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/svg+xml, image/png, image/jpeg"
        />
        {logoPreview ? (
          <div className="flex flex-col items-center">
            <img src={logoPreview} alt="Logo Preview" className="max-h-32 mb-4 object-contain" />
            <p className="text-gray-300">Click to upload a different logo</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon className="w-12 h-12 text-gray-500 mb-2" />
            <p className="text-gray-300">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-500">SVG, PNG, or JPG</p>
          </div>
        )}
      </div>
    </div>
  );
};
