import { useState, useRef } from 'react';
import { UploadCloud, FileCheck } from 'lucide-react';

export default function FileUpload({ onFileSelect }) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    onFileSelect?.(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        dragActive ? 'border-sky bg-sky/5' : 'border-gray-300 hover:border-sky/60'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {fileName ? (
        <div className="flex flex-col items-center gap-2 text-navy">
          <FileCheck size={32} />
          <p className="font-medium">{fileName}</p>
          <p className="text-xs text-gray-500">Click or drop to replace</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <UploadCloud size={32} />
          <p className="font-medium">Drag & drop a file here, or click to browse</p>
          <p className="text-xs">PDF, JPG, PNG up to 10MB</p>
        </div>
      )}
    </div>
  );
}
